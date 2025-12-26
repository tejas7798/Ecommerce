import { Routes } from '@angular/router';
import { ProductCatalog } from './components/product-catalog/product-catalog';
import { CartDetails } from './components/cart-details/cart-details';
import { LoginPage } from './components/login-page/login-page';
import { HomePage } from './components/HomePage/product-catalog';
import { RegisterPage } from './components/register-page/register-page';

export const routes: Routes = [
    {
        path : 'products',
        component : ProductCatalog
    },
    {
        path:'cart',
        component : CartDetails
    },
    {
        path: 'login',
        component: LoginPage
    },
    {
        path:'home',
        component: HomePage
    },
    {
        path:'',
        component: HomePage
    },
    {
        path:'register',
        component: RegisterPage
    }
];
