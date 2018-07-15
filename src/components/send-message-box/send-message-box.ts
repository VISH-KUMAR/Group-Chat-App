import { Component , Input,Output , EventEmitter, OnInit} from '@angular/core';

//for switching between the different pages
import { FlagServiceProvider } from '../../providers/flag-service/flag-service';


@Component({
  selector: 'send-message-box',
  templateUrl: 'send-message-box.html'
})
export class SendMessageBoxComponent implements OnInit {
  
  @Input() 
  message:string = ''; 


  @Output() userMsg:EventEmitter<string>;

  @Output() channelMsg:EventEmitter<string>;

  @Output() groupMsg:EventEmitter<string>;

  channelChatFlag:boolean=false;
  groupChatFlag:boolean=false;
  oneToOneChatFlag:boolean=false;
  constructor( 
    private flagService:FlagServiceProvider
  ) {
    this.userMsg = new EventEmitter<string>();
    this.channelMsg = new EventEmitter<string>();
    this.groupMsg = new EventEmitter<string>();
    let flags =  this.flagService.getFlags();
    this.channelChatFlag = flags.channelChatFlag;
    this.groupChatFlag = flags.groupChatFlag;
    this.oneToOneChatFlag = flags.oneToOneChatFlag;
  }

  sendMessage(){
    console.log(this.channelChatFlag+'   '+ this.groupChatFlag +'  '+ this.oneToOneChatFlag)
    if(this.oneToOneChatFlag && this.message!=''){
      this.userMsg.emit(this.message);
      this.message = '';
    }

    if(this.channelChatFlag && this.message != ''){
      this.channelMsg.emit(this.message);
      this.message="";
    }
    
    if(this.groupChatFlag && this.message != ''){
      this.groupMsg.emit(this.message);
      this.message = '';
    }

  }
  ngOnInit(){
    
  }
}
