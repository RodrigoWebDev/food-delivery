import { Component, OnInit, signal } from '@angular/core';
import { ProductCard } from '../productCard/productCard.component';
import { apiBaseUrl } from '../../constants';
import { SimpleCard } from '../simpleCard/simpleCard.component';
import { Icon } from '../icon/icon.component';

interface ICategory {
  id: string;
  name: string;
  description: string;
}

interface IProduct extends ICategory {
  price: number;
  img: string;
}

@Component({
  selector: 'ProductListCategory',
  templateUrl: './productListByCategory.component.html',
  imports: [ProductCard, SimpleCard, Icon],
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

  async ngOnInit(): Promise<void> {
    await this.getCategories();
    this.getProcutsByCategory(this.categories()[0].name);
  }
}
