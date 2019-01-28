import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsinControlComponent } from './isin-control.component';

describe('IsinControlComponent', () => {
  let component: IsinControlComponent;
  let fixture: ComponentFixture<IsinControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsinControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsinControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
