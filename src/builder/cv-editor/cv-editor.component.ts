import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  viewChild,
  viewChildren,
} from '@angular/core';
import { SectionEditMenuComponent } from '../shared/components/section-edit-menu/section-edit-menu.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ImageCropperComponent,
  ImageCroppedEvent,
  LoadedImage,
} from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { saveAs } from 'file-saver'; // npm install file-saver
import { ImagesHandlerService } from '../shared/services/images-handler.service';
import { MenuService } from '../shared/services/menu.service';
import { IntroComponent } from '../template1/intro/intro.component';
import { ContactInfoComponent } from '../template1/contact-info/contact-info.component';
import { SkillsComponent } from '../template1/skills/skills.component';
import { ExperienceComponent } from '../template1/experience/experience.component';

declare var bootstrap: any;

@Component({
  selector: 'app-cv-editor',
  standalone: true,
  imports: [
    SectionEditMenuComponent,
    CommonModule,
    HttpClientModule,
    IntroComponent,
    FormsModule,
    ImageCropperComponent,
    SkillsComponent,
    ExperienceComponent,
    ContactInfoComponent,
  ],
  templateUrl: './cv-editor.component.html',
  styleUrl: './cv-editor.component.scss',
})
export class CvEditorComponent implements OnInit {

  data = {
    intro: {
      name: '',
      title: '',
      summary: '',
      isEditing: false,
      img: 'person.svg',
      items: {
        name: false,
        title: false,
        summary: false,
        img: false,
      },
    },

    contactInfo: {
      isEditing: false,
      items: [
        { icon: 'bi bi-link', text: '' },
      ],
    },
    skills: [''],
    experiences: [
      {
        title: '',
        company: '',
        date: { from: { month: '', year: '' }, to: { month: '', year: '' } },
        companyDesc: '',
        tasks: [
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, aliquam',
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, aliquam',
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, aliquam',
        ],
      },
    ],
    projects: [],
    education: [],
    certificates: [],
    languages: [],
  };
  selectedSection!: Record<string, boolean>;
  dataConfig: any = {
    intro: { summary: true, title: true, image: true },
    contactInfo:{icon:true}
  };

  constructor(
    private http: HttpClient,
    private imagesHandlerService: ImagesHandlerService,
    private menuService: MenuService
  ) {}

  // showMenu(event: Event, container: HTMLElement) {
  //   this.menuService.showMenu(event, container);
  // }
  hideMenu() {
    this.menuService.hideMenu();
  }

  selectSkill(i: number) {}

  ngOnInit(): void {}
  menuTop = 0;
  menuLeft = 0;
  menuVisible = false;

  onPersonalImgSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.imageChangedEvent = event;
    const modal = new bootstrap.Modal(document.getElementById('cropperModal'));
    modal.show();
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {};
      reader.readAsDataURL(file);
    }
  }

  onInput(event: Event) {
    const target = event.target as HTMLElement;
    this.data.intro.name = target.innerText;
    // Prevent Angular from overwriting during typing:
    event.stopPropagation();
  }

  autoGrow(event: any) {
    const input = event.target as HTMLInputElement;
    input.style.width = '1ch'; // reset width
    input.style.width = input.value.length + 9 + 'ch'; // 1ch = width of '0'
  }

  imageChangedEvent: Event | null = null;

  async generatePDF() {
    const template = document.getElementById('template');
    if (!template) return;

    let cvHTML = template?.outerHTML || '';
    cvHTML = cvHTML
      .replace(/_ngcontent-[^=\s]+(="[^"]*")?/g, '') // remove _ngcontent attributes
      .replace(/ng-reflect-[^=\s]+(="[^"]*")?/g, '') // remove ng-reflect attributes
      .replace(/<!--[\s\S]*?-->/g, ''); // remove Angular comments
    console.log(cvHTML);
    const imgEl = template.querySelector('img');

    if (imgEl) {
      const base64 = await this.imagesHandlerService.imageToBase64(
        imgEl as HTMLImageElement
      );
      cvHTML = cvHTML.replace(imgEl.src, base64);
    }
    const styles = Array.from(document.querySelectorAll('style'))
      .map((style) => style.innerHTML)
      .join('\n');
    // const fullHTML = `
    //       <html>
    //         <head>
    //           <meta charset="UTF-8" />
    //           <title>CV</title>
    //           <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
    //           <link rel="preload" as="font" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/fonts/bootstrap-icons.woff2" type="font/woff2" crossorigin>
    //           <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    //           <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    //           <style>
    //           </style>
    //         </head>
    //       <body>
    //         ${cvHTML}
    //       </body>
    //     </html>
    //     `;
    console.log(cvHTML);

    this.http
      .post(
        'http://localhost:4000/api/pdf/generate',
        { innerHtml: cvHTML },
        { responseType: 'blob' }
      )
      .subscribe({
        next: async (blob) => {
          const text = await blob.text();
          console.log(text.slice(0, 20));
          // Download the file
          console.log(blob);

          saveAs(blob, 'Generated.pdf');
        },
        error: (err) => {
          console.error('PDF generation failed:', err);
        },
      });
  }

  // resizeInput(input: HTMLInputElement, m: any) {
  //   // input.style.minWidth = '20px';
  //   // input.style.width = 'auto'; // reset first!
  //   // console.log('ok');
  //   debugger;
  //   // input.style.width = (m.offsetWidth+10).toString() + 'px';

  //   // input.style.width = input.scrollWidth + 'px';
  //   console.log(m.offsetWidth, this.selectedSkill);
  // }
  // resizeInputToAsDiv(div: HTMLDivElement) {
  //   console.log('div.style.width');
  //   console.log(div.offsetWidth);

  //   this.initialSkillInputWidth = (div.offsetWidth + 2).toString();
  // }


  c() {
    console.log('okkkkkkkffff');
  }
}
