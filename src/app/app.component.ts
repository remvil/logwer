import { Component, ViewChild } from '@angular/core';
import { DocumentTableComponent } from './components/document-table/document-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Logwer - Business Intelligence';

  @ViewChild(DocumentTableComponent) documentTable!: DocumentTableComponent;

  onFiltersChanged(event: { filters: any; logic: 'AND' | 'OR' }) {
    if (this.documentTable) {
      this.documentTable.applyComplexFilter(event.filters, event.logic);
    }
  }
}
