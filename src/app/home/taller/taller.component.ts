import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-taller',
  standalone: true,
  imports: [MaterialModule,RouterLink,RouterModule],
  templateUrl: './taller.component.html',
  styleUrl: './taller.component.css'
})
export class TallerComponent {

}
