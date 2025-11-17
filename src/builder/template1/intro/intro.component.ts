import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../shared/services/menu.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCropperComponent } from 'ngx-image-cropper';
declare var bootstrap: any;
@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [FormsModule, CommonModule, ImageCropperComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent implements OnInit{
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public menuService: MenuService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
  }
  
  @Input() data: any;
  @Input() dataConfig: any;

  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';

  saveCroppedImage() {
    this.data.img = this.croppedImage;
  }
  onPersonalImgSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.imageChangedEvent = event;
    const modal = new bootstrap.Modal(document.getElementById('cropperModal'));
    modal.show();

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {};
      reader.readAsDataURL(file);
    }
  }
  imageCropped(event: any) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
  }
  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
