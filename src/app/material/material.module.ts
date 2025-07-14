import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule} from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatListModule} from '@angular/material/list';
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatChipsModule} from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { CustomDateAdapter } from './custom-adapter';


@NgModule({
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatCardModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatMenuModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTabsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatProgressBarModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatChipsModule, NgFor,NgIf
  ],
  providers:[
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es-ES'
    },
    {
      provide:DateAdapter,
      useClass:CustomDateAdapter
    }
  ],
  declarations: [],
  imports: [
    CommonModule,
  ]
})
export class MaterialModule { }