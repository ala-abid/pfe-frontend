import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from './material/material.module';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';

@NgModule({
  declarations: [DeleteConfirmationDialogComponent],
  imports: [
    CommonModule, FormsModule, MaterialModule
  ],
  exports: [
    FormsModule, MaterialModule, DeleteConfirmationDialogComponent
  ]
})
export class SharedModule { }
