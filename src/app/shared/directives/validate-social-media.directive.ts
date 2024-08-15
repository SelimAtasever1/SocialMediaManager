import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appValidateSocialMedia]',
  providers: [{ provide: NG_VALIDATORS, useExisting: UrlValidatorDirective, multi: true }]

})

export class UrlValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;

    //console.log('Validating:', value);

    const urlPattern = /^(https?:\/\/)?[\w-]+\.[\w.-]+[^\s]*$/;
    return urlPattern.test(value) ? null : { invalidUrl: true };
  }
}