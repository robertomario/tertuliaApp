import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appLoad]'
})
export class LoadDirective implements OnChanges {

  @Input() appLoad = false;
  @Input() name: string;

  constructor(private elementRef: ElementRef<HTMLButtonElement>) {
    this.elementRef.nativeElement.innerHTML = this.name;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.appLoad){
      this.elementRef.nativeElement.innerHTML = '<div class="lds-dual-ring"></div>';
    } else {
      this.elementRef.nativeElement.innerHTML = this.name;
    }
  }
}
