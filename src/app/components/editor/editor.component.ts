import { Component, ElementRef, forwardRef, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorComponent),
      multi: true
    },
  ]
})
export class EditorComponent implements OnInit, ControlValueAccessor {

  private onChange: (value: string) => void;
  private onTouched: () => void;

  public modeVisual = true;
  public changed = false;
  public showPlaceholder = false;
  public disabled = false;
  public focused = false;
  public touched = false;

  @ViewChild('editor', { static: true })
  public textArea: ElementRef;


  @Input()
  public title = '';

  @Output()
  public html;

  constructor(private r: Renderer2) { }

  writeValue(value: any): void {

    if (value === undefined || value === '' || value === '<br>') {
      value = null;
    }

    this.refreshView(value);

  }

  registerOnChange(fn: any): void {
    this.onChange = e => (e === '<br>' ? fn('') : fn(e));
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

  refreshView(value: string): void {
    const normalizedValue = value === null ? '' : value;
    this.r.setProperty(this.textArea.nativeElement, 'innerHTML', normalizedValue);

    return;
  }

  onContentChange(element: any): void {

    let html = '';

    if (this.modeVisual) {
      html = element.innerHTML;
    } else {
      html = element.innerText;
    }

    if ((!html || html === '<br>')) {
      html = '';
    }

    if (typeof this.onChange === 'function') {
      this.onChange(html);
    }

    this.changed = true;

  }

}
