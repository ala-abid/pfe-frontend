import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {LocalStorageService} from '../services/local-storage.service';
import {homePath, loginPath, registerPath, tokenKey} from '../../AppConstants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private storageService: LocalStorageService, private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.storageService.retrieve(tokenKey) !== null) {
      if (state.url === loginPath || state.url === registerPath) {
        this.router.navigateByUrl(homePath);
        return false;
      }
      return true;
    }
    if (state.url === loginPath || state.url === registerPath){
      return true;
    }
    this.router.navigateByUrl(loginPath);
    return false;
  }
}
