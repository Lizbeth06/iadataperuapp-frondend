import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { Dropdown } from 'bootstrap';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule,RouterOutlet,MaterialModule, NgClass],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements AfterViewInit {
  navbarOpen = false;
  isCatalogoOpen = false;
  isFormacionOpen = false;
  isNosotrosOpen = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  closeNavbar() {
    this.navbarOpen = false;
    this.isCatalogoOpen = false;
    this.isFormacionOpen = false;
    this.isNosotrosOpen = false;
  }

  toggleDropdown(menu: string, event: Event) {
    event.stopPropagation(); // evita que el evento cierre el navbar
    if (menu === 'catalogo') {
      this.isCatalogoOpen = !this.isCatalogoOpen;
      this.isFormacionOpen = false;
    } else if (menu === 'formacion') {
      this.isFormacionOpen = !this.isFormacionOpen;
      this.isCatalogoOpen = false;
    } else if (menu === 'nosotros') {
      this.isNosotrosOpen = !this.isNosotrosOpen;
      this.isCatalogoOpen = false;
    }
  }

  ngAfterViewInit(): void {
    // Ya no necesitas inicializar Bootstrap JS
  }

  @HostListener('document:click')
  closeDropdowns() {
    this.isCatalogoOpen = false;
    this.isFormacionOpen = false;
    this.isNosotrosOpen = false;
  }
}