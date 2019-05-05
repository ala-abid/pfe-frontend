import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule, MatButtonModule,
  MatChipsModule, MatDialogModule, MatIconModule,
  MatInputModule, MatMenu, MatMenuModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule, MatSlideToggleModule, MatTabsModule, MatTooltipModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatAutocompleteModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatMenuModule
  ],
  exports: [
    MatAutocompleteModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatMenuModule
  ]
})
export class MaterialModule { }
