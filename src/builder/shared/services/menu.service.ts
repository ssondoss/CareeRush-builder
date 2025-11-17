import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuState } from '../models/menu-state.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor() {}
  isShowMenu = false;
  private _menuState = new BehaviorSubject<MenuState>({ show: false });
  menuState$ = this._menuState.asObservable();

  showMenu(event: Event, container?: HTMLElement) {
    const rect = container?.getBoundingClientRect();

    const top = (rect?.top || 0) + window.scrollY;

    const left = (rect?.left || 0) - 42;
    this._menuState.next({ show: true, top, left });
  }

   hideMenu() {
    this._menuState.next({ show: false });
  }
}
