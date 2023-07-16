import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectTdComponent } from './connect-td.component';

describe('ConnectTdComponent', () => {
  let component: ConnectTdComponent;
  let fixture: ComponentFixture<ConnectTdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectTdComponent]
    });
    fixture = TestBed.createComponent(ConnectTdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
