import { Component, OnInit } from '@angular/core';
import { DatenService } from '../../daten.service';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-person',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule ],
  templateUrl: './new-person.component.html',
  styleUrl: './new-person.component.css'
})
export class NewPersonComponent implements OnInit {
  ships: any;

  personObj: any = {
    name:'',
    rank:'',
    stationed_currently:'',
  }

  constructor(private datenService: DatenService, private snackBar: MatSnackBar) { }

  router = inject(Router)

  ngOnInit() {
    this.loadData();
 }

  loadData() {
    this.datenService.get_ships().subscribe(data => {
      console.log(data)
      this.ships = data;
    },
    error => {
      console.error(error);
    });
  }

  add(){
    const name = this.personObj.name;
    const rank = this.personObj.rank;
    const stationed_currently = this.personObj.stationed_currently;
    const missingFields = [];
    if (name == "") {
        missingFields.push('Ship Name');
    }
    if (rank == "") {
        missingFields.push('Fleet');
    }
    if (stationed_currently == "") {
      missingFields.push('Fleet');
  }
    if (missingFields.length > 0) {
      this.snackBar.open(`The following fields are required: ${missingFields.join(', ')}`, 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        });
    } else {
      this.datenService.add_person(name, rank, stationed_currently).subscribe(
        response => {
          console.log(response)
          this.router.navigateByUrl('person');
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
