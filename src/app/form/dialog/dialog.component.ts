import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatIconModule,
  MatIconRegistry,
  MatButtonModule,
  MatRippleModule,
  MatInputModule,
  MatSelectModule,
  MatOptionModule,
  MatFormFieldModule,
  MatFormFieldControl,
  MatSlideToggleModule
} from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.html',
  styleUrls: ['./dialog.component.css']
})
export class Dialog implements OnInit {

  order;
  type;
  question;
  options = [];
  optionsHelperText;
  optionsValue;
  maxValue;
  multiplier;
  disabled;
  value;
  newOption = { helperText: '', value: 0};
  addAnOption: boolean = false;
  /*public order = new FormControl();
  public type = new FormControl();
  public question = new FormControl();
  public options = [];
  public optionsHelperText = new FormControl();
  public optionsValue = new FormControl();
  public maxValue = new FormControl();
  public multiplier = new FormControl();
  public disabled = new FormControl();
  public value = new FormControl();*/

  types = [
    { value: 'text', viewValue: 'Text Field' },
    { value: 'radio', viewValue: 'Radio Options' },
    { value: 'checkbox', viewValue: 'Checkbox' },
    { value: 'switch', viewValue: 'Toggle' },
    { value: 'select', viewValue: 'Dropdown' },
  ];

  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if (this.data) {
      this.order = this.data.order;
      this.type = this.data.type;
      this.question = this.data.question;
      this.options = this.data.options;
      this.maxValue = this.data.maxValue;
      this.multiplier = this.data.multiplier;
      this.disabled = this.data.disabled;
      this.value = this.data.value;
      /*this.order.setValue(this.data.order);
      this.type.setValue(this.data.type);
      this.question.setValue(this.data.question);
      this.options = this.data.options; //arrays gotta be different
      this.maxValue.setValue(this.data.maxValue);
      this.multiplier.setValue(this.data.multiplier);
      this.disabled.setValue(this.data.disabled);
      this.value.setValue(this.data.value);*/
    }

  }

  needsOptions(): boolean {
    if (this.value === 'text' || this.type === 'switch') {
      return false;
    }
    else {
      return true;
    }
  }

  toggleAddAnOption(): void {
    this.addAnOption = !this.addAnOption;
  }

  addOption(): void {
    this.newOption.helperText = this.optionsHelperText.value;
    this.newOption.value = parseInt(this.optionsValue.value);
    this.options.push(this.newOption);
  }

  removeOption(index: number): void {
    this.options.splice(index, 1);
  }

  save(): void {
    this.data = {
      order: this.order,
      type: this.type,
      question: this.question,
      options: this.options,
      maxValue: this.maxValue,
      multipler: this.multiplier,
      disabled: this.disabled,
      value: this.value
    };
    console.log("saved field" + this.data);
    this.dialogRef.close({ result: this.data });
  }

  onNoClick(): void {
    this.dialogRef.close({ result: this.data });
  }

}
