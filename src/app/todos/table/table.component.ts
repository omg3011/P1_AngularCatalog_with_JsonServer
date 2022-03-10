import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['taskid', 'taskTitle', 'taskCategory', 'taskDate', 'taskDuration', 'taskDescription', 'taskPriority', 'taskActions'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService) { }

  ngOnInit(): void {
    this.getAllTasks();
  }
  getAllTasks(): void {
    this.api.getTasks()
      .subscribe({
        next:(res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (res) => {
          alert("Error fetching the tasks.");
        }
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editButton(row: any) {
    this.dialog.open(DialogComponent, {
      width: "70%",
      data:row
    }).afterClosed().subscribe(
      val => {
        if(val === 'update' || val != undefined) {
          this.getAllTasks();
        }
      }
    );
  }

  deleteButton(id: any) {
    this.api.deleteTask(id)
      .subscribe({
        next: (res) => {
          alert("Task was deleted.");
          this.getAllTasks();
        },
        error: (err) => {
          alert("Error deleting task.");
        }
      })
  }
}
