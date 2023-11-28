import { ComponentFixture, TestBed, waitForAsync   } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '@app/material.module';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { MockAuthenticationService } from '@app/core/authentication/authentication.service.mock';
import { I18nService } from '@app/core/i18n.service';
import { DashheaderComponent } from '@app/core/shell/dashheader/dashheader.component';

describe('DashheaderComponent', () => {
  let component: DashheaderComponent;
  let fixture: ComponentFixture<DashheaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        TranslateModule.forRoot()
      ],
      declarations: [DashheaderComponent],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        I18nService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
