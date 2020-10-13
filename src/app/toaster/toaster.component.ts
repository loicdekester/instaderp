import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../service/toasterService/toaster.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent implements OnInit {

  type: string = null;
  message: string = null;
  timer: number = null;

  constructor(private toaster: ToasterService) {
    toaster.emmitter.subscribe(
      data => {
        this.type = data.type;
        this.message = data.message;
        this.timer = data.timer;
        this.reset();
      }
    );
  }

  reset(): void {
    setTimeout(() => {
      this.type = null;
      this.message = null;
    }, this.timer);
  }

  ngOnInit(): void {
  }

}
