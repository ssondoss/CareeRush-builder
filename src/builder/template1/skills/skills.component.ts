import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../shared/services/menu.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements OnInit {
  @Input() data: any = [];
  @ViewChild('skillInput') skillInput!: ElementRef<HTMLInputElement>;

  isEdittingSkill = this.data.length == 0 ? 0 : -1;

  selectedSkill = 'Skill';
  initialSkillInputWidth = '45';
  constructor(public menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.menuAction$.subscribe((value: any) => {
      console.log(this.menuService.selectedIndex, value);

      if (value.section == 'skills') {
        let arr = this.data;
        let i = this.menuService.selectedIndex;

        switch (value.action) {
          case 'add':
            arr.splice(i + 1, 0, '');
           this.isEdittingSkill = arr.length - 1; this.selectedSkill = 'Skill'
            break;
          case 'delete':
            if (arr.length > 1) arr.splice(i, 1);
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

  resizeInputToAsDiv(div: HTMLDivElement) {
    console.log('div.style.width');
    console.log(div.offsetWidth);

    this.initialSkillInputWidth = (div.offsetWidth + 2).toString();
  }

  trackByIndex(index: number) {
    return index;
  }
  showMenu(event: Event, container: HTMLElement, i: number) {
    debugger;
    event.stopPropagation();
    this.menuService.showMenu(event, container, i, 'skills');
  }
}
