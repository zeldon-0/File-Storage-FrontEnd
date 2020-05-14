import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedUsersComponent } from './shared-users.component';

describe('SharedUsersComponent', () => {
  let component: SharedUsersComponent;
  let fixture: ComponentFixture<SharedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
