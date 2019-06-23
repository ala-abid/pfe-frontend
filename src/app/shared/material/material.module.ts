import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule, MatBadgeModule, MatButtonModule,
  MatChipsModule, MatDialogModule, MatIconModule,
  MatInputModule, MatMenu, MatMenuModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule, MatSlideToggleModule, MatSnackBarModule, MatTabsModule, MatTooltipModule, MatPaginatorModule
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
    MatMenuModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatPaginatorModule
  ],
  exports: [
    MatPaginatorModule,
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
    MatMenuModule,
    MatSnackBarModule,
    MatBadgeModule

  ]
})
export class MaterialModule { }
