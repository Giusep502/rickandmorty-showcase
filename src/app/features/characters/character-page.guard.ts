import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CharacterPageGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot): boolean {
    return !isNaN(route.params.page);
  }
}
