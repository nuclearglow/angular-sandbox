import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'reactive-editor',
    templateUrl: './reactive-editor.component.html',
    styleUrls: ['./reactive-editor.component.scss']
})
export class ReactiveEditorComponent implements OnInit {

    editorForm: FormGroup;
    submitted = false;

    constructor(private fb: FormBuilder) {
        this.editorForm = this.fb.group({
            name: ['', Validators.required],
            age: ['', Validators.required],
            isin: ['', Validators.required]
        });
     }

     ngOnInit() {
     }

     // convenience getter for easy access to form fields
     get f() { return this.editorForm.controls; }

     onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.editorForm.invalid) {
            return;
        }
    }

}
