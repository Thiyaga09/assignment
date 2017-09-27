import { Component, OnInit } from '@angular/core';
import {EmployeeRpService} from './employee-rp.service';
import {Employee} from './employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  public employees: Employee[];
  constructor(private employeeRP: EmployeeRpService, ) {
    this.employeeRP.getEmployee().subscribe(res => {
      this.employees = res['results'];
    });
  }

  ngOnInit() {
  }

}
