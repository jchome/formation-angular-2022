import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'admin-products', component: AdminProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: ProductComponent },

  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `home`
  { path: '**', component: PageNotFoundComponent } // 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
