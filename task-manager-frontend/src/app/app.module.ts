import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';

import { RouterModule } from '@angular/router';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';

import { ToggleButtonModule } from 'primeng/togglebutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TaskService } from './services/task.service';

@NgModule({
  declarations: [
    AppComponent,  
    TaskListComponent,  
  ],
  imports: [
    NoopAnimationsModule,  
    BrowserAnimationsModule,  
    BrowserModule,  
    HttpClientModule,  
    FormsModule,  
    TableModule,  
    DialogModule,  
    CheckboxModule, 
    ButtonModule,  
    DropdownModule,  
    ToggleButtonModule,  
    ConfirmDialogModule,  
    ToastModule,  
    RouterModule.forRoot([  
      { path: '', component: TaskListComponent },  
    ]),
  ],
  providers: [
    MessageService,  
    TaskService,  
  ],
  bootstrap: [AppComponent],  
})
export class AppModule {}
