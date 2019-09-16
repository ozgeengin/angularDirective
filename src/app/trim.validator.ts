import { Directive, forwardRef, Attribute, Renderer2, ElementRef, HostListener } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
    selector: 'input[trim]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => TrimValidatorDirective), multi: true }
    ]
})
export class TrimValidatorDirective implements Validator {
    constructor(
        public renderer: Renderer2,
        public elementRef: ElementRef
    ) { }

    @HostListener('blur', ['$event.target.value'])
    onBlur(value: string): void {
        this.updateValue(value.trim());
    }

    validate(control: AbstractControl): { [key: string]: any } {
        const newValue = control.value.toString().trim();
        if (newValue.length === 0) {
            this.updateValue(newValue);

            return {
                required: true
            };
        }

        return null;
    }

    private updateValue(value: string): void {
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
        this.renderer.setAttribute(this.elementRef.nativeElement, 'value', value);
    }
}
