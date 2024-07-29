import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { DatenService } from '../../daten.service';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-fleet-detail',
  standalone: true,
  imports: [MatExpansionModule, MatFormFieldModule, FormsModule, CommonModule, MatCardModule, MatListModule, RouterOutlet, RouterLink],
  templateUrl: './fleet-detail.component.html',
  styleUrl: './fleet-detail.component.css'
})
export class FleetDetailComponent {
  fleet: any;
  isLoading = true;

  constructor(private route: ActivatedRoute, private datenService: DatenService) { }

  router = inject(Router)

  ngOnInit() {
    this.loadData();
 }

  loadData() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.datenService.get_fleet(id).subscribe(data => {
      console.log(data)
      this.fleet = data;
      this.isLoading = false;
    },
    error => {
      console.error('Fehler beim Laden der Flotte', error);
      this.isLoading = false;
      this.router.navigateByUrl('login');
    });
  }
}
