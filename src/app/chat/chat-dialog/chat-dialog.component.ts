import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';
import { SpeechRecognitionService } from '../../speech-recognition/speech-recognition.service';


@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']  
})
export class ChatDialogComponent implements OnInit, OnDestroy {

  messages: Observable<Message[]>;
  formValue: string; 
  showSpeechButton: boolean; 

  constructor(public chat: ChatService, private speechRecognitionService: SpeechRecognitionService) {    
    this.formValue = "";
    this.showSpeechButton = false;
  }

  ngOnInit() {
    // appends to array after each new message is added to feedSource
    this.messages = this.chat.conversation.asObservable()
        .scan((acc, val) => acc.concat(val) );
  };

  ngOnDestroy() {
    this.speechRecognitionService.DestroySpeechObject();
  };

  sendMessage() {
    if (this.formValue.length) {
      this.chat.converse(this.formValue);
      this.formValue = '';
      let timeoutId = setTimeout(() => {  
        window.scrollTo(0, document.body.scrollHeight);
      }, 0);    
      clearTimeout(timeoutId);
    }
  };

  activateSpeechSearchMovie(): void {        

    this.showSpeechButton = !this.showSpeechButton;

    if (this.showSpeechButton) {
      this.speechRecognitionService.record()
        .subscribe(
          //listener
          (value) => {
              if (value.trim().length) {
                this.formValue = this.formValue + ' ' + value;
                console.log(value);
              }
          },
          //errror
          (err) => {
              console.log(err);                  
              if (err.error == "no-speech") {
                  console.log("--restatring service--");
                  //this.activateSpeechSearchMovie();
              }
          },
          //completion
          () => {                                       
              console.log("--complete--");
              //this.activateSpeechSearchMovie();
          });
    } else {
      this.speechRecognitionService.DestroySpeechObject();
    }
  };
}