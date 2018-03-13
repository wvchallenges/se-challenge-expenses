// inputFile.ts
import {Component, Output, EventEmitter, ViewChild, ElementRef, Input} from '@angular/core';

@Component({
    'moduleId': module.id,
    'selector': 'app-input-file',
    'templateUrl': 'input-file.component.html'
})
export class InputFileComponent {
    @Input() accept: string;
    @Output() FileSelect: EventEmitter<File[]> = new EventEmitter();

    @ViewChild('inputFile') nativeInputFile: ElementRef;

    private _files: File[];

    get fileCount(): number { return this._files && this._files.length || 0; }

    onNativeInputFileSelect($event) {
        this._files = $event.srcElement.files;
        this.FileSelect.emit(this._files);
    }

    selectFile() {
        this.nativeInputFile.nativeElement.click();
    }
}
