import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @Input() title: String;
  @Output() addClick = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
