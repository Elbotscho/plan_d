import { Component, OnInit } from '@angular/core';
import { DatenService } from '../../daten.service';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-ship',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule ],
  templateUrl: './new-ship.component.html',
  styleUrl: './new-ship.component.css'
})
export class NewShipComponent implements OnInit {
  fleets: any;

  shipObj: any = {
    shipName:'',
    fleet:'',
  }

  constructor(private datenService: DatenService, private snackBar: MatSnackBar) { }

  router = inject(Router)

  ngOnInit() {
    this.loadData();
 }

  loadData() {
    this.datenService.get_fleets().subscribe(data => {
      console.log(data)
      this.fleets = data;
    },
    error => {
      console.error(error);
    });
  }

  add(){
    debugger;
    const shipName = this.shipObj.shipName;
    const fleet = this.shipObj.fleet;
    const missingFields = [];
    if (shipName == "") {
        missingFields.push('Ship Name');
    }
    if (fleet == "") {
        missingFields.push('Fleet');
    }
    if (missingFields.length > 0) {
      this.snackBar.open(`The following fields are required: ${missingFields.join(', ')}`, 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        });
    } else {
      this.datenService.add_ship(shipName, fleet).subscribe(
        response => {
          this.router.navigateByUrl('ships');
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
