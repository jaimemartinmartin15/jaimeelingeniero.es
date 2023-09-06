import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { finalize, map, tap } from 'rxjs';
import { CollapsibleComponent } from 'src/shared/components/collapsible/collapsible.component';
import { COMMENT, DEFAULT_DATA_FILE, LINE_SEPARATOR } from '../../constants';
import { FileLine } from '../../file-line';
import { LOCAL_STORE_KEYS } from '../../local-storage-keys';
import { DataFile } from './data-file';

@Component({
  selector: 'app-data-file-selector',
  templateUrl: './data-file-selector.component.html',
  styleUrls: ['./data-file-selector.component.scss'],
})
export class DataFileSelectorComponent implements OnInit {
  @ViewChild(CollapsibleComponent)
  public collapsibleComponentRef: CollapsibleComponent;

  public dataFiles: DataFile[] = [];
  public selectedDataFile: DataFile;

  @Output()
  public isLoading: EventEmitter<boolean> = new EventEmitter();

  @Output()
  public error: EventEmitter<boolean> = new EventEmitter();

  @Output()
  public loadNewDataFile: EventEmitter<FileLine[]> = new EventEmitter();

  public constructor(private readonly http: HttpClient) {}

  public ngOnInit() {
    this.dataFiles = JSON.parse(localStorage.getItem(LOCAL_STORE_KEYS.DATA_FILES) ?? JSON.stringify([DEFAULT_DATA_FILE]));
    this.selectedDataFile = JSON.parse(localStorage.getItem(LOCAL_STORE_KEYS.DEFAULT_DATA_FILE) ?? JSON.stringify(this.dataFiles[0]));

    this.selectDataFile(this.selectedDataFile);
  }

  public addNewDataFile(inputRef: HTMLInputElement) {
    // TODO add validation (and adapt height of the collapsible)
    const value = inputRef.value;
    inputRef.value = '';
    const newFile = { alias: value.split(':')[0].trim(), url: value.split(/:(.*)/s)[1].trim() };
    this.dataFiles.push(newFile);
    localStorage.setItem(LOCAL_STORE_KEYS.DATA_FILES, JSON.stringify(this.dataFiles));
  }

  public deleteDataFile(dataFile: DataFile) {
    this.dataFiles = this.dataFiles.filter((f) => f !== dataFile);
    if (this.dataFiles.length === 0) {
      localStorage.removeItem(LOCAL_STORE_KEYS.DATA_FILES);
      localStorage.removeItem(LOCAL_STORE_KEYS.DEFAULT_DATA_FILE);
    } else {
      localStorage.setItem(LOCAL_STORE_KEYS.DATA_FILES, JSON.stringify(this.dataFiles));
      // TODO replace default data file (and adapt height of the collapsible)
    }
  }

  public selectDataFile(dataFile: DataFile): void {
    this.selectedDataFile = dataFile;
    this.isLoading.emit(true);
    this.http
      .get(dataFile.url, { responseType: 'text' })
      .pipe(
        map((response: string) =>
          response
            .split(/\r?\n/) // divide the lines
            .filter((l) => !l.trim().startsWith(COMMENT) && l.trim() !== '') // Ignore commented and empty lines
            .map((l) => l.substring(0, l.indexOf(COMMENT) !== -1 ? l.indexOf(COMMENT) : l.length).trim()) // Remove comments and spaces in lines that contain data
            .map((l) => {
              const [date, liters, bulletColor, popUpContent] = l.split(LINE_SEPARATOR);
              return {
                date: date.trim(),
                liters: liters.trim(),
                bulletColor: bulletColor?.trim() ?? '',
                popUpContent: popUpContent?.trim() ?? '',
              };
            })
        ),
        tap((fileLines) => this.loadNewDataFile.emit(fileLines)),
        tap(() => localStorage.setItem(LOCAL_STORE_KEYS.DEFAULT_DATA_FILE, JSON.stringify(this.selectedDataFile))),
        tap(() => this.collapsibleComponentRef.onClickToggleAction()),
        finalize(() => this.isLoading.emit(false))
      )
      .subscribe({
        next: () => this.error.emit(false),
        error: () => this.error.emit(true),
      });
  }
}
