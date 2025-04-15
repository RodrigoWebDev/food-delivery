import { Component, input } from '@angular/core';

type TIconName = 'menu' | 'image' | '';

@Component({
  selector: 'app-icon',
  templateUrl: './app-icon.component.html',
})
export class AppIcon {
  name = input<TIconName>('');
  size = input(16);
}
