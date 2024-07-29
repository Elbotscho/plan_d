import { Component, OnInit } from '@angular/core';
import { DatenService } from '../../daten.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet, RouterLink } from '@angular/router';
import { PersonDetailComponent } from '../person-detail/person-detail.component';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-ships',
  standalone: true,
  imports: [PersonDetailComponent, MatTableModule, MatPaginatorModule, MatFormFieldModule, FormsModule, MatButtonModule, RouterOutlet, RouterLink],
  templateUrl: './ships.component.html',
  styleUrl: './ships.component.css'
})
export class ShipsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'fleet', 'size'];
  dataSource = new MatTableDataSource<any>();
  
  constructor(private datenService: DatenService) { }

  router = inject(Router)

  ngOnInit() {
   	this.loadData();
  }

  loadData() {
    this.datenService.get_ships().subscribe((response:any[]) => {
      	this.dataSource.data = response;
    },
    error => {
      this.router.navigateByUrl('login');
    });
  }

}

