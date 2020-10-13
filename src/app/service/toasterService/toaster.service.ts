import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private sub = new Subject<any>();

  public emmitter = this.sub.asObservable();

  display(type: string, message: string, timer = 5000) {
    this.sub.next({ type, message, timer });
  }
}
