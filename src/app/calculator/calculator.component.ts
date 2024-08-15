import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StringCalculatorService } from '../../app/services/string-calculator.service';
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  calcForm!: FormGroup;
  result: number | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private stringcalculatorservice: StringCalculatorService){}

  ngOnInit(): void {
    this.calcForm = this.fb.group({
      numbers: ['']
    });
  }

  onCalculate(): void {
    const inputString = this.calcForm.get('numbers')?.value;
    try {
      this.result = this.stringcalculatorservice.add(inputString);
      this.errorMessage = null;
    } catch (e: any) {
      this.errorMessage = e.message;
      this.result = null;
    }
  }

}
