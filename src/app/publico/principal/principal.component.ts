import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';



@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

}
