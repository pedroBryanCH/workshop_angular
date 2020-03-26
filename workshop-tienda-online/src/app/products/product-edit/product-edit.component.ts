import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../shared/models/product';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'ed-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  id: string;
  product: Product;

  constructor(private route: ActivatedRoute,
              private service: ProductsService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id'); //mapa con clave: valor
    // GET /products/:id
    this.service.get(this.id)
      .pipe(
        catchError(error => {
          this.snackBar.open('Can not get Product details at this time. Please try again later', null, {
            duration: 3000
          });
          return EMPTY;
        })
      )
      .subscribe(product => {
        console.log('product', product);
        this.product = product;
      });
  }

  submit() {
    const product = this.product;
    product.id = this.id;
    console.log('Going to update', product);
    this.service.update(product)
      .subscribe(result => console.log('Update finished', result));
    this.router.navigate(['/products']);
    this.snackBar.open('Product has been update', 'Close',{
      duration: 3000
    });
  }

  cancel() {
    this.router.navigate(['/products']);
  }

}
