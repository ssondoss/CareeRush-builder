import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { MenuState } from '../../models/menu-state.model';

@Component({
  selector: 'app-section-edit-menu',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './section-edit-menu.component.html',
  styleUrl: './section-edit-menu.component.scss',
})
export class SectionEditMenuComponent implements OnInit {
  constructor(private menuService: MenuService) {}
  top: number | undefined = 0;
  left: number | undefined = 0;
  show = false;

  ngOnInit(): void {
    this.menuService.menuState$.subscribe((state: MenuState) => {
      this.top = state.top;
      this.left = state.left;
      this.show = state.show;
    });
  }
}
