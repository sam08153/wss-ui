import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FoodTruck } from '../shared/foodTruck';
import { Order } from '../shared/Order';
import { Menu } from '../shared/Menu';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiURL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getFoodTruck(): Observable<FoodTruck> {
      return this.http
        .get<FoodTruck>(this.apiURL + '/foodTrucks')
        .pipe(retry(1), catchError(this.handleError));
  }

  createOrder(Order: any): Observable<Order> {
      return this.http
        .post<Order>(
          this.apiURL + '/orderFood',
          JSON.stringify(Order),
          this.httpOptions
        )
        .pipe(retry(1), catchError(this.handleError));
    }

      createMenu(Menu: any): Observable<Menu> {
          return this.http
            .post<Menu>(
              this.apiURL + '/foodTruck',
              JSON.stringify(Menu),
              this.httpOptions
            )
            .pipe(retry(1), catchError(this.handleError));
        }

      getMyOrders(id: any): Observable<Order> {
          return this.http
            .get<Order>(this.apiURL + '/orderFood/' + id)
            .pipe(retry(1), catchError(this.handleError));
      }


  handleError(error: any) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = 'Error Code: ${error.status}\nMessage: ${error.message}';
      }
      console.log(errorMessage);
      return throwError(() => {
        return errorMessage;
      });
    }


}
