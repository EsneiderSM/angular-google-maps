import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapJsComponent } from './map-js.component';

describe('MapJsComponent', () => {
  let component: MapJsComponent;
  let fixture: ComponentFixture<MapJsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapJsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
