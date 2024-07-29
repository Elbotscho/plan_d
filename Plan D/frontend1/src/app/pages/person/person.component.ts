import { Component, OnInit } from '@angular/core';
import { DatenService } from '../../daten.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

interface ApiResponse {
  results: any[]; 
  next: any,
  previous: any,
}

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatFormFieldModule, FormsModule, MatButtonModule, RouterOutlet, RouterLink],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css'
})
export class PersonComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'rank', 'stationed_currently'];
  dataSource = new MatTableDataSource<any>();
  
  nextPage = "";
  previousPage = "";

  constructor(private datenService: DatenService) { }

  router = inject(Router)

  ngOnInit() {
   	this.loadData();
  }

  loadData() {
    const urlPath = 'http://localhost:8000/api/empire/people/?page=1';
    this.datenService.get_personen(urlPath).subscribe((response: ApiResponse) => {
      	this.dataSource.data = response.results;
        this.nextPage = response.next;
        this.previousPage = response.previous;
    },
    error => {
      this.router.navigateByUrl('login');
    });
  }
  
  getStationedCurrently(element: any): string {
    return element.stationed_currently ? element.stationed_currently.name : 'N/A';
  }

  next() {
    this.datenService.get_personen(this.nextPage).subscribe((response: ApiResponse) => {
      this.dataSource.data = response.results;
      this.nextPage = response.next;
      this.previousPage = response.previous;
  });
  }

  previous() {
    this.datenService.get_personen(this.previousPage).subscribe((response: ApiResponse) => {
      this.dataSource.data = response.results;
      this.nextPage = response.next;
      this.previousPage = response.previous;
  },
  error => {
    this.router.navigateByUrl('login');
  });
  }
}
