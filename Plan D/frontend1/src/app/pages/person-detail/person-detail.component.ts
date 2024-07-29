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
  selector: 'app-person-detail',
  standalone: true,
  imports: [MatExpansionModule, MatFormFieldModule, FormsModule, CommonModule, MatCardModule, MatListModule, RouterOutlet, RouterLink],
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.css'
})
export class PersonDetailComponent {
  person: any;
  isLoading = true;

  constructor(private route: ActivatedRoute, private datenService: DatenService) { }

  router = inject(Router)

  ngOnInit() {
    this.loadData();
 }

  loadData() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.datenService.get_person(id).subscribe(data => {
      console.log(data)
      this.person = data;
      this.isLoading = false;
    },
    error => {
      console.error('Fehler beim Laden der Person', error);
      this.isLoading = false;
      this.router.navigateByUrl('login');
    });
  }
}
