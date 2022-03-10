import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TodosComponent } from './todos.component';
import { DialogComponent } from './dialog/dialog.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { TableComponent } from './table/table.component';
import {MatPaginatorModule} from '@angular/material/paginator';

import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';




@NgModule({
  declarations: [
    ToolbarComponent,
    TodosComponent,
    DialogComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,

    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
  ]
})
export class TodosModule { }
