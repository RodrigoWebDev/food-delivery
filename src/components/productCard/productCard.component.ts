import { Component, input } from '@angular/core';

@Component({
  selector: 'ProductCard',
  templateUrl: 'productCard.component.html',
})
export class ProductCard {
  name = input('');
  description = input('');
  img = input('');
  price = input('100');
}
