import { Component, OnInit, signal } from '@angular/core';
import { ProductCard } from '../productCard/productCard.component';
import { apiBaseUrl } from '../../constants';
import { NgClass } from '@angular/common';

interface IBase {
  id: string;
  name: string;
  description: string;
}

interface ICategory extends IBase {
  isActive: boolean;
}

interface IProduct extends IBase {
  price: number;
  img: string;
}

@Component({
  selector: 'ProductListCategory',
  templateUrl: './productListByCategory.component.html',
  imports: [ProductCard, NgClass],
})
export class ProductListCategory implements OnInit {
  categories = signal<ICategory[]>([]);
  products = signal<IProduct[]>([]);
  isLoadingCategories = signal(false);
  isLoadingProducts = signal(false);

  async getCategories() {
    this.isLoadingCategories.set(true);
    const res = await fetch(`${apiBaseUrl}/categories.php`);
    const resJson = await res.json();
    this.categories.set(
      resJson.categories.map((item: any) => ({
        id: item.idCategory,
        name: item.strCategory,
        description: item.strCategoryDescription,
        isActive: false,
      }))
    );

    this.isLoadingCategories.set(false);
  }

  async getProcutsByCategory(category: string) {
    this.isLoadingProducts.set(true);

    const res = await fetch(`${apiBaseUrl}/filter.php?c=${category}`);
    const resJson = await res.json();

    this.products.set(
      resJson.meals.map((item: any) => ({
        id: item.idMeal,
        name: item.strMeal,
        img: item.strMealThumb,
        description: item.strInstructions,
        price: 100,
      }))
    );

    this.isLoadingProducts.set(false);
  }

  setFirstCategoryAsActive() {
    const categories = this.categories();
    categories[0].isActive = true;

    this.categories.set(categories);
  }

  async ngOnInit(): Promise<void> {
    await this.getCategories();
    this.setFirstCategoryAsActive();
    this.getProcutsByCategory(this.categories()[0].name);
  }
}
