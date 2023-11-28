import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsPageRoutingModule } from './cms-page-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { FormsModule } from '@angular/forms';
import { CmsPageComponent } from './cms-page.component';
import { CmsPageService } from './cms-page.service';



@NgModule({
  declarations: [
    CmsPageComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    CmsPageRoutingModule
    
  ],
  providers:[CmsPageService]
})
export class CmsPageModule { }
