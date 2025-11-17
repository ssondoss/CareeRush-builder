import { Component, Input } from '@angular/core';
import { MenuService } from '../../shared/services/menu.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss',
})
export class ContactInfoComponent {
  constructor(public menuService: MenuService) {}

  selectedIcon = 'bi bi-person';
  icons = [
    'bi bi-person',
    'bi bi-star',
    'bi bi-briefcase',
    'bi bi-heart',
    'bi bi-gear',
    'bi bi-house',
    'bi bi-envelope',
    'bi bi-camera',
    'bi bi-telephone',
    'bi bi-envelope',
  ];

  @Input() data: any;
  selectIcon(icon: string, i: number) {
    this.data.items[i].icon = icon;
  }
}
