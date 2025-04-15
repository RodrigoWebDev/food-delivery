import { Component, input } from '@angular/core';

type TIconName = 'menu' | 'shopping_cart' | 'loader' | '';

@Component({
  selector: 'Icon',
  templateUrl: './icon.component.html',
})
export class Icon {
  name = input<TIconName>('');
  size = input(16);
  className = input('');
}
