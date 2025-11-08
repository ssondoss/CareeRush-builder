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
import { SectionEditMenuComponent } from '../section-edit-menu/section-edit-menu.component';
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

declare var bootstrap: any;

@Component({
  selector: 'app-cv-editor',
  standalone: true,
  imports: [
    SectionEditMenuComponent,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ImageCropperComponent,
  ],
  templateUrl: './cv-editor.component.html',
  styleUrl: './cv-editor.component.scss',
})
export class CvEditorComponent implements OnInit {
  isShowMenu = false;
  @ViewChild('skillInput') skillInput!: ElementRef<HTMLInputElement>;
  previewImg: SafeUrl = '';
  initialSkillInputWidth = '35';
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

    contactMe: {
      isEditing: false,
      items: [
        { icon: 'bi bi-envelope', text: '' },
        { icon: 'bi bi-phone', text: '' },
        { icon: 'bi bi-house', text: '' },
        { icon: 'bi bi-link', text: '' },
      ],
    },
    skills: ['sondos1', 'sondo2', 'sondos3', 'sondos4'],
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
    projects:[],
    education:[],
    certificates:[],
    languages:[]

  };
  trackByIndex(index: number) {
    return index;
  }
  selectSkill(i: number) {}
  isEdittingSkill = this.data.skills.length == 0 ? 0 : -1;

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
    'bi bi-envelope',
  ];

  selectIcon(icon: string, i: number) {
    this.data.contactMe.items[i].icon = icon;
  }
  showMenu(event: Event, container?: HTMLElement) {
    this.isShowMenu = true;
    const element = event.currentTarget as HTMLElement; // hovered section
    const rect = container?.getBoundingClientRect(); // get position + size

    // get position relative to the full page (not just viewport)
    this.menuTop = (rect?.top || 0) + window.scrollY;
    console.log(rect?.right, rect?.left);

    this.menuLeft = (rect?.left || 0) - 42; // 10px to the right of the section

    this.menuVisible = true;
  }

  autoGrow(event: any) {
    const input = event.target as HTMLInputElement;
    input.style.width = '1ch'; // reset width
    input.style.width = input.value.length + 9 + 'ch'; // 1ch = width of '0'
  }

  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';

  imageCropped(event: any) {
    console.log('Crop event:', event); // Check what it contains
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
  }

  imageLoaded(image: LoadedImage) {
    // show cropper
  }

  cropperReady() {
    // ready to crop
  }

  loadImageFailed() {
    // show error message
  }
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {}

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  saveCroppedImage() {
    this.previewImg = this.croppedImage;
  }
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
      const base64 = await this.imageToBase64(imgEl as HTMLImageElement);
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

  imageToBase64(img: HTMLImageElement): Promise<string> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    });
  }

  resizeInput(input: HTMLInputElement, m: any) {
    // input.style.minWidth = '20px';
    // input.style.width = 'auto'; // reset first!
    // console.log('ok');
    debugger;
    // input.style.width = (m.offsetWidth+10).toString() + 'px';

    // input.style.width = input.scrollWidth + 'px';
    console.log(m.offsetWidth, this.selectedSkill);
  }
  resizeInputToAsDiv(div: HTMLDivElement) {
    console.log('div.style.width');
    console.log(div.offsetWidth);

    this.initialSkillInputWidth = (div.offsetWidth + 2).toString();
  }

  selectedSkill = 'Skill';
}
