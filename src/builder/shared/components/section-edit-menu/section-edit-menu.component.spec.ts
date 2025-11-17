import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionEditMenuComponent } from './section-edit-menu.component';

describe('SectionEditMenuComponent', () => {
  let component: SectionEditMenuComponent;
  let fixture: ComponentFixture<SectionEditMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionEditMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionEditMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
