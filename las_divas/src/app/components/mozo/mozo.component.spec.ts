import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MozoComponent } from './mozo.component';

describe('MozoComponent', () => {
  let component: MozoComponent;
  let fixture: ComponentFixture<MozoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MozoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MozoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
