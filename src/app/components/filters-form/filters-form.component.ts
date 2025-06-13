// filters-form.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters-form',
  templateUrl: './filters-form.component.html',
  styleUrls: ['./filters-form.component.scss'],
})
export class FiltersFormComponent {
  @Output() filtersChanged = new EventEmitter<any>();

  filterForm: FormGroup;
  documentTypes = ['Fattura', 'Bolla', 'Contratto', 'Altro'];
  practices = ['22025123456', '22025123457', '22025123458'];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      dateRange: fb.group({
        start: [''],
        end: [''],
      }),
      documentType: [''],
      practice: [''],
      references: [''],
      logic: ['AND'], // Valore di default
    });
  }

  applyFilters() {
    this.filtersChanged.emit({
      filters: this.filterForm.value,
      logic: this.filterForm.value.logic,
    });
  }

  resetFilters() {
    this.filterForm.reset();
    this.filtersChanged.emit(null);
  }
}
