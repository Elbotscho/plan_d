import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetDetailComponent } from './fleet-detail.component';

describe('FleetDetailComponent', () => {
  let component: FleetDetailComponent;
  let fixture: ComponentFixture<FleetDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
