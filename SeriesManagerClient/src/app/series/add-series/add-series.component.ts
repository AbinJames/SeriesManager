import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { SeriesService } from '../series.service';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'add-series',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <table class="table table-striped">
      <tr>
        <td colspan="4">
          <form [formGroup]="seriesForm" (ngSubmit)="searchSeries(seriesForm)">
          <div class="container">
            <div class="row">
              <div class="col-sm-8">
                <input type="text" class="form-control" formControlName="searchText"/>
              </div>
              <div class="col-sm-2">
                <button type="submit">
                  <span class='fa fa-search'></span>
                </button>
                </div>
             </div>
          </div>
          </form>
        </td>
      </tr>
      <ng-container *ngFor="let item of list">
        <tr>
          <td><img *ngIf="item.show.image" src="{{item.show.image.medium}}" height="250" /></td>
          <td>{{item.show.name}}</td>
          <td>
          <button
            (click)="addNewSeries(item.show.name, item.show.id)">
            <span class='fa fa-plus'></span>
          </button>
        </td>
        <td>
          <!-- toggle button for collapsing series wiki -->
          <button data-toggle="collapse" attr.data-target="#add_series_wiki_{{item.show.id}}"
            (click)="toggleAddSeriesWikiCollapseIcon(item.show.id,item.show.name)">
            <span [class]="addSeriesWikiToggleClicked[item.show.id] ? 'fa fa-angle-up': 'fa fa-angle-down'"></span>
          </button>
        </td>
        </tr>
        <tr>
          <td colspan="5">
            <div id="add_series_wiki_{{item.show.id}}" class="collapse">
              <table class="table table-bordered table-hover table-sm">
                <tr *ngFor="let wiki of addSeriesWikiList[item.show.id]">
                  <th><a href="{{wiki}}" target="_blank">{{wiki}}</a></th>
                </tr>
              </table>
            </div>
          </td>
        </tr>
        </ng-container>
      </table>
    </div>

    <div class="modal-body" *ngIf="list.length == 0">
        <pre>No New Series</pre>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="onCancel()">{{closeBtnName}}</button>
    </div>
  `
})

export class AddSeriesComponent implements OnInit {
  title: string;
  closeBtnName: string;
  list: any[] = [];
  public onClose: Subject<any>;
  addSeriesWikiList: any[] = [];
  addSeriesWikiToggleClicked: any[] = [];
  series = {
    seriesId: 0,
    apiId: 0,
    seriesName: ""
  }
  seriesForm: FormGroup;

  constructor(public bsModalRef: BsModalRef, private seriesService: SeriesService, private formBuilder: FormBuilder, private modalService: BsModalService) { }

  ngOnInit() {
    this.onClose = new Subject();
    this.seriesForm = this.formBuilder.group({
      searchText: []
    });
  }

  onCancel(): void {
    this.onClose.next(null);
    this.bsModalRef.hide();
  }

  addNewSeries(name: any, id: any) {
    this.series.apiId = id;
    this.series.seriesName = name;
    console.log(this.series);
    this.onClose.next(this.series);
    this.bsModalRef.hide();
  }

  toggleAddSeriesWikiCollapseIcon(seriesId: any, seriesName: any) {

    this.addSeriesWikiToggleClicked[seriesId] = !this.addSeriesWikiToggleClicked[seriesId];
    if (this.addSeriesWikiList[seriesId] == undefined) {
      this.seriesService.getWikis(seriesName).subscribe(wiki => {
        this.addSeriesWikiList[seriesId] = wiki[3];
      });
    }
  }

  searchSeries(seriesForm: FormGroup) {
    this.seriesService.getShowOnSearch(seriesForm.value.searchText).subscribe(response => {
      const initialState = {
        list: response,
        title: 'New Series'
      };
      this.list = response;
    });
  }
}