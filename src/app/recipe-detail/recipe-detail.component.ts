import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RecipeDetailComponent implements OnInit {

    recipe = {};

    constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

    ngOnInit() {
        console.log("PLOP");
        this.getRecipeDetail(this.route.snapshot.params['id']);
    }

    getRecipeDetail(id) {
        this.http.get('/recipe/'+id).subscribe(data => {
            this.recipe = data;
            console.log(data);
        });
    }

    deleteRecipe(id) {
        this.http.delete('/recipe/'+id)
            .subscribe(res => {
                this.router.navigate(['/recipes']);
              }, (err) => {
                console.log(err);
              }
        );
    }
}
