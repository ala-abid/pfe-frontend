import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorageService} from '../services/local-storage.service';
import {tokenKey} from '../../AppConstants';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private storageService: LocalStorageService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.storageService.retrieve(tokenKey)}`
      }
    });
    return next.handle(request);
  }
}
