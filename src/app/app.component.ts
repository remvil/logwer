import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Logwer - Business Intelligence';

  onFiltersChanged(filters: any) {
    // Implementa la logica di filtraggio qui
    console.log('Filters changed:', filters);
  }
}
