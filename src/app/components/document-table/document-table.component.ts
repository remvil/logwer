import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DocumentTableService } from '../../services/document-table.service';

interface Document {
  fileName: string;
  documentType: string;
  number: string;
  date: Date;
  assignedPractice: string;
  references: string;
  mailId: string;
  mailDate: Date;
  mailSubject: string;
  attachmentsCount: number;
  sender: string;
  recipient: string;
}

@Component({
  selector: 'app-document-table',
  templateUrl: './document-table.component.html',
  styleUrls: ['./document-table.component.scss'],
})
export class DocumentTableComponent implements OnInit {
  displayedColumns: string[] = [
    'fileName',
    'documentType',
    'number',
    'date',
    'assignedPractice',
    'references',
    'mailId',
    'mailDate',
    'mailSubject',
    'attachmentsCount',
    'sender',
    'recipient',
  ];

  dataSource: MatTableDataSource<Document> = new MatTableDataSource();
  documentTypes: string[] = ['Fattura', 'Bolla', 'Contratto', 'Altro'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private documentService: DocumentTableService) {}

  ngOnInit(): void {
    this.documentService.getDocuments().subscribe((docs) => {
      console.log('Dati ricevuti:', docs);
      this.dataSource = new MatTableDataSource(docs);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyComplexFilter(filters: any, logic: 'AND' | 'OR') {
    if (!filters) {
      this.dataSource.filter = '';
      return;
    }

    this.dataSource.filterPredicate = (data: Document, filter: string) => {
      const filterObj = JSON.parse(filter);
      const conditions: boolean[] = [];

      // Date range filtering
      if (filterObj.dateRange?.start || filterObj.dateRange?.end) {
        const dataDate = new Date(data.date);
        if (filterObj.dateRange.start) {
          conditions.push(dataDate >= new Date(filterObj.dateRange.start));
        }
        if (filterObj.dateRange.end) {
          conditions.push(dataDate <= new Date(filterObj.dateRange.end));
        }
      }

      // Document type filtering
      if (filterObj.documentType) {
        conditions.push(data.documentType === filterObj.documentType);
      }

      // Practice filtering
      if (filterObj.practice) {
        conditions.push(data.assignedPractice === filterObj.practice);
      }

      // References filtering
      if (filterObj.references) {
        conditions.push(
          data.references
            .toLowerCase()
            .includes(filterObj.references.toLowerCase())
        );
      }

      // Return based on logic
      if (conditions.length === 0) return true;

      return logic === 'AND'
        ? conditions.every((c) => c)
        : conditions.some((c) => c);
    };

    this.dataSource.filter = JSON.stringify(filters);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
