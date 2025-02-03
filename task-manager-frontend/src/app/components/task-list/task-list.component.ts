import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  
  displayDialog: boolean = false;
  
  
  task: Task = { name: '', completed: false };

  constructor(
    private taskService: TaskService, 
    private confirmationService: ConfirmationService, 
    private messageService: MessageService 
  ) {}

  // Lifecycle hook to load tasks when the component is initialized
  ngOnInit(): void {
    this.loadTasks();
  }

  // Method to load the tasks from the server
  loadTasks(): void {
    this.taskService.getTasks().subscribe((response: any) => {
      this.tasks = response.content; // Extract tasks if paginated
    });
  }

  // Method to toggle the completion status of a task
  toggleCompletion(task: Task): void {
    const updatedTask: Task = { ...task, completed: !task.completed };

    this.taskService.updateTask(task.id!, updatedTask).subscribe(() => {
      // Display success message when task status is updated
      this.messageService.add({
        severity: 'success',
        summary: 'Updated',
        detail: `Task marked as ${updatedTask.completed ? 'completed' : 'in progress'}`,
        life: 3000,
      });
      this.loadTasks(); // Reload tasks after update
    });
  }

  // Method to confirm deletion of a task
  confirmDelete(task: Task): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete the task: "${task.name}"?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteTask(task.id!); // Proceed with task deletion
      },
      reject: () => {
        // Show a cancellation message
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Task deletion cancelled',
          life: 3000,
        });
      }
    });
  }

  // Method to delete a task by its ID
  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      // Remove deleted task from the local task list
      this.tasks = this.tasks.filter((t) => t.id !== id);
      // Show a success message for task deletion
      this.messageService.add({
        severity: 'success',
        summary: 'Deleted',
        detail: 'Task deleted successfully',
        life: 3000,
      });
    });
  }

  // Method to display the dialog for adding a new task
  showDialog(): void {
    this.task = { name: '', completed: false }; // Reset task data for new task
    this.displayDialog = true; // Open the dialog
  }

  // Method to save the new or edited task
  saveTask(): void {
    if (!this.task.name) {
      // Show warning if task name is empty
      this.messageService.add({
        severity: 'warn',
        summary: 'Error',
        detail: "Task name is required",
        life: 3000,
      });
      return;
    }

    if (this.task.id) {
      // If task has an ID, it is being updated
      this.taskService.updateTask(this.task.id, this.task).subscribe(() => {
        // Show success message and reload tasks after update
        this.messageService.add({
          severity: 'success',
          summary: 'Updated',
          detail: 'Task updated successfully',
          life: 3000,
        });
        this.loadTasks();
        this.displayDialog = false; // Close the dialog
      });
    } else {
      // If task does not have an ID, it is a new task
      this.taskService.createTask(this.task).subscribe(() => {
        // Show success message and reload tasks after task creation
        this.messageService.add({
          severity: 'success',
          summary: 'Added',
          detail: 'New task added successfully',
          life: 3000,
        });
        this.loadTasks();
        this.displayDialog = false; // Close the dialog
      });
    }
  }

  // Method to open the dialog for editing an existing task
  editTask(task: Task): void {
    this.task = { ...task }; // Clone task data to be edited
    this.displayDialog = true; // Open the dialog
  }

  // Options for filtering tasks by status
  statusOptions = [
    { label: 'All', value: null },
    { label: 'Completed', value: true },
    { label: 'In Progress', value: false },
  ];

  // Variable to hold the selected status filter
  selectedStatus: boolean | null = null;

  // Method to filter tasks by selected status
  filterByStatus(): void {
    if (this.selectedStatus === null) {
      this.loadTasks(); // Load all tasks if no filter is applied
    } else {
      // Filter tasks by completion status
      this.tasks = this.tasks.filter(task => task.completed === this.selectedStatus);
    }
  }
}
