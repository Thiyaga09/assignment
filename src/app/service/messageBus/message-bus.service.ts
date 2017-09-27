import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";

interface Message {
  channel: string;
  data: any;
}

@Injectable()
export class MessageBusService {
  public channelSubjects: { channel: string, subject: ReplaySubject<Message> }[];

  constructor() {
    this.channelSubjects = [];
  }

  private getTypeSub(channel: string) {
    let existingChannelSubject = this.channelSubjects.find(x => x.channel === channel);

    if (existingChannelSubject == null) {
      existingChannelSubject = { channel: channel, subject: new ReplaySubject<Message>(1) };
      this.channelSubjects.push(existingChannelSubject);
    }

    return existingChannelSubject;
  }

  public publish<T>(message: T): void {
    const channel = Array.isArray(message) ? (<any>message[0].constructor).name + '[]' : (<any>message.constructor).name
    const existingTypeSub = this.getTypeSub(channel);
    existingTypeSub.subject.next({ channel: channel, data: message });
  }

  public listenFor<T>(messageType: { new (...args: any[]): T }): Observable<T>
  public listenFor<T>(messageType: { new (...args: any[]): T }[]): Observable<T[]>
  public listenFor<T>(messageType: { new (...args: any[]): T } | { new (...args: any[]): T }[]): Observable<T> | Observable<T[]> {
    const channel = Array.isArray(messageType) ? (<any>messageType[0]).name + '[]' : (<any>messageType).name
    const existingTypeSub = this.getTypeSub(channel);
    return existingTypeSub.subject.map(m => m.data);
  }

}
