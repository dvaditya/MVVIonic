import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscussionsPageRoutingModule } from './discussions-routing.module';

import { DiscussionsPage } from './discussions.page';

import { PipesModule } from '../../pipes/pipes.module';

import { from } from 'rxjs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscussionsPageRoutingModule,
    PipesModule
  ],
  declarations: [DiscussionsPage]
})
export class DiscussionsPageModule {}
