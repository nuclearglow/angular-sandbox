import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'isin'
})
export class IsinPipe implements PipeTransform {

    transform(value: string): any {
        if (value !== undefined) {
            value = value.replace(/\s/g, '');
            const chunks: RegExpMatchArray | null = value.match(/.{1,4}/g);
            if (chunks && chunks.length) {
                return chunks.join(' ');
            }
            return value;
        }
        return '';
    }

}
