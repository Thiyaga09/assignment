export class EmployeeAction {
  constructor(public id?: number,
              public name?: string,
              public data?: any,
  ) {}
}
export class PopupAction {
  constructor(public id?: number,
              public action?: string,
              public data?: any,

  ) {}
}
