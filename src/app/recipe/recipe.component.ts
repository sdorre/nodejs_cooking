import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class RecipeComponent implements OnInit {

    recipes: any;

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit() {
        let httpOptions = {
            headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
        }
        this.http.get('/api/recipe', httpOptions).subscribe(data => {
            console.log(data);
            this.recipes = data;
        }, err => {
            if (err.status === 401) {
                this.router.navigate(['login']);
            }    
        });
    }

    logout() {
        localStorage.removeItem('jwtToken');
        this.router.navigate(['login']);
    }
}

