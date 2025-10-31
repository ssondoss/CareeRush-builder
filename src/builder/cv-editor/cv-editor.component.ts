import { Component, OnInit } from '@angular/core';
import { SectionEditMenuComponent } from '../section-edit-menu/section-edit-menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cv-editor',
  standalone: true,
  imports: [SectionEditMenuComponent, CommonModule, FormsModule],
  templateUrl: './cv-editor.component.html',
  styleUrl: './cv-editor.component.scss',
})
export class CvEditorComponent implements OnInit {
  data = {
    intro: {
      name: '',
      title: '',
      aboutMe: '',
      isEditing: false,
      items: {
        name: false,
        title: false,
        aboutMe: false,
        img: false,
      },
    },

    contactMe: { isEditing: false, items: [{ icon: false, text: false }] },
  };
  ngOnInit(): void {}
  menuTop = 0;
  menuLeft = 0;
  menuVisible = false;

  onInput(event: Event) {
    const target = event.target as HTMLElement;
    this.data.intro.name = target.innerText;
    // Prevent Angular from overwriting during typing:
    event.stopPropagation();
  }
  selectedIcon = 'bi bi-person'; // Default icon
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
  ];

  selectIcon(icon: string) {
    this.selectedIcon = icon;
  }
  showMenu(event: MouseEvent) {
    const element = event.currentTarget as HTMLElement; // hovered section
    const rect = element.getBoundingClientRect(); // get position + size

    // get position relative to the full page (not just viewport)
    this.menuTop = rect.top + window.scrollY;
    this.menuLeft = rect.right + 10; // 10px to the right of the section

    this.menuVisible = true;
  }

  autoGrow(event: any) {
    const input = event.target as HTMLInputElement;
    input.style.width = '1ch'; // reset width
    input.style.width = input.value.length + 9 + 'ch'; // 1ch = width of '0'
  }
}
