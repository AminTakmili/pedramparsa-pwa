import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeitnerStepsReportComponent } from './leitner-steps-report.component';

describe('LeitnerStepsReportComponent', () => {
  let component: LeitnerStepsReportComponent;
  let fixture: ComponentFixture<LeitnerStepsReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LeitnerStepsReportComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeitnerStepsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
