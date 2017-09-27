import {Input, Component, OnInit } from '@angular/core';
import {MessageBusService} from '../service/messageBus/message-bus.service';
import {EmployeeAction, PopupAction} from '../model/employeeAction';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  private subscription:any;
  @Input('employee') employee;
  private isPopup = false;
  isActive = false;
  constructor(private msgBus: MessageBusService) {
    this.subscription = this.msgBus.listenFor(EmployeeAction)
      .subscribe(action  => {
        if (action.name === 'close' && this.employee && !this.isPopup) {
          this.isActive = false;
        } else if (action.name === 'info' && (!this.employee || this.isPopup)) {
          this.isPopup = true;
          this.isActive = true;
          this.employee = action.data;
        }
      });
  }

  ngOnInit() {
  }

  toggleContent() {
    if (this.isPopup){
      return;
    }
    if (this.isActive){
      this.isActive = false;
    }else {
      this.msgBus.publish(new EmployeeAction(1, 'close'));
      this.isActive = true;
    }
  }
  openDialog() {
    if (this.isPopup){
      return;
    }
    this.msgBus.publish(new PopupAction(2, 'openDialog', this.employee));
    this.msgBus.publish(new EmployeeAction(2, 'info', this.employee ));
  }

}
