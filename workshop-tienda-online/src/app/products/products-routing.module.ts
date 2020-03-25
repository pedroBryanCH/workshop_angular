import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductListComponent } from './product-list/product-list.component';


const routes: Routes = [
  {
    path: '', // /products
    component: ProductsComponent,
    children: [
      {
        path: '', // /products -> /products/list
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list', // /products/list
        component: ProductListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
