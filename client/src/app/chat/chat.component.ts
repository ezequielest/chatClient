import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as io from 'socket.io-client';

const SOCKET_ENDPOINT = 'localhost:3000'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @ViewChild('showChat',{static: false}) showChat:ElementRef;

  socket;

  textChat = new FormControl('');
  listChat = [];

  constructor() { }

  ngOnInit() {
    this.setupSocketConnection();
  }

  sendMessage() {
    this.listChat.push({
      message: this.textChat.value,
      propietario: 'propio'
    })

    this.socket.emit('message',this.textChat.value);
    this.textChat.patchValue('');
  }

  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: string) => {
      this.listChat.push({
        message: data,
        propietario: 'externo'
      })
    });
  }

}
