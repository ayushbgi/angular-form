import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Form } from './form';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  baseUrl = 'http://192.168.1.34/api';
  forms: Form[];

  constructor(private http: HttpClient) { }

  getAll(): Observable<Form[]> {
    return this.http.get(`${this.baseUrl}/list`).pipe(
      map((res) => {
        this.forms = res['data'];
        return this.forms;
    }),
    catchError(this.handleError));
  }

  store(form: Form): Observable<Form[]> {
    return this.http.post(`${this.baseUrl}/store`, { data: form })
      .pipe(map((res) => {
        this.forms.push(res['data']);
        return this.forms;
      }),
      catchError(this.handleError));
  }

  update(form: Form): Observable<Form[]> {
    return this.http.put(`${this.baseUrl}/update`, { data: form })
      .pipe(map((res) => {
        const theForm = this.forms.find((item) => {
          return +item['id'] === +form['id'];
        });
        if (theForm) {
          theForm['fname'] = form['fname'];
          theForm['lname'] = form['lname'];
          theForm['phono'] = form['phono'];
          theForm['email'] = form['email'];
          theForm['addre'] = form['addre'];
          theForm['catag'] = form['catag'];
        }
        return this.forms;
      }),
      catchError(this.handleError));
  }

  delete(id: number): Observable<Form[]> {
    const params = new HttpParams()
      .set('id', id.toString());

    return this.http.delete(`${this.baseUrl}/delete`, { params: params })
      .pipe(map(res => {
        const filteredForms = this.forms.filter((form) => {
          return +form['id'] !== +id;
        });
        return this.forms = filteredForms;
      }),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }

}
