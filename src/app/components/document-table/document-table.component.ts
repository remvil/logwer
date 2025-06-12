import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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

  dataSource: MatTableDataSource<Document>;
  documentTypes: string[] = ['Fattura', 'Bolla', 'Contratto', 'Altro'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Mock data - sostituire con dati reali
    const documents: Document[] = [
      {
        fileName: '115738.pdf',
        documentType: 'Fattura',
        number: '2024/115738',
        date: new Date('2024-10-12'),
        assignedPractice: '22025123456',
        references: 'Shipment 0224108349',
        mailId: '2707163005561',
        mailDate: new Date('2025-05-31T16:30:05'),
        mailSubject: 'R: October 2024 invoices Top urgent',
        attachmentsCount: 54,
        sender: 'c.trombino@erixmar.com',
        recipient: 'm.colombo@carvico.com + 6',
      },
      // Aggiungi altri documenti qui...
    ];

    this.dataSource = new MatTableDataSource(documents);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
