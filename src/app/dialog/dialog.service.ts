import {ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {HTMLElementUtil} from './HTMLUtilities';
import {DialogComponent} from './dialog.component';
import {PopupAction} from '../model/employeeAction';
import {MessageBusService} from '../service/messageBus/message-bus.service';
import {EmployeeComponent} from '../employee/employee.component';

export class PopupInfo {
  popup: ComponentRef<any>;
  modal: HTMLElement;
  wrapper: HTMLElement;
  contrlPanel: HTMLElement;
  popupContent: HTMLElement;
  dragXOffset = 0;
  dragYOffset = 0;
  type;
  ar = 0;
  constructor() {
  }

}


@Injectable()
export class DialogService {


  private bodyHtml: HTMLElement;
  fs = false;
  modalZIndex = 10000;
  popupQueue: PopupInfo[] = [];
  public viewContainerRef: ViewContainerRef;
  public componentFactoryResolver: ComponentFactoryResolver;
  private subscription: any;
  constructor(private msgBus: MessageBusService) {
    this.subscription = this.msgBus.listenFor(PopupAction)
      .subscribe(popup  => {
        if (popup.action === 'openDialog') {
          this.open(popup);
        } else if(popup.action === 'close'){
          this.close();
        }
      });
  }

  popupComponent(component: any, data: any): ComponentRef<any> {

    const pInfo: PopupInfo = new PopupInfo();
    const popupFactory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
    const popupRef = this.viewContainerRef.createComponent(popupFactory);
    if (!this.bodyHtml) {
      this.bodyHtml = this.getBody(popupRef.location.nativeElement);
    }
    pInfo.popup = popupRef;
    this.findPopupWrapperAndContent(pInfo.popup.location.nativeElement, pInfo);
    HTMLElementUtil.RemoveElement(pInfo.popup.location.nativeElement);

    this.bodyHtml.appendChild(pInfo.popup.location.nativeElement);

    const popup = this.componentFactoryResolver.resolveComponentFactory(component);
    const ComponentRef = this.viewContainerRef.createComponent(popup) as ComponentRef<any>;

    HTMLElementUtil.RemoveElement(ComponentRef.location.nativeElement);

    pInfo.popupContent.appendChild(ComponentRef.location.nativeElement);
    pInfo.popup.instance.employee = data;
    this.popupQueue.push(pInfo);

    this.centerPositioning(pInfo);
    return popupRef;
  }

  public close() {
      HTMLElementUtil.RemoveElement(this.popupQueue[0].popup.location.nativeElement);
      this.popupQueue = [];
  }

  private findPopupWrapperAndContent(popup: HTMLElement, popupInfo: PopupInfo) {

    for (let i = 0; i < popup.children.length; ++i) {
      const c = popup.children[i] as HTMLElement;
      if (c != null) {
        switch (c.className) {
          case 'popup-modal':
            popupInfo.modal = c;
            break;
          case 'popup-wrapper':
            popupInfo.wrapper = c;
            break;
          case 'popup-controlPanel':
            popupInfo.contrlPanel = c;
            break;
          case 'popup-content':
            popupInfo.popupContent = c;
            break;

        }
        this.findPopupWrapperAndContent(c, popupInfo);
      }
    }

  }

  private centerPositioning(popup: any) {
    popup.modal.style.top = ((20 * this.popupQueue.length) + +popup.modal.style.top.replace('px', '')) + 'px';
    popup.modal.style.left = ((20 * this.popupQueue.length) + +popup.modal.style.left.replace('px', '')) + 'px';
  }

  getBody(fromEl: HTMLElement): HTMLElement {
    let b: HTMLElement = fromEl;
    do {
      b = b.parentElement;
    } while (b.tagName !== 'BODY');
    return b;

  }

  open(popup) {
    if (this.popupQueue.length) {
      this.popupQueue[0].popup.instance.employee = popup.data;
      return;
    }
    this.popupComponent(EmployeeComponent, popup.data);
  }
}
