import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewBaseComponent } from './create-new-base.component';

describe('CreateNewBaseComponent', () => {
  let component: CreateNewBaseComponent;
  let fixture: ComponentFixture<CreateNewBaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewBaseComponent]
    });
    fixture = TestBed.createComponent(CreateNewBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
