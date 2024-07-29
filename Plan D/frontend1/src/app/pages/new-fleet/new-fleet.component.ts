import { Component, OnInit } from '@angular/core';
import { DatenService } from '../../daten.service';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-fleet',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule ],
  templateUrl: './new-fleet.component.html',
  styleUrl: './new-fleet.component.css'
})
export class NewFleetComponent implements OnInit {
  admirals: any;

  fleetObj: any = {
    fleetName:'',
    admiral:'',
  }

  constructor(private datenService: DatenService, private snackBar: MatSnackBar) { }

  router = inject(Router)

  ngOnInit() {
    this.loadData();
 }

  loadData() {
    this.datenService.get_admirals().subscribe(data => {
      console.log(data)
      this.admirals = data;
    },
    error => {
      console.error(error);
    });
  }

  add(){
    debugger;
    const fleetName = this.fleetObj.fleetName;
    const admiral = this.fleetObj.admiral;
    const missingFields = [];
    if (fleetName == "") {
        missingFields.push('Fleet Name');
    }
    if (admiral == "") {
        missingFields.push('Admiral');
    }
    if (missingFields.length > 0) {
      this.snackBar.open(`The following fields are required: ${missingFields.join(', ')}`, 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        });
    } else {
      this.datenService.add_fleet(fleetName, admiral).subscribe(
        response => {
          this.router.navigateByUrl('fleets');
        },
        error => {
          if("403" == error.status){
            this.snackBar.open('Action denied. ' + error.error['detail'], 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              });
          }
          else{
            this.router.navigateByUrl('login');
          }
        }
      );
    }
  }
}
