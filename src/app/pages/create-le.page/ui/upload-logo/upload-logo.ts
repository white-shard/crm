import { DndDirective } from '@/common-ui/directives/dnd';
import { SvgIcon } from '@/common-ui/svg-icon/svg-icon';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'upload-logo',
  imports: [SvgIcon, DndDirective, FormsModule],
  templateUrl: './upload-logo.html',
  styleUrl: './upload-logo.css',
})
export class UploadLogo {
  preview = signal<string>('#');

  logo: File | null = null;

  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.processFile(file);
  }

  OnFileDropped(file: File) {
    this.processFile(file);
  }

  processFile(file: File | null | undefined) {
    if (!file || !file.type.match('image')) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      this.preview.set(event.target?.result?.toString() ?? '');
    };

    reader.readAsDataURL(file);

    this.logo = file;
  }
}
