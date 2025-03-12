import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MaterialModule } from '../../material/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-micertificado',
  standalone: true,
  imports: [MaterialModule,FormsModule,ReactiveFormsModule,MatIconModule],
  templateUrl: './micertificado.component.html',
  styleUrl: './micertificado.component.css'
})
export class MicertificadoComponent {

  certificadoForm: FormGroup;
  constructor() {
    this.certificadoForm = new FormGroup({
      nombre: new FormControl(''),
      email: new FormControl('')
    });
  }

  onSubmit() {
    console.log(this.certificadoForm.value);
  }

}
