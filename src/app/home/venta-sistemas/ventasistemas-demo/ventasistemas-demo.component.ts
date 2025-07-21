import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ventasistemas-demo',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './ventasistemas-demo.component.html',
  styleUrl: './ventasistemas-demo.component.css'
})
export class VentasistemasDemoComponent {

}
