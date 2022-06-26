import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private ctx: AudioContext = new AudioContext();

  constructor() { }

  play() {
    this.initiateAudioContext();
  }

  initiateAudioContext() {
    this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    let arrayBuffer = this.ctx.createBuffer(1, 44100, 44100);
    let nowBuffering = arrayBuffer.getChannelData(0);
    let currentBuffer = 1;
    let direction = 'down';
    for (let i = 0; i < nowBuffering.length; i++) {
      if (direction === 'down') currentBuffer =  Math.round((currentBuffer - 0.1) * 100) / 100;
      else currentBuffer =  Math.round((currentBuffer + 0.1) * 100) / 100;
      nowBuffering[i] = Number(currentBuffer.toFixed(2));

      if (currentBuffer <= -1) direction = 'up';
      if (currentBuffer >= 1) direction = 'down';
    }

    console.log(nowBuffering);
    const source = this.ctx.createBufferSource();
    source.buffer = arrayBuffer;
    source.connect(this.ctx.destination);
    source.start();
  }
}
