import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    signupData = { username: '', password: '' };
    message = '';

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit() {
    }

    singup() {
        this.http.post('/api/signup', this.signupData).subscribe(resp => {
            console.log(resp);
            this.router.navigate(['login']);
        }, err => {
            this.message = err.error.msg;
        });
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            console.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}
