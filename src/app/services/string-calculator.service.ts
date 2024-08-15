import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringCalculatorService {

  constructor() { }

  add(numbers: string): number {
    if (!numbers) return 0;

    const delimiters = [',', '\n'];
    let nums = numbers;

    if (numbers.startsWith('//')) {
      const parts = numbers.split('\n', 2);
      delimiters.push(parts[0][2]);
      nums = parts[1];
    }

    const regex = new RegExp(`[${delimiters.join('')}]`);
    const numList = nums.split(regex).map(n => parseInt(n, 10));

    const negatives = numList.filter(n => n < 0);
    if (negatives.length) {
      throw new Error(`negative numbers not allowed ${negatives.join(', ')}`);
    }

    return numList.reduce((sum, n) => sum + (isNaN(n) ? 0 : n), 0);
  }
}
