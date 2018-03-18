import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-recipe-create',
    templateUrl: './recipe-create.component.html',
    styleUrls: ['./recipe-create.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class RecipeCreateComponent implements OnInit {

    recipe = {};
    
    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit() {
    }

    saveRecipe() {
        let httpOptions = {
            headers: new HttpHeaders({'Authorization': localStorage.getItem('jwtToken') })
        };
        this.http.post('/api/recipe', this.recipe, httpOptions)
            .subscribe(res => {
                    let id = res['_id'];
                    this.router.navigate(['/recipe-details', id]);
                }, (err) => {
                    console.log(err);
                }
            );
    }
}
