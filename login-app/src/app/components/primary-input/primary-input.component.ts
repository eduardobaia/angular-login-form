import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

type InputTypes = 'text' | 'password' | 'email';

@Component({
  selector: 'app-primary-input',
  imports: [ReactiveFormsModule],
  templateUrl: './primary-input.component.html',
  styleUrl: './primary-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimaryInputComponent),
      multi: true,
    },
  ],
})
export class PrimaryInputComponent implements ControlValueAccessor {

  @Input() type: InputTypes = 'text';
  // @Input() formName: string = '';
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() inputName: string = '';

  value: string = ''
  onChange: any = () => {};
  onTouch: any = () => {};

  onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.onChange(this.value);
    this.onTouch();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
      // Not implemented
  }
}
