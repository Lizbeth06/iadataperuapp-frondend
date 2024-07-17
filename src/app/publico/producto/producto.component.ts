import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [  CommonModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  showShareOptions = false;

  toggleShareOptions() {
    this.showShareOptions = !this.showShareOptions;
  }
}
