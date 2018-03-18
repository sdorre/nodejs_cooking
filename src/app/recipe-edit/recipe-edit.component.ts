import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
        let httpOptions = {
            headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
        }
        this.http.get('/api/recipe/'+id, httpOptions)
            .subscribe(data => {
                this.recipe = data;
            });
    }

    updateRecipe(id) {
        let httpOptions = {
            headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
        }
        this.recipe.updated_date = Date.now();
        this.http.put('/api/recipe/'+id, this.recipe, httpOptions)
            .subscribe(res => {
                let id = res['_id'];
                this.router.navigate(['recipe-details', id]);
            }, (err) => {
                console.log(err);
            });
    }
}
