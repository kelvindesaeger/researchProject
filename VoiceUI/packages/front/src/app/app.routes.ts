import { Routes } from '@angular/router';
import { LandingComponent } from './views/landing/landing.component';
import { ProductsComponent } from './views/products/products.component';
import { InformationComponent } from './views/information/information.component';
import { CartComponent } from './views/cart/cart.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },           // Landing Page
    { path: 'products', component: ProductsComponent },      // Products Page
    { path: 'information', component: InformationComponent }, // Information Page
    { path: 'cart', component: CartComponent }, // Cart Page
    { path: '**', redirectTo: '' } 
];

