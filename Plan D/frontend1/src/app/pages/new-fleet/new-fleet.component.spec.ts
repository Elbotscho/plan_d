import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFleetComponent } from './new-fleet.component';

describe('NewFleetComponent', () => {
  let component: NewFleetComponent;
  let fixture: ComponentFixture<NewFleetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFleetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFleetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
