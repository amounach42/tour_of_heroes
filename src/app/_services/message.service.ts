import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { 
    console.log("message constructor called!") }

  messages: string[] = [];

  add(message: string) {
    this.messages.push(message)
  }

  clear() {
    this.messages = []
  }
}
