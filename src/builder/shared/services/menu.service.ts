import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MenuState } from '../models/menu-state.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor() {}
  isShowMenu = false;
  private _menuState = new BehaviorSubject<MenuState>({ show: false });
  menuState$ = this._menuState.asObservable();
  private _menuAction = new Subject<Object>();
  menuAction$ = this._menuAction.asObservable();
  selectedIndex: number = -1;
  currentSection:string='';
  showMenu(event: Event, container: HTMLElement, index: number = -1, section:string) {
    debugger;
    const rect = container?.getBoundingClientRect();
    this.selectedIndex = index;
    this.currentSection=section;
    const top = (rect?.top || 0) + window.scrollY - 60;

    const left = (rect?.left || 0) ;
    this._menuState.next({ show: true, top, left });
  }

  hideMenu() {
    this._menuState.next({ show: false });
  }

  sendMenuAction(action:string) {
    this._menuAction.next({section:this.currentSection,action:action});
  }
  delete() {
    this._menuAction.next('delete');
  }
  right() {
    this._menuAction.next('right');
  }
  left() {
    this._menuAction.next('left');
  }
  
}
