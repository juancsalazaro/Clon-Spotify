import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {

  mackCover!: TrackModel

  state: string = 'paused'

  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('')

  listObservers$: Array<Subscription> = []

  ListObservers$:Array<Subscription>=[]

  constructor(public multimediaService: MultimediaService) { }

  ngOnInit(): void {

    const observer1$ = this.multimediaService.playerStatus$
    .subscribe(status => this.state = status)
    this.listObservers$ = [observer1$]


    // this.multimediaService.trackInfo$.subscribe(res =>{
    //   console.log('reproducir', res)
    //   this.mackCover = res
    // })

    // const observable1$ = this.multimediaService.myObservable1$.subscribe((responseOk)=>{
    //   console.log('Awuita llega bien ',responseOk)
    // },(responseFail)=>{
    //   console.log('Awuita llega mala', responseFail)
    // })
    // const observe1$:Subscription = this.multimediaService.callback.subscribe(
    //   (response:TrackModel) => {
    //     console.log('recibiendo: ',response)
    //   }
    // )
    // this.ListObservers$ = [observe1$]
  }

  ngOnDestroy():void{
    this.ListObservers$.forEach(u => u.unsubscribe())
    console.log('BOOM')
  }

  handlePosition(event: MouseEvent): void {
    const elNative: HTMLElement = this.progressBar.nativeElement
    const { clientX } = event
    const { x, width } = elNative.getBoundingClientRect()
    const clickX = clientX - x //TODO: 1050 - x
    const percentageFromX = (clickX * 100) / width
    console.log(`Click(x): ${percentageFromX}`);
    this.multimediaService.seekAudio(percentageFromX)

  }
}
