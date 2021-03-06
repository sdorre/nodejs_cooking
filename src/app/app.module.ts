import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const appRoutes: Routes = [
    {
        path: 'recipes',
        component: RecipeComponent,
        data: { title: 'Recipe List' }
    },
    {
        path: 'recipe-details/:id',
        component: RecipeDetailComponent,
        data: { title: 'Recipe Content' }
    },
    {
        path: 'recipe-create',
        component: RecipeCreateComponent,
        data: { title: 'Create Recipe' }
    },
    {
        path: 'recipe-edit/:id',
        component: RecipeEditComponent,
        data: { title: 'Edit Recipe' }
    },
    {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login' }
    },
    {
        path: 'signup',
        component: SignupComponent,
        data: { title: 'Sign up' }
    },
    { 
        path: '',
        redirectTo: '/recipes',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        RecipeComponent,
        RecipeDetailComponent,
        RecipeCreateComponent,
        RecipeEditComponent,
        LoginComponent,
        SignupComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // debugging purposes only!!
        )
    ],
    providers: [],
    bootstrap: [AppComponent]
})
 
 export class AppModule { }
