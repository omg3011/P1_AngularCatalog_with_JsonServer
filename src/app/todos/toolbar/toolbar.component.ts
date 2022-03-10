import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  addTaskDialog(): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '70%'
    });

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if(res != undefined) {
          this.refreshCurrentUrlPage();
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  refreshCurrentUrlPage() : void {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }


}
