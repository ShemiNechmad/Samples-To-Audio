import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private ctx: AudioContext = new AudioContext();
  public bufferData: number[] = [];
  private allBinars: any;
  public message: string = '';

  constructor(private route: ActivatedRoute, private as: AppService) {
    this.route.queryParams.subscribe(data => { if (data && data['data']) this.handleQueryParam(data['data']) });
  }

  handleQueryParam(data: string) {
    let arr = data.split(",");
    let res = this.as.createArrayBuffer(arr);
    if ((!res.arrayBuffer || !res.binarOfNumber)) {
      this.message = res.message;
      return;
    }
    this.bufferData = res.arrayBuffer;
    this.allBinars = res.binarOfNumber;
    console.log('All binars:');
    console.log(this.allBinars);
  }

  play() {
    this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    let arrayBuffer = this.ctx.createBuffer(1, this.bufferData.length + 4400, 44100);
    let nowBuffering = arrayBuffer.getChannelData(0);
    for (let i = 0; i < nowBuffering.length; i++) {
      if (i < 2200) nowBuffering[i] = 0;
      else if (i > this.bufferData.length + 2199) nowBuffering[i] = 0;
      else nowBuffering[i] = this.bufferData[i - 2200];
    }
    console.log('Wave form:');
    console.log(nowBuffering);
    const source = this.ctx.createBufferSource();
    source.buffer = arrayBuffer;
    source.connect(this.ctx.destination);
    source.start();
  }
}
