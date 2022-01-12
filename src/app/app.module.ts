import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { HttpClientModule } from '@angular/common/http';

import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CategoryFilterPipe } from './pipes/categoryfilterPipe';
import { AddProductComponent } from './components/add-product/add-product.component';
import { FormsModule } from '@angular/forms';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { LoginComponent } from './components/login/login.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    CategoryFilterPipe,
    AddProductComponent,
    AdminProductsComponent,
    LoginComponent,
    EditProductComponent,
    PageNotFoundComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    IvyCarouselModule,
    NgbModule,
    NgxSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
