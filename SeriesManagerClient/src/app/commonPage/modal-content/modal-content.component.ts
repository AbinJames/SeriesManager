import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';


@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body" *ngIf="list.length">
        <pre *ngFor="let item of list">{{item}}</pre>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-primary" (click)="onConfirm(dataId)">{{confirmBtnName}}</button>
      <button type="button" class="btn btn-default" (click)="onCancel()">{{closeBtnName}}</button>
    </div>
  `
})

export class ModalContentComponent implements OnInit {
  title: string;
  closeBtnName: string;
  list: any[] = [];
  confirmBtnName: any;
  dataId: any;
  public onClose: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  onConfirm(dataId: any): any {
    this.onClose.next(dataId);
    this.bsModalRef.hide();
  }

  onCancel(): void {
    this.onClose.next(null);
    this.bsModalRef.hide();
  }
}