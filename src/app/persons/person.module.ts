import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonComponent } from './components/person/person.component';
import { MaterialModule } from '../material/material.module';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeoresRoutingModule } from './person-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PersonComponent, PersonDetailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    HeoresRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    SharedModule
  ],
})
export class PersonModule {}
