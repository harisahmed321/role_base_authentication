import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { AccessToken } from 'src/app/models/access-token.model';
import { UserType } from 'src/app/shared/enum';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const accessToken: AccessToken = this.storageService.getItem('accessToken');
    if (accessToken && accessToken.token) {
      if (next.data?.role === accessToken.user.role) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

export class AuthGuardAdmin implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (UserType.ADMIN === next.data?.role) {
      return true;
    }
    return false;
  }
}

export class AuthGuardUser implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (UserType.USER === next.data?.role) {
      return true;
    }
    return false;
  }
}
