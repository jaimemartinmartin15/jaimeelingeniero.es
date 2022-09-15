import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToEmojiPipe } from './to-emoji.pipe';

@NgModule({
  declarations: [ToEmojiPipe],
  imports: [CommonModule],
  exports: [ToEmojiPipe],
})
export class PipesModule {}
