import { Component, OnInit } from '@angular/core';


type mode = 'presentation' | 'practice';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.page.html',
  styleUrls: ['./charts.page.scss'],
})
export class ChartsPage implements OnInit {
  
  activeMode: mode = 'practice';
  constructor() { }

  ngOnInit() {
  }
  
  segmentChanged(e: CustomEvent) {
    if(e.detail.value === 'presentation') 
      this.activeMode = 'presentation';

    else 
      this.activeMode = 'practice';
  }
}
