import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFoldersComponent } from './shared-folders.component';

describe('SharedFoldersComponent', () => {
  let component: SharedFoldersComponent;
  let fixture: ComponentFixture<SharedFoldersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedFoldersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
