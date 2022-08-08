import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicadoresComponent } from './publicadores.component';

describe('PublicadoresComponent', () => {
  let component: PublicadoresComponent;
  let fixture: ComponentFixture<PublicadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
