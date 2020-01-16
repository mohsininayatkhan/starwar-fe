import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[mustMatch]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: MustMatchValidatorDirective,
            multi: true
        }
    ]
})
export class MustMatchValidatorDirective implements Validator {
    @Input() mustMatch: string;
    validate(control: AbstractControl): {[key: string]: any} | null {
        const controlMustMatch = control.parent.get(this.mustMatch);

        if(controlMustMatch && controlMustMatch.value !== control.value) {
            return { 'notEqual':true };
        }
        return null;
    }
}