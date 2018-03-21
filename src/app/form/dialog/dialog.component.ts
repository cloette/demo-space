import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.html',
})
export class Dialog {

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

  needsOptions(type: string): boolean {
    if (type === 'text' || type === 'switch'){
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
    this.data.options.push(this.newOption);
  }

  removeOption(index: number): void {
    this.data.options.splice(index, 1);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
