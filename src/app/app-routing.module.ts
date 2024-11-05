import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TousComponent } from './tous/tous.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent, title: "Home " },
  { path: 'tous', component: TousComponent, title: "tous cakes" },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'details/:id', component: ProductDetailsComponent, title: "details" },
  { path: 'cart', component: CartComponent, title: "cart" },
  { path: 'search', component: SearchResultsComponent, title: "Search Results" },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
