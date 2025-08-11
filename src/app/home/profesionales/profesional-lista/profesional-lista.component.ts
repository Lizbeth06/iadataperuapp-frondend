import { Component, inject, OnInit } from '@angular/core';
import { Trabajador } from '../../../model/trabajador';
import { MatDialog } from '@angular/material/dialog';
import { TrabajadorService } from '../../../services/trabajador.service';
import { PageEvent } from '@angular/material/paginator';
import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'app-profesional-lista',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './profesional-lista.component.html',
  styleUrl: './profesional-lista.component.css'
})
export class ProfesionalListaComponent implements OnInit{
  trabajador:Trabajador[] = [];
   
  trabajadorPaginada: Trabajador[] = [];
  searchText: string = '';
  trabajadorFiltrado: Trabajador[] = [];
  chips: { label: string; value: number; count: number; selected: boolean }[] = [];
  pageSize = 9;
  pageIndex = 0;

  readonly dialog = inject(MatDialog);
  private trabajadorService = inject(TrabajadorService);
  
    ngOnInit(): void {
  
      this.trabajadorService.findAll().subscribe(data => {
        const trabajadorFiltradosTipo = data;
  
        this.trabajador = trabajadorFiltradosTipo;
        this.trabajadorFiltrado = trabajadorFiltradosTipo; // Inicialmente igual
        this.setPaginado();
      });
  
    }

    setPaginado(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.trabajadorPaginada = this.trabajadorFiltrado.slice(start, end);
  }

  clearSearch(): void {
    this.searchText = '';
    this.trabajadorFiltrado = [...this.trabajador];
    this.setPaginado();
  }

  filtrarTrabajador(): void {
    const texto = this.searchText.toLowerCase().trim();
    // Obtener categoría seleccionada
    const categoriaSeleccionada = this.chips.find(chip => chip.selected);

    this.trabajadorFiltrado = this.trabajador.filter(p => {
      const cumpleBusqueda = p.persona.nombres?.toLowerCase().includes(texto) ||
        this.getPlainText(p.persona.nombres || '', 1000).toLowerCase().includes(texto);
      return cumpleBusqueda;
    });

    this.pageIndex = 0; 
    this.setPaginado();
  }

  getPlainText(html: string, limit: number): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = div.textContent || div.innerText || '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.setPaginado();
  }

}
