import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
export interface ExitoData {
  promedio: number;
  nivel: string;
  razonSocial: string;
  sede: string;
}

@Component({
  selector: 'app-exito-dialog',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './exito-dialog.component.html',
  styleUrl: './exito-dialog.component.css'
})
export class ExitoDialogComponent {
   constructor(
    public ref: MatDialogRef<ExitoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExitoData
  ) {} 
}
