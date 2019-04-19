import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatChipsModule, MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule, MatTabsModule, MatTooltipModule
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
    MatTabsModule
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
    MatTabsModule
  ]
})
export class MaterialModule { }
