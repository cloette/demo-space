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
    if(this.options = []){
      this.options = [{ helperText: 'Example Option', value: '0' }];
    }
  }

  needsOptions(): boolean {
    if (this.type === 'text' || this.type === 'switch') {
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
    console.log("adding option to " + this.options);
    this.options.push({ helperText: this.optionsHelperText, value: this.optionsValue });
    console.log("Options Array", this.options);
  }

  removeOption(index: number): void {
    console.log("removing option");
    this.options.splice(index, 1);
    console.log("Options Array", this.options);
  }

  save(): void {
    if(this.options){
      if (this.options[0].helperText === "Example Option"){
        this.options.splice(0, 1); // Remove dummy value
      }
    }
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
