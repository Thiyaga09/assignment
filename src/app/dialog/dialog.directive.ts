import {ComponentFactoryResolver, Directive, Input, ViewChild, ViewContainerRef} from '@angular/core';
import {DialogService} from './dialog.service';

@Directive({
  selector: '[appDialog]'
})
export class DialogDirective {
  @ViewChild('popupRoot', { read: ViewContainerRef })
  @Input() appDialog: any;
  parent: ViewContainerRef;
  constructor(private dialogService: DialogService, viewContainerRef: ViewContainerRef,  componentFactoryResolver: ComponentFactoryResolver) {
    this.dialogService.viewContainerRef = viewContainerRef;
    this.dialogService.componentFactoryResolver = componentFactoryResolver;
  }

}
