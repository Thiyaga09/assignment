import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Employee} from './employee';

@Injectable()
export class EmployeeRpService {

  constructor(private http: Http) { }

  getEmployee(): Observable< Employee[]> {
    return this.http.get('https://swapi.co/api/planets/?format=json').map(res => res.json());
  }
}
