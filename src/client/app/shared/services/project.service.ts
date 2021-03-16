import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
//import 'rxjs/Rx';  // use this line if you want to be lazy, otherwise:
import 'rxjs/add/operator/do';  // debug

import { Project, Task } from '../interfaces';

import myGlobals = require('../../globals');

@Injectable()
export class ProjectService {

    public taskSelected: Task;
    
    projects: Project[];
    tasks: Task[];
    
    constructor(private http: Http) { }

    projectList(pkuid: number): Observable<Project[]> {

        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });
        
        return this.http.get(myGlobals.serviceUrl+"list/"+pkuid)
            .map((res: Response) => {
                let body = res.json();
                this.projects = body.data;
                return this.projects;

            })
            .catch(this.handleError);
    }
    
    projectDetail(pkproid: number): Observable<Task[]> {

        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });

        return this.http.get(myGlobals.serviceUrl+pkproid+"/tasklist")
            .map((res: Response) => {
                let body = res.json();
                this.tasks = body.data;
                return this.tasks;

            })
            .catch(this.handleError);
    }

    addTask(username: string, password: string): Observable<User> {

        let body = JSON.stringify({
            email: username,
            password: password
        });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this._baseUrl, body, options)
            .map((res: Response) => {
                let body = res.json();
                this.user = body.data;
                return this.user;

            })
            .catch(this.handleError);
    }
    
    private handleError(error: any) {
        //console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}


