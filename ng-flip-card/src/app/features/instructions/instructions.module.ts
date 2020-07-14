import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { InstructionsComponent } from '@app/features/instructions/instructions.component';
import { InstructionsRoutingModule } from '@app/features/instructions/instructions-routing.module';


const modules = [
  CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule, InstructionsRoutingModule];

@NgModule({
  imports: [...modules],
  declarations: [InstructionsComponent],
  exports: [InstructionsComponent],
})
export class InstructionsModule {}
