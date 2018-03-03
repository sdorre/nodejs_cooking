import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class RecipeEditComponent implements OnInit {

    recipe: any = {};

    constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.getRecipe(this.route.snapshot.params['id']);
    }

    getRecipe(id) {
        this.http.get('/recipe/'+id)
            .subscribe(data => {
                this.recipe = data;
            });
    }

    updateRecipe(id) {
        this.recipe.updated_date = Date.now();
        this.http.put('/recipe/'+id, this.recipe)
            .subscribe(res => {
                let id = res['_id'];
                this.router.navigate(['recipe-details', id]);
            }, (err) => {
                console.log(err);
            });
    }
}
