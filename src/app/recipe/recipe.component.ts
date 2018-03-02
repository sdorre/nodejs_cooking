import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class RecipeComponent implements OnInit {

    recipes: any;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.http.get('/recipe').subscribe(data => {
            console.log(data);
            this.recipes = data;
        });
    }
}

