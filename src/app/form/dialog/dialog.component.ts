import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.html',
  styleUrls: ['./dialog.component.css']
})
export class Dialog implements OnInit {
  public order;
  public type;
  public question;
  public options = [];
  public optionsHelperText;
  public optionsValue;
  public maxValue;
  public multiplier;
  public disabled;
  public value;
  public addAnOption: boolean = false;

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
    if (this.options != undefined) {
      this.options.push({ helperText: this.optionsHelperText.value, value: this.optionsValue.value });
    }
  }

  removeOption(index: number): void {
    if (this.options != undefined) {
      this.options.splice(index, 1);
    }
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
    console.log("saved field" + JSON.stringify(this.data));
    this.dialogRef.close({ result: this.data });
  }

  onNoClick(): void {
    this.dialogRef.close({ result: false });
  }

}
