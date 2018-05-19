import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.html',
})
export class Dialog implements OnInit {

  questionData: FormGroup;

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

      this.questionData = new FormGroup ({
        order: new FormControl(),
        type: new FormControl(),
        question: new FormControl('',Validators.required),
        options: new FormGroup({
          helperText: new FormControl(),
          optionValue: new FormControl()
        }),
        maxValue: new FormControl(),
        multiplier:new FormControl(),
        disabled: new FormControl(),
        value: new FormControl()
      })

      if(this.data){
        this.questionData.setValue({
          order: this.data.order,
          type: this.data.type,
          question: this.data.question,
          options: this.data.options,
          maxValue: this.data.maxValue,
          multiplier: this.data.multiplier,
          disabled: this.data.disabled,
          value: this.data.value
        });
      }

     }

  needsOptions(): boolean {
    if (this.questionData.get('type').value === 'text' || this.questionData.get('type').value === 'switch'){
      return false;
    }
    else{
      return true;
    }
  }

  toggleAddAnOption(): void {
    this.addAnOption = !this.addAnOption;
  }

  addOption(): void {
    this.newOption.helperText = this.questionData.get('options').get('helperText').value;
    this.newOption.value = parseInt(this.questionData.get('options').get('optionValue').value);
    this.data.options.push(this.newOption);
  }

  removeOption(index: number): void {
    this.data.options.splice(index, 1);
  }

  save(): void{
    this.data = this.questionData.value;
    console.log(this.data);
    this.dialogRef.close({result: this.data});
  }

  onNoClick(): void {
    this.dialogRef.close({result: this.data});
  }

}
