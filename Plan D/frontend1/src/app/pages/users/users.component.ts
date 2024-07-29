import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatFormFieldModule, FormsModule, MatButtonModule, RouterOutlet, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['username', 'email', 'is_active'];
  dataSource = new MatTableDataSource<any>();
  

  constructor(private auth: AuthService) { }

  router = inject(Router)

  ngOnInit() {
   	this.loadData();
  }

  loadData() {
    this.auth.get_users().subscribe((response:any[]) => {
      	this.dataSource.data = response;
    },
    error => {
      console.log(error)
      this.router.navigateByUrl('login');
    });
  }
  
  getAdmiralName(element: any): string {
    return element.admiral ? element.admiral.name : 'N/A';
  }
}
