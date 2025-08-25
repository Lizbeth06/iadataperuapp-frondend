import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Convocatoria } from '../../../model/convocatoria';
import { ConvocatoriaService } from '../../../services/convocatoria.service';
import { RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-convocatoria-lista',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './convocatoria-lista.component.html',
  styleUrl: './convocatoria-lista.component.css'
})
export class ConvocatoriaListaComponent implements OnInit {
  displayedColumns: string[] = ['idConvocatoria', 'numconvocatoria', 'objetivo', 'fregistro', 'urlbase', 'urlresultadoinscripcion', 'urlresultadoconocimiento', 'urlresultadopsicologico', 'urlresultadocurricular', 'urlresultadoentrevista', 'urlresultadofinal', 'comunicados', 'tipo', 'ubigeo'];
  dataSource!: MatTableDataSource<Convocatoria>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  convocatoria: Convocatoria[] = []

  constructor(
    private convocatoriaService: ConvocatoriaService
  ) {
    //const instituciones = Array.from({ length: 100 }, (_, k) => this.createNewInstitucion(k + 1));
    //this.dataSource = new MatTableDataSource(instituciones);
  }

  ngOnInit(): void {
    this.convocatoriaService.findAll().subscribe(data => {
      // Filtrar solo los que tienen estado = 1
      const filtrados = data.filter(conv => conv.estado === 1);
      // Ordenar de mayor a menor por idConvocatoria
      const ordenado = filtrados.sort((a, b) => b.idConvocatoria - a.idConvocatoria);
      this.cargarTabla(ordenado);
    });
  }


  cargarTabla(data: Convocatoria[]) {
    this.dataSource = new MatTableDataSource<Convocatoria>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  inscripcion() {
  }
}
