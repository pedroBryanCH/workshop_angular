import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/services/products.service';
import { Product } from '../shared/models/product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from 'src/app/shared/models/confirm-dialog-model';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'ed-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];

  constructor(private service: ProductsService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  deleteProduct(product: Product) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: <ConfirmDialogModel> {
        title: 'Delete Product',
        message: 'Are you sure to delete this product?'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if(result) {
          this.sendDeleteRequest(product);
        }
      });
  }

  sendDeleteRequest(product: Product) {
    this.service.delete(product.id)
      .subscribe(response => {
        console.log('Product has been deleted', response);
        this.loadProducts();
        this.snackBar.open('Product has been deleted', 'Close', {
          duration: 3000
        });
      });
  }

  private loadProducts() {
    this.service.getAll()
      .pipe(
        catchError(error => {
          this.snackBar.open('Can not get Products at this time. Please try again later', null, {
            duration: 3000
          });
          return EMPTY;
        })
      )
      .subscribe(data => {
        //console.log('data', data);
        this.products = data;
      });
  }

}
