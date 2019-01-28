import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { IsinPipe } from './../../pipes/isin.pipe';

interface IsinValidationErrors {
    invalidLength?: {
        valid: boolean;
    };
    invalidFormat?: {
        valid: boolean;
    };
    invalidChecksum?: {
        valid: boolean;
    };
}

@Component({
    selector: 'isin-control',
    templateUrl: './isin-control.component.html',
    styleUrls: ['./isin-control.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => IsinControlComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => IsinControlComponent),
            multi: true,
        }
    ]
})
export class IsinControlComponent implements ControlValueAccessor, Validator {

    @Input()
    isin = '';
    // this value will be displayed in the input field (we format using 4 char block)
    formattedIsin = '';

    // NgModel field propagation function
    propagateChange = (_: any) => {};

    // ISIN formatting is achieved using available Pipe
    constructor(private isinPipe: IsinPipe) { }

    /**
     * on change, we trim the value, reformat it but propagate the original ISIN value
     * @param $event target.value contains currently entered formatted ISIN
     */
    onChange($event: any) {
        this.isin = $event.target.value.replace(/\s/g, '');
        this.formattedIsin = this.isinPipe.transform(this.isin);
        this.propagateChange(this.isin);
    }

    writeValue(value: any): void {
        if (value) {
            this.isin = value;
            this.formattedIsin = this.isinPipe.transform(this.isin);
        }
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {}

    /**
     * validates the currently entered ISIN
     * @param c the form control
     * @returns null when valid else the validation object, possible validation errors:
     * {
     *     invalidLength, invalidFormat, invalidChecksum
     * }
     * @see: https://en.wikipedia.org/wiki/International_Securities_Identification_Number
     */
    public validate(c: FormControl) {
        const isin: string = c.value;
        const errors: IsinValidationErrors = {};

        if (isin.length !== 12) {
            errors.invalidLength = {
                valid: false
            };
        }

        /* tslint:disable-next-line:max-line-length */
        const ISIN_REGEX: RegExp = /^(XS|AD|AE|AF|AG|AI|AL|AM|AO|AQ|AR|AS|AT|AU|AW|AX|AZ|BA|BB|BD|BE|BF|BG|BH|BI|BJ|BL|BM|BN|BO|BQ|BR|BS|BT|BV|BW|BY|BZ|CA|CC|CD|CF|CG|CH|CI|CK|CL|CM|CN|CO|CR|CU|CV|CW|CX|CY|CZ|DE|DJ|DK|DM|DO|DZ|EC|EE|EG|EH|ER|ES|ET|FI|FJ|FK|FM|FO|FR|GA|GB|GD|GE|GF|GG|GH|GI|GL|GM|GN|GP|GQ|GR|GS|GT|GU|GW|GY|HK|HM|HN|HR|HT|HU|ID|IE|IL|IM|IN|IO|IQ|IR|IS|IT|JE|JM|JO|JP|KE|KG|KH|KI|KM|KN|KP|KR|KW|KY|KZ|LA|LB|LC|LI|LK|LR|LS|LT|LU|LV|LY|MA|MC|MD|ME|MF|MG|MH|MK|ML|MM|MN|MO|MP|MQ|MR|MS|MT|MU|MV|MW|MX|MY|MZ|NA|NC|NE|NF|NG|NI|NL|NO|NP|NR|NU|NZ|OM|PA|PE|PF|PG|PH|PK|PL|PM|PN|PR|PS|PT|PW|PY|QA|RE|RO|RS|RU|RW|SA|SB|SC|SD|SE|SG|SH|SI|SJ|SK|SL|SM|SN|SO|SR|SS|ST|SV|SX|SY|SZ|TC|TD|TF|TG|TH|TJ|TK|TL|TM|TN|TO|TR|TT|TV|TW|TZ|UA|UG|UM|US|UY|UZ|VA|VC|VE|VG|VI|VN|VU|WF|WS|YE|YT|ZA|ZM|ZW)([0-9A-Z]{9})([0-9]{1})$/;

        if (!isin.match(ISIN_REGEX)) {
            errors.invalidFormat = {
                valid: false
            };
        }

        // calculate the checksum
        const v: number[] = [];
        for (let digit: number = isin.length - 2; digit >= 0; digit--) {
            const character: any = isin.charAt(digit);
            if (isNaN(character)) { // not a digit
                const letterCode: number = isin.charCodeAt(digit) - 55; // char ordinal + 9
                v.push(letterCode % 10);
                if (letterCode > 9) {
                    v.push(Math.floor(letterCode / 10));
                }
            } else {
                v.push(Number(character));
            }
        }
        let sum = 0;
        const len = v.length;
        for (let i = 0; i < len; i++) {
            if (i % 2 === 0) {
                const d = v[i] * 2;
                sum += Math.floor(d / 10);
                sum += d % 10;
            } else {
                sum += v[i];
            }
        }

        const checksum: number = ((10 - (sum % 10)) % 10);
        const checkDigit: number = Number(isin.charAt(11));

        if (checksum !== checkDigit) {
            errors.invalidChecksum = {
                valid: false
            };
        }

        // if the errors object is not empty, return it
        if (Object.keys(errors).length > 0 && errors.constructor === Object) {
            return errors;
        }

        // null means no validation errors
        return null;
    }
}
