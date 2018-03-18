import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
        this.getRecipeDetail(this.route.snapshot.params['id']);
    }

    getRecipeDetail(id) {
        let httpOptions = {
            headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
        };
        this.http.get('/api/recipe/'+id, httpOptions).subscribe(data => {
            this.recipe = data;
            console.log(data);
        });
    }

    deleteRecipe(id) {
        let httpOptions = {
            headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
        };
        this.http.delete('/api/recipe/'+id, httpOptions)
            .subscribe(res => {
                this.router.navigate(['/recipes']);
              }, (err) => {
                console.log(err);
              }
        );
    }
}
