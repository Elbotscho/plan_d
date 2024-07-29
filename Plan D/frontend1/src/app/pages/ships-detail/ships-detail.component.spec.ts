import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipsDetailComponent } from './ships-detail.component';

describe('ShipsDetailComponent', () => {
  let component: ShipsDetailComponent;
  let fixture: ComponentFixture<ShipsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipsDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
