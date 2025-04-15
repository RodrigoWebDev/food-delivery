import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../components/header/header.component';
import { ProductListCategory } from '../components/productListByCategory/productListByCategory.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ProductListCategory],
  templateUrl: './app.component.html',
})
export class AppComponent {}
