import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Payment } from './payment';
import { Observable, Subject } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private subject = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  paymentPost(payment): Observable<Payment> {
    return this.httpClient.post<Payment>(environment.baseUrl + '/payment/', payment)
      .pipe(
        catchError(this.handleError)
      )
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
