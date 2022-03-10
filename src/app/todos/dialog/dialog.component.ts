import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

interface TaskCategory {
  value: string;
  viewValue: string;
}
interface TaskPriority {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {

  selectedCategory?: string;
  selectedPriority?: string;
  actionName: string = "Save";

  categories : TaskCategory[] = [
    {value: 'daily', viewValue: 'Daily'},
    {value: 'weekly', viewValue: 'Weekly'},
    {value: 'monthly', viewValue: 'Monthly'},
  ];

  priorities : TaskPriority[] = [
    {value: 'low', viewValue: 'Low'},
    {value: 'medium', viewValue: 'Medium'},
    {value: 'high', viewValue: 'High'},
  ];

  taskForm !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      taskTitle : ['', Validators.required],
      taskCategory: ['', Validators.required],
      taskDate: ['', Validators.required],
      taskDuration: ['', Validators.required],
      taskDescription: ['', Validators.required],
      taskPriority: ['', Validators.required]
    });

    if(this.editData) {
      this.actionName = "Update";
      this.selectedCategory = this.editData.taskCategory;
      this.selectedPriority = this.editData.taskPriority;

      this.taskForm.controls['taskTitle'].setValue(this.editData.taskTitle);
      this.taskForm.controls['taskCategory'].setValue(this.editData.taskCategory);
      this.taskForm.controls['taskDate'].setValue(this.editData.taskDate);
      this.taskForm.controls['taskDuration'].setValue(this.editData.taskDuration);
      this.taskForm.controls['taskDescription'].setValue(this.editData.taskDescription);
      this.taskForm.controls['taskPriority'].setValue(this.editData.taskPriority);
    }
  }

  addTask() : void {
    this.taskForm.controls['taskCategory'].setValue(this.selectedCategory);
    this.taskForm.controls['taskPriority'].setValue(this.selectedPriority);

    if(this.taskForm.valid) {
      if(this.actionName=="Save"){
        this.addNewTask();
      } else if(this.actionName == "Update") {
        this.updateTask();
      }
    }

  }

  addNewTask() : void {
    this.api.postTask(this.taskForm.value)
      .subscribe({
        next: (res) => {
          alert("Task added.");
          this.taskForm.reset();
          this.dialogRef.close('saved');
        },
        error: () => {
          alert("Error adding task.")
        }
      });
  }

  updateTask() : void {
    //this.api.putTask(this.editData.id, this.taskForm)
    this.api.putTask(this.editData.id, this.taskForm.value)
      .subscribe({
        next: (res) => {
          alert("Task updateded.");
          this.taskForm.reset();
          this.dialogRef.close('updated');
        },
        error: (err) => {
          alert("Error updating task: " + err);
        }
      });
  }

}
