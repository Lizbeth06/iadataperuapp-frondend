import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-agendar-form',
  standalone: true,
  imports: [MaterialModule,CommonModule],
  templateUrl: './agendar-form.component.html',
  styleUrl: './agendar-form.component.css'
})
export class AgendarFormComponent {
   form!: FormGroup;

  operate(){

  }

  buscarxDoc(){
    
  }

}
