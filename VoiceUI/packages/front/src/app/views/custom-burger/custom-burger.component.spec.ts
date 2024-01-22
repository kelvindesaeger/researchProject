import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomBurgerComponent } from './custom-burger.component';

describe('CustomBurgerComponent', () => {
  let component: CustomBurgerComponent;
  let fixture: ComponentFixture<CustomBurgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomBurgerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomBurgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
