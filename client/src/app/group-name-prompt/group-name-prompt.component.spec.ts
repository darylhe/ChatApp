import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupNamePromptComponent } from './group-name-prompt.component';

describe('GroupNamePromptComponent', () => {
  let component: GroupNamePromptComponent;
  let fixture: ComponentFixture<GroupNamePromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupNamePromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupNamePromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
