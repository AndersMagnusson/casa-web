import {
  MatSlideToggleModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatCheckboxModule,
  MatIconRegistry,
  MatExpansionModule,
  MatGridListModule,
  MatDialogModule,
  MatSnackBarModule,
  MatStepperModule,
} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatSlideToggleModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    MatMenuModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatGridListModule,
    MatDialogModule,
    MatSnackBarModule,
    MatStepperModule],
  exports: [
    MatSlideToggleModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    MatMenuModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatGridListModule,
    MatDialogModule,
    MatSnackBarModule,
    MatStepperModule
  ],
})
export class CustomMaterialModule { }
