import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { ChatService } from './chat.service';

import { FormsModule } from '@angular/forms';

import { SafePipe } from '../safe.pipe';

import { SpeechRecognitionService } from '../speech-recognition/speech-recognition.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ChatDialogComponent,
    SafePipe
  ],
  exports: [ ChatDialogComponent ],
  providers: [ChatService, SafePipe, SpeechRecognitionService]
})
export class ChatModule { }
