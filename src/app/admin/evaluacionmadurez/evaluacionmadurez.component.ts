import { Component, computed, inject, signal } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '../../services/persona.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EvaluacionService } from '../../services/evaluacion.service';
import { ExitoDialogComponent } from '../exito-dialog/exito-dialog.component';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-evaluacionmadurez',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './evaluacionmadurez.component.html',
  styleUrl: './evaluacionmadurez.component.css'
})
export class EvaluacionmadurezComponent {
  private fb = inject(FormBuilder);
  private personaSrv = inject(PersonaService);
  private snack = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  evalSrv = inject(EvaluacionService);

  buscando = signal(false);
  puntajes = signal<Record<string, number>>({});
  mensajeErrorRuc = '';

  form: FormGroup = this.fb.group({
    ruc: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
    razonSocial: [{ value: '', disabled: true }, Validators.required],
    perDireccion: [{ value: '', disabled: true }],
    sede: [{ value: '', disabled: false }],
  });

  dimensiones = ['Gobernanza', 'Procesos', 'Datos', 'Tecnología', 'Talento'];
  escala = [1, 2, 3, 4, 5];
  columnas = ['idEvaluaciontd', 'ruc', 'razonSocial','sede', 'fecha', 'promedio', 'nivel'];

  ngOnInit(): void {
    this.listarEvaluaciones();

    // 🔎 Detectar cuando el usuario termina de escribir el RUC
    this.form.get('ruc')!.valueChanges
      .pipe(debounceTime(600), distinctUntilChanged())
      .subscribe((valor: string) => {
        if (/^\d{11}$/.test(valor)) {
          this.buscarRuc(); // dispara búsqueda automática
        }
      });
  }

  criteriosPorDim(dim: string) {
    return this.evalSrv.criterios.filter(c => c.dimension === dim);
  }

  setPuntaje(id: string, val: number) {
    this.puntajes.update(p => ({ ...p, [id]: val }));
  }

  porDimension = computed(() => {
    const p = this.puntajes();
    const res: Record<string, number> = {};
    for (const dim of this.dimensiones) {
      const items = this.evalSrv.criterios.filter(c => c.dimension === dim);
      const vals = items.map(c => p[c.id]).filter(v => typeof v === 'number');
      res[dim] = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    }
    return res;
  });

  promedioGlobal = computed(() => {
    const vals = Object.values(this.puntajes()).filter(v => typeof v === 'number');
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
  });

  totalCriterios = computed(() => this.evalSrv.criterios.length);
  evaluados = computed(() => Object.values(this.puntajes()).filter(v => typeof v === 'number').length);

  buscarRuc() {
    const ruc = this.form.get('ruc')!.value;
    if (!/^\d{11}$/.test(ruc)) {
      this.snack.open('El RUC debe tener 11 dígitos', 'Cerrar', { duration: 3000 });
      return;
    }
    this.buscando.set(true);
    this.personaSrv.findPersonaRuc(ruc).subscribe({
      next: (empresa: any) => {
        this.buscando.set(false);

        if (empresa?.razonSocial) {
          // ✅ Datos encontrados → llenar y mantener deshabilitados
          this.form.patchValue({
            razonSocial: empresa.razonSocial,
            perDireccion: empresa.direccion,
            sede: empresa.sede,
          });
          this.form.get('razonSocial')!.disable();
          this.form.get('perDireccion')!.disable();
          
          this.mensajeErrorRuc = '';
        } else {
          // ❌ No encontrado → habilitar para ingreso manual
          this.mensajeErrorRuc = 'No se encontraron datos para el RUC, ingrese manualmente';
          this.snack.open(this.mensajeErrorRuc, 'Cerrar', { duration: 4000 });
          this.form.get('razonSocial')!.enable();
          this.form.get('perDireccion')!.enable();
      
        }
      },
      error: () => {
        this.buscando.set(false);
        this.mensajeErrorRuc = 'Error consultando el RUC, ingrese manualmente';
        this.snack.open(this.mensajeErrorRuc, 'Cerrar', { duration: 3000 });
        this.form.get('razonSocial')!.enable();
        this.form.get('perDireccion')!.enable();
      
      },
    });
  }

  registrar() {
    if (this.form.get('ruc')!.invalid || !this.form.getRawValue().razonSocial) {
      this.snack.open('Busque primero los datos de la empresa o ingrese manualmente', 'Cerrar', { duration: 3000 });
      return;
    }
    if (this.evaluados() < this.totalCriterios()) {
      this.snack.open(`Faltan ${this.totalCriterios() - this.evaluados()} criterios por evaluar`, 'Cerrar', { duration: 3000 });
      return;
    }

    const raw = this.form.getRawValue();
    const prom = this.promedioGlobal();
    const nivel = this.evalSrv.nivelMadurez(prom);

    this.evalSrv.registrar({
      ruc: raw.ruc,
      razonSocial: raw.razonSocial,
      direccion: raw.perDireccion,
      sede: raw.sede,
      fecha: new Date().toLocaleString(),
      puntajes: JSON.stringify(this.puntajes()),
      porDimension: JSON.stringify(this.porDimension()),
      promedioGlobal: prom,
      nivel,
    }).subscribe({
      next: (guardado) => {
        this.dialog.open(ExitoDialogComponent, {
          data: { promedio: prom, nivel, razonSocial: guardado.razonSocial, sede: guardado.sede },
          width: '420px',
        });

        this.snack.open(`✔ Evaluación guardada. Promedio global: ${prom.toFixed(2)} (${nivel})`, 'Cerrar', {
          duration: 5000,
          panelClass: ['snack-exito'],
        });

        this.listarEvaluaciones();
        this.form.reset();
        this.form.get('razonSocial')!.disable();
        this.form.get('perDireccion')!.disable();
        this.form.get('sede')!.disable();
        this.puntajes.set({});
      },
      error: () => this.snack.open('Error al guardar evaluación', 'Cerrar', { duration: 3000 })
    });
  }

  listarEvaluaciones() {
    this.evalSrv.listar().subscribe({
      next: (data) => {
        const parsed = data.map(e => ({
          ...e,
          puntajes: e.puntajes ? JSON.parse(e.puntajes) : {},
          porDimension: e.porDimension ? JSON.parse(e.porDimension) : {}
        }));
        
        this.evalSrv.evaluaciones.set(parsed);
      },
      error: () => this.snack.open('Error al listar evaluaciones', 'Cerrar', { duration: 3000 })
    });
  }
}
