import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import * as dataraw from "../../../data/tracks.json";

@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.css']
})
export class PlayListBodyComponent implements OnInit {

  // track:Array<TrackModel>=[]
  @Input() track:Array<TrackModel>=[]
  constructor() { }

  optionSort:{property:string | null, order:string}={property:null, order:'asc'}

  ngOnInit(): void {

    // const { data }: any = (dataraw as any).default
    // this.track= data
    // console.log(data)
  }

  changeSort(property:string):void{
    const {order} = this.optionSort
    this.optionSort={
      property,
      order:order === 'asc' ? 'desc' : 'asc'
    }
  }

}
