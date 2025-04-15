import { Component } from '@angular/core';
import { Icon } from '../icon/icon.component';
import { SimpleCard } from '../simpleCard/simpleCard.component';

@Component({
  selector: 'MyHeader',
  imports: [Icon, SimpleCard],
  templateUrl: './header.component.html',
})
export class Header {}
