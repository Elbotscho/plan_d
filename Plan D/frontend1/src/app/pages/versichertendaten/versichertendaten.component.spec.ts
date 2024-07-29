import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersichertenDatenComponent } from './versichertendaten.component';

describe('VersicherteComponent', () => {
  let component: VersichertenDatenComponent;
  let fixture: ComponentFixture<VersichertenDatenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersichertenDatenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersichertenDatenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
