import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DialogResult } from '../dialog-result.enum';

export type DialogType = "error" | "success" | "question";
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.styl']
})
export class DialogComponent implements OnInit {
  @Output() public dialogResult: EventEmitter<DialogResult> = new EventEmitter<DialogResult>();

  isVisible: boolean = false;
  type: DialogType = 'success';
  title: string = '';
  text: string = '';

  constructor() {

  }

  ngOnInit(): void {

  }

  public show(type: DialogType, title: string, text: string): EventEmitter<DialogResult> {
    this.type = type;
    this.title = title;
    this.text = text;
    this.isVisible = true;
    return this.dialogResult;
  }

  onOk(): void {
    this.isVisible = false;
    this.dialogResult.emit(DialogResult.OK);
  }

  onYes(): void {
    this.isVisible = false;
    this.dialogResult.emit(DialogResult.YES);
  }

  onNo(): void {
    this.isVisible = false;
    this.dialogResult.emit(DialogResult.NO);
  }
}
