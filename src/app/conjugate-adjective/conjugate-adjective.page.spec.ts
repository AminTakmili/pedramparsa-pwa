import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConjugateAdjectivePage } from './conjugate-adjective.page';

describe('ConjugateAdjectivePage', () => {
  let component: ConjugateAdjectivePage;
  let fixture: ComponentFixture<ConjugateAdjectivePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConjugateAdjectivePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConjugateAdjectivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
