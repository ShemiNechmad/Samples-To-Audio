import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private evenBinaryBuffer: number[] = [0.7, 0.7, 0, -0.7, -0.7, 0];
  private oddBinaryBuffer: number[] = [0.55, 0.8, 0.55, 0, -0.55, -0.8, -0.55, 0];

  constructor() { }

  createArrayBuffer(arr: string[]) {
    let arrayBuffer: number[] = [];
    let partialBuffer: number[] = [];
    let binarOfNumber: any[] = [];
    let res: any;
    for (let i = 0; i < arr.length; i++) {
      if (isNaN(Number(arr[i])) || !arr[i]) return { message: 'Not all data is of type number' };
      res = this.createPartialArrayBuffer(Number(arr[i]));
      partialBuffer = res.partialBuffer;
      binarOfNumber.push(res.binarOfNumber);
      arrayBuffer = arrayBuffer.concat(partialBuffer);
    }
    return { arrayBuffer: arrayBuffer, binarOfNumber: binarOfNumber };
  }

  createPartialArrayBuffer(num: number) {
    let partialBuffer: number[] = [];
    let binarOfNumber = [];
    let oddEven = 0;
    for (let i = 0; i < 8; i++) {
      if (num % 2 === 0) { partialBuffer = partialBuffer.concat(this.evenBinaryBuffer); oddEven = 0 }
      else { partialBuffer = partialBuffer.concat(this.oddBinaryBuffer); oddEven = 1 }
      num = Math.trunc(num / 2);
      binarOfNumber.push(oddEven);
    }

    return {
      partialBuffer: partialBuffer,
      binarOfNumber: binarOfNumber
    };
  }
}
