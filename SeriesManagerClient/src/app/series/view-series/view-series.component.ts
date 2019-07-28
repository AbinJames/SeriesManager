import { Component, OnInit, ViewChild } from '@angular/core';
import { SeriesService } from '../series.service';
import { AppComponent } from 'src/app/app.component';
import { KeyedCollection } from 'src/app/Collection/keyed-collection';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-view-series',
  templateUrl: './view-series.component.html',
  styleUrls: ['./view-series.component.css']
})
export class ViewSeriesComponent implements OnInit {

  constructor(private seriesService: SeriesService, public appComponent: AppComponent) { }

  seriesList: any[] = [];
  seriesDetails: any[] = [];
  seriesWikiList: any[] = [];
  seriesImageList: any[] = [];
  seasonToggleClicked: any[] = [];
  episodeToggleClicked: any[] = [];
  wikiToggleClicked: any[] = [];
  seriesEpisodeList: any[] = [];
  seriesSeasonList: any[] = [];
  sortToggle = {
    name: 0,
    status: 0,
    previousEpisodeAirdate: 0,
    nextEpisodeAirdate: 0
  }
  nullEpisode = {
    name: "",
    airdate: ""
  }
  size: any;
  today = new Date();
  yesterday = new Date();
  noImage: any = "assets/no_image.png";
  shows: any[];
  seriesName: any;
  previousSeriesStartDate: any;
  previousSeriesEndDate: any;
  nextSeriesStartDate: any;
  nextSeriesEndDate: any;
  isDownloadableToday: any;

  ngOnInit() {
    this.yesterday.setDate(this.today.getDate() - 1);
    this.initialiizeSeriesList();
    this.initializeNewShows();
  }

  initialiizeSeriesList() {
    this.sortToggle = {
      name: 0,
      status: 0,
      previousEpisodeAirdate: 0,
      nextEpisodeAirdate: 0
    }
    this.seriesDetails = [];
    this.seriesService.getSeries().subscribe(series => {
      console.log(series)
      this.seriesList = series;
      for (let index = 0; index < this.seriesList.length; index++) {

        this.seriesService.getShowDetails(this.seriesList[index].apiId).subscribe(response => {
          var series = response;
          series["nextEpisodeSeason"] = null;
          series["nextEpisodeNumber"] = null;
          series["nextEpisodeName"] = null;
          series["nextEpisodeAirdate"] = "-";
          series["previousEpisodeSeason"] = null;
          series["previousEpisodeNumber"] = null;
          series["previousEpisodeName"] = null;
          series["previousEpisodeAirdate"] = "-";
          series["onDownloadToday"] = false;
          if (response["_links"]["nextepisode"] != null) {
            this.seriesService.getEpisodeDetails(response["_links"]["nextepisode"]["href"]).subscribe(episode => {
              series["nextEpisodeSeason"] = episode["season"];
              series["nextEpisodeNumber"] = episode["number"];
              series["nextEpisodeName"] = episode["name"];
              series["nextEpisodeAirdate"] = episode["airdate"];
            });
          }
          if (response["image"] == null) {
            this.seriesImageList[this.seriesList[index].apiId] = this.noImage;
          }
          else {
            this.seriesImageList[this.seriesList[index].apiId] = response["image"]["medium"];
          }
          if (response["_links"]["previousepisode"] != null) {
            this.seriesService.getEpisodeDetails(response["_links"]["previousepisode"]["href"]).subscribe(episode => {
              series["previousEpisodeSeason"] = episode["season"];
              series["previousEpisodeNumber"] = episode["number"];
              series["previousEpisodeName"] = episode["name"];
              series["previousEpisodeAirdate"] = episode["airdate"];
              if (episode["airdate"] == formatDate(this.yesterday, 'yyyy-MM-dd', 'en')) {
                series["onDownloadToday"] = true;
              }
            });
          }
          this.seasonToggleClicked[series["id"]] = false;
          this.wikiToggleClicked[series["id"]] = false;
          this.seriesDetails.push(series);
        })
      }
    });
  }

  toggleSeasonCollapseIcon(seriesId: any) {
    this.seasonToggleClicked[seriesId] = !this.seasonToggleClicked[seriesId];
    if (this.seriesSeasonList[seriesId] == undefined) {
      this.seriesService.getSeasons(seriesId).subscribe(seasons => {
        this.seriesSeasonList[seriesId] = seasons;
        this.episodeToggleClicked[seasons["id"]] = false;
      });
    }
  }

  toggleEpisodeCollapseIcon(seriesId: any, seasonId: any) {
    this.episodeToggleClicked[seasonId] = !this.episodeToggleClicked[seasonId];
    if (this.seriesEpisodeList[seasonId] == undefined) {
      if (this.seriesSeasonList[seriesId].filter(x => x.id == seasonId)[0]["premiereDate"] != null) {
        this.seriesService.getEpisodes(seasonId).subscribe(episodes => {
          this.seriesEpisodeList[seasonId] = episodes;
        });
      }
      else {
        this.seriesEpisodeList[seasonId] = [];
      }
    }
  }

  toggleWikiCollapseIcon(seriesId: any, seriesName: any) {
    this.wikiToggleClicked[seriesId] = !this.wikiToggleClicked[seriesId];

    if (this.seriesWikiList[seriesId] == undefined) {
      this.seriesService.getWikis(seriesName).subscribe(wiki => {
        this.seriesWikiList[seriesId] = wiki[3];
      });
    }
  }

  sortList(columnName: any) {
    var toggle = this.sortToggle[columnName];
    this.sortToggle = {
      name: 0,
      status: 0,
      previousEpisodeAirdate: 0,
      nextEpisodeAirdate: 0
    }

    this.sortToggle[columnName] = toggle;
    if (this.sortToggle[columnName] == 0) {
      this.sortToggle[columnName] = 1;
    }
    else if (this.sortToggle[columnName] == 1) {
      this.sortToggle[columnName] = 2;
    }
    else if (this.sortToggle[columnName] == 2) {
      this.sortToggle[columnName] = 1;
    }
    if (this.sortToggle[columnName] == 1) {
      this.seriesDetails.sort((a, b) => (a[columnName].toLowerCase() > b[columnName].toLowerCase()) ? 1 : -1)
    }
    if (this.sortToggle[columnName] == 2) {
      this.seriesDetails.sort((a, b) => (a[columnName].toLowerCase() < b[columnName].toLowerCase()) ? 1 : -1)
    }
  }

  confirmDeletion(seriesName: any, seriesId: any) {
    this.appComponent.openModal(1, 'Confirm Deletion', ['Do you want to delete ' + seriesName + ' ?'], 'OK', 'Cancel', seriesId).subscribe(response => {
      response.content.onClose.subscribe(result => {
        if (result != null) {
          this.deleteData(result);
        }
      })
    });
  }

  isNewShow(element, index, array) {
    return (element["season"] == 1 && element["number"] == 1);
  }

  initializeNewShows() {
    this.shows = [];
    this.seriesService.getShowOnDate(this.yesterday).subscribe(response => {
      this.shows = response.filter(this.isNewShow);
    });
  }

  showNewShows() {
    this.appComponent.openModal(2, 'New Series', this.shows, 'OK', 'Cancel', null).subscribe(response => {
      response.content.onClose.subscribe(result => {
        if (result != null) {
          this.seriesService.addNewSeries(result).subscribe(response => {
            this.initialiizeSeriesList();
          });
        }
      })
    });
  }

  deleteData(dataId: any) {
    this.seriesService.deleteSeries(dataId).subscribe(response => {
      this.initialiizeSeriesList();
    });
  }
}
