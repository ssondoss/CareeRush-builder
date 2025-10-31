import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-section-edit-menu',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './section-edit-menu.component.html',
  styleUrl: './section-edit-menu.component.scss',
})
export class SectionEditMenuComponent {
  @Input() top = 0;
  @Input() show = false;
}
