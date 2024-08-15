import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() appearance: 'custom' | 'primary' | 'secondary-destructive' = 'custom';
  @Input() size: 's' | 'm' | 'l' = 'm';
  @Input() disabled: boolean = false;
  @Input() icon: string | null = null;
  @Output() click = new EventEmitter<void>();

  handleClick(): void {
    if (!this.disabled) {
      console.log('Button clicked - emitting event');
      this.click.emit();
    }
  }

  
}
