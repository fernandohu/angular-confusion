import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DishdetailComponent } from './dishdetail.component';
import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DishService } from '../services/dish.service';
import {ActivatedRoute, RouterModule} from '@angular/router';
import { Observable } from 'rxjs';
import {Location, LocationStrategy, APP_BASE_HREF, PathLocationStrategy} from '@angular/common';
import {RouterTestingModule} from "@angular/router/testing";

class MockActivatedRoute extends ActivatedRoute {
  constructor() {
    super();
    this.params = Observable.of({id: "1"});
  }
}

describe('DishdetailComponent', () => {
  let component: DishdetailComponent;
  let fixture: ComponentFixture<DishdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DishdetailComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        RouterTestingModule
      ],
      providers: [
        DishService,
        Location,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        },
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute,
          useValue: {
            params: Observable.of({id: 123})
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
