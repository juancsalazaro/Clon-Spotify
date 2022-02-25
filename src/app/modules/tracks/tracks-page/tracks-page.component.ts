import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Subscription } from 'rxjs';
import * as dataRaw from "../../../data/tracks.json";
import { TrackService } from '../services/track.service';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy {

  tracksTrending: Array<TrackModel> = []
  tracksRandom: Array<TrackModel> = []

  ListObservers$: Array<Subscription> = []

  constructor(private trackService:TrackService) { }

  ngOnInit(): void {
    this.loadDataAll()
    this.loadDataRandom()
  }

  loadDataSinApi():void{
    // const observe1$ = this.trackService.dataTracksTrending$.subscribe(response=>{
    //   this.tracksTrending = response;
    //   this.tracksRandom = response
    //   console.log('canciones: ',response)
    // })

    // const observe2$ = this.trackService.dataTracksRandom$.subscribe(response=>{
    //   this.tracksRandom = [...this.tracksRandom,...response]
    //   console.log('canciones Random: ',response)
    // })
    // this.ListObservers$ = [observe1$,observe2$]
  }

  async loadDataAll():Promise<any>{
    //Promesa
    this.tracksTrending = await this.trackService.getAllTracks$().toPromise()
    console.log('DATARAW',dataRaw)

    //Normal
    // this.trackService.getAllTracks$()
    // .subscribe((response:TrackModel[])=>{
    //   this.tracksTrending = response
    // })
  }

  loadDataRandom():void{
    this.trackService.getAllRandom$()
    .subscribe((response:TrackModel[])=>{
      this.tracksRandom = response
    })
  }

  ngOnDestroy():void{
    // this.ListObservers$.forEach(u => u.unsubscribe)
  }
}
