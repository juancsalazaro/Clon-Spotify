import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {

  @Input() custonImg:string=''
  @HostListener('error') handleError():void{
    const elNative = this.elHost.nativeElement
    console.log("Error img")
    elNative.src = this.custonImg
  }
  constructor(private elHost: ElementRef) { }

}
