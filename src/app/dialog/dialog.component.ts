import { Component, OnInit } from '@angular/core';
import {MessageBusService} from '../service/messageBus/message-bus.service';
import {PopupAction} from '../model/employeeAction';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  private fullscreen = null;
  id = 0;
  z = 100;
  constructor(private msgBus: MessageBusService) {

  }

  ngOnInit() {
  }
  closePopup(): void {
    this.msgBus.publish(new PopupAction(3, 'close', this.id));
  }
}
