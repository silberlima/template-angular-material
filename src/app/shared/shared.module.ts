import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonSearchComponent } from './components/person-search/person-search.component';
import { MaterialModule } from '../material/material.module';

const SHARED_COMPONENTS = [PersonSearchComponent];
const MODULES = [MaterialModule]

@NgModule({
  declarations: [SHARED_COMPONENTS],
  imports: [CommonModule, MODULES],
  exports: [SHARED_COMPONENTS]
})
export class SharedModule {}
