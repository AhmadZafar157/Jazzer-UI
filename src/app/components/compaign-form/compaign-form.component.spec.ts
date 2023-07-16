import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaignFormComponent } from './compaign-form.component';

describe('CompaignFormComponent', () => {
  let component: CompaignFormComponent;
  let fixture: ComponentFixture<CompaignFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompaignFormComponent]
    });
    fixture = TestBed.createComponent(CompaignFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
