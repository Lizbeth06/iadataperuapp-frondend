import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-venta-sistemas',
  standalone: true,
  imports: [MaterialModule,CommonModule,RouterLink],
  templateUrl: './venta-sistemas.component.html',
  styleUrl: './venta-sistemas.component.css'
})
export class VentaSistemasComponent {

}
