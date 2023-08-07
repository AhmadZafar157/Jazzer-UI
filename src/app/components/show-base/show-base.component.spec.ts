import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBaseComponent } from './show-base.component';

describe('ShowBaseComponent', () => {
  let component: ShowBaseComponent;
  let fixture: ComponentFixture<ShowBaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowBaseComponent]
    });
    fixture = TestBed.createComponent(ShowBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
