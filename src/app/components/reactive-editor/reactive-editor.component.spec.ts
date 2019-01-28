import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveEditorComponent } from './reactive-editor.component';

describe('ReactiveEditorComponent', () => {
  let component: ReactiveEditorComponent;
  let fixture: ComponentFixture<ReactiveEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactiveEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
