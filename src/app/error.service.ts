import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class ErrorService {

  constructor(private router: Router) {
  }

  public showInvalidCredentials() {
      alert(13);
    // this.router.navigate(['./pages/login']);
  }

  public showInternalServerError() {
    alert(18);

  }

  public showInvalidDataServerError(error: HttpErrorResponse) {
    alert(23);
    // this.toastr.error(error.error.error, 'Server refuse your request');
    // this.spinnerService.hide();
  }
  public showForbiddenError(error: HttpErrorResponse) {
    alert(28);
    // this.toastr.error('Operation forbidden. Permission denied', 'Server refuse your request');
    // this.spinnerService.hide();
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public handleError<T>(operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {
        console.log(error);
        if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this.showInvalidCredentials();
        } else if (error.status === 422) {
          this.showInvalidDataServerError(error);
        } else if (error.status === 403) {
          this.showForbiddenError(error);
        } else {
          this.showInternalServerError();
        }
      }

      // Let the app keep running by returning an empty result.
        return Observable.throw(error);
    };
  }
}
