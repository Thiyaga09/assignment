import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import {HttpModule} from '@angular/http';
import {EmployeeRpService} from './employee-list/employee-rp.service';
import {MessageBusService} from './service/messageBus/message-bus.service';
import {DialogComponent} from './dialog/dialog.component';
import {DialogService} from './dialog/dialog.service';
import { DialogDirective } from './dialog/dialog.directive';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeListComponent,
    DialogComponent,
    DialogDirective
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [EmployeeRpService, MessageBusService, DialogService],
  entryComponents: [
    DialogComponent,
    EmployeeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
