//for switching between the different pages

import { Injectable } from '@angular/core';

@Injectable()
export class FlagServiceProvider {
  channelChatFlag: boolean = false;
  groupChatFlag: boolean = false;
  oneToOneChatFlag: boolean = false;
  modalFlag:boolean = false;
  constructor() {
    console.log('Hello FlagServiceProvider Provider');
  }
  setChannelChatFlag() {
    console.log("set this channel chat flag")
    this.channelChatFlag = true;
    this.groupChatFlag = false;
    this.oneToOneChatFlag = false;

  }
  setChatMessage() {
    console.log('userchat chat')
    this.oneToOneChatFlag = true;
    this.groupChatFlag = false;
    this.channelChatFlag = false;

  }
  setUserGroupChat() {
    console.log('userGroup chat')
    this.groupChatFlag = true;
    this.channelChatFlag = false;
    this.oneToOneChatFlag = false;

  }
  getFlags() {
    console.log('returning the flags')
    return {
      channelChatFlag: this.channelChatFlag,
      groupChatFlag: this.groupChatFlag,
      oneToOneChatFlag: this.oneToOneChatFlag
    }
  }

  setModalFlag(){
    this.modalFlag = true;
  }
  getModalFlag(){
    return this.modalFlag;
  }
  resetModalFlag(){
    this.modalFlag = false;
    console.log(this.modalFlag)
  }


  editProfileFlag:boolean=false;
  setEditProfileFlag(){
    this.editProfileFlag = true;
  }
  getEditProfileFlag(){
    return  this.editProfileFlag;
  }
}
