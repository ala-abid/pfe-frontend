import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorageService} from '../services/local-storage.service';
import {tokenKey} from '../../AppConstants';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {Router} from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private storageService: LocalStorageService, private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.storageService.retrieve(tokenKey)}`,
        'Content-Type': 'application/json'
      }
    });
    return next.handle(request).pipe(
      catchError(
        (err, caught) => {
          if (err.status === 401){
            this.handleAuthError();
            return of(err);
          }
          throw err;
        }
      )
    );
  }
  private handleAuthError() {
    this.storageService.delete(tokenKey);
    this.router.navigateByUrl('signIn');
  }
}

