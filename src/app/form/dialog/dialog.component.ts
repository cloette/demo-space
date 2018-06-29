import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.html',
})
export class Dialog implements OnInit {

  public order = new FormControl();
  public type = new FormControl();
  public question = new FormControl();
  public options = [];
  public optionsHelperText = new FormControl();
  public optionsValue = new FormControl();
  public maxValue = new FormControl();
  public multiplier = new FormControl();
  public disabled = new FormControl();
  public value = new FormControl();

  public types = [
    { value: 'text', viewValue: 'Text Field' },
    { value: 'radio', viewValue: 'Radio Options' },
    { value: 'checkbox', viewValue: 'Checkbox' },
    { value: 'switch', viewValue: 'Toggle' },
    { value: 'select', viewValue: 'Dropdown' },
  ];

  public newOption;

  public addAnOption: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if (this.data) {
      this.order.setValue(this.data.order);
      this.type.setValue(this.data.type);
      this.question.setValue(this.data.question);
      this.options = this.data.options; //arrays gotta be different
      this.maxValue.setValue(this.data.maxValue);
      this.multiplier.setValue(this.data.multiplier);
      this.disabled.setValue(this.data.disabled);
      this.value.setValue(this.data.value);
    }

  }

  public needsOptions(): boolean {
    if (this.value.value === 'text' || this.type.value === 'switch') {
      return false;
    }
    else {
      return true;
    }
  }

  public toggleAddAnOption(): void {
    this.addAnOption = !this.addAnOption;
  }

  public addOption(): void {
    this.newOption.helperText = this.optionsHelperText.value;
    this.newOption.value = parseInt(this.optionsValue.value);
    this.options.push(this.newOption);
  }

  public removeOption(index: number): void {
    this.options.splice(index, 1);
  }

  public save(): void {
    this.data = {
      order: this.order.value,
      type: this.type.value,
      question: this.question.value,
      options: this.options,
      maxValue: this.maxValue.value,
      multipler: this.multiplier.value,
      disabled: this.disabled.value,
      value: this.value.value
    };
    console.log("saved field" + this.data);
    this.dialogRef.close({ result: this.data });
  }

  public onNoClick(): void {
    this.dialogRef.close({ result: this.data });
  }

}
