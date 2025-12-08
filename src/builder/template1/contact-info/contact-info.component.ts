import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../shared/services/menu.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SectionEditMenuComponent } from '../../shared/components/section-edit-menu/section-edit-menu.component';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [CommonModule, FormsModule, SectionEditMenuComponent],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss',
})
export class ContactInfoComponent implements OnInit {
  constructor(public menuService: MenuService) {}
  ngOnInit(): void {
    this.menuService.menuAction$.subscribe((value: any) => {
      console.log(this.menuService.selectedIndex, value);

      if (value.section == 'contact') {
        let arr = this.data.items;
        let i = this.menuService.selectedIndex;

        switch (value.action) {
          case 'add':
            this.data.items.splice(this.menuService.selectedIndex + 1, 0, {
              icon: 'bi bi-link',
              text: '',
            });
            break;
          case 'delete':
            if (arr.length > 1)
              this.data.items.splice(this.menuService.selectedIndex, 1);
            break;
          case 'right':
            if (arr.length > 1 && i < arr.length - 1)
              [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            break;
          case 'left':
            if (arr.length > 1 && i > 0)
              [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
            break;
        }
      }
    });
  }

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
  hideMenu(event: Event) {
    this.menuService.hideMenu();
  }
  showMenu(event: Event, container: HTMLElement, i: number) {
    event.stopPropagation();
    this.menuService.showMenu(event, container, i, 'contact');
  }
}
