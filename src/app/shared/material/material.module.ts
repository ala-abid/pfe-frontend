import { NgModule } from '@angular/core';
import {MatAutocompleteModule, MatInputModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatAutocompleteModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatAutocompleteModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule { }
