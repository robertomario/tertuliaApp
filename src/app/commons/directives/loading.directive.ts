import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appLoading]'
})
export class LoadingDirective implements OnChanges {

  @Input() appLoading = false;
  @Input() name: string;

  constructor(private elementRef: ElementRef<HTMLButtonElement>) {
    this.elementRef.nativeElement.innerHTML = this.name;
   }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.appLoading){
      this.elementRef.nativeElement.innerHTML = '<div class="lds-dual-ring"></div>';
    } else {
      this.elementRef.nativeElement.innerHTML = this.name;
    }
  }
}
