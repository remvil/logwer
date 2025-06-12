// stats-header.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-stats-header',
  templateUrl: './stats-header.component.html',
  styleUrls: ['./stats-header.component.scss'],
})
export class StatsHeaderComponent {
  stats = [
    { title: 'N. Doc. in archivio', value: '8,742' },
    { title: 'Num. Mail elaborate', value: '5,321' },
    { title: 'Num. Doc Associati', value: '7,890' },
    { title: 'Num. Doc. non Associati', value: '852' },
  ];
}
