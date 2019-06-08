import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ModalContentComponent } from './commonPage/modal-content/modal-content.component';
import { Observable, of } from 'rxjs';
import { AddSeriesComponent } from './series/add-series/add-series.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Series Manager';
  searchString: string;

  constructor(private modalService: BsModalService) { }
  bsModalRef: BsModalRef;
  message: string;
  filterEnabled: boolean = false;

  //function to toggle filtering
  toggleFilter(): void {
    this.filterEnabled = !this.filterEnabled;
  }

  getDownloadLink(name: any, season: number, episode: any): string {
    name = name.replace("'", "");
    name = name.replace("-", "");
    this.searchString = name + " s" + ((Math.floor(season / 10) > 0) ? String(season) : "0" + String(season)) + "e" + ((Math.floor(episode / 10) > 0) ? String(episode) : "0" + String(episode));
    return `${'https://1337x.to/search/'}/${this.searchString}/${'/1/'}`;
  }

  openModal(modalType: any, modalTitle: any, modalContent: any, confirmBtnName: any, closeBtnName: any, dataId: any): Observable<any> {
    if (modalType == 1) {
      const initialState = {
        list: modalContent,
        title: modalTitle
      };
      this.bsModalRef = this.modalService.show(ModalContentComponent, { initialState });
      this.bsModalRef.content.closeBtnName = closeBtnName;
      this.bsModalRef.content.confirmBtnName = confirmBtnName;
      this.bsModalRef.content.dataId = dataId;
      this.bsModalRef.content.type = modalType;
      return of<any>(this.bsModalRef);
    }
    if (modalType == 2) {
      const initialState = {
        list: modalContent,
        title: modalTitle
      };
      this.bsModalRef = this.modalService.show(AddSeriesComponent, { initialState });
      this.bsModalRef.content.closeBtnName = closeBtnName;
      this.bsModalRef.content.confirmBtnName = confirmBtnName;
      this.bsModalRef.content.dataId = dataId;
      this.bsModalRef.content.type = modalType;
      return of<any>(this.bsModalRef);
    }
  }
}