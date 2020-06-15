import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectPartComponent } from './add-project-part.component';

describe('AddProjectPartComponent', () => {
  let component: AddProjectPartComponent;
  let fixture: ComponentFixture<AddProjectPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjectPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
