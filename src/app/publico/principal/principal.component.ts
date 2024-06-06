import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [MaterialModule,RouterLink],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

}
