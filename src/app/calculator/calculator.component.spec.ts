import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StringCalculatorService } from '../services/string-calculator.service';
import { CalculatorComponent } from './calculator.component';

describe('StringCalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [ StringCalculatorService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return 0 for an empty string', () => {
    component.calcForm.controls['numbers'].setValue('');
    component.onCalculate();
    expect(component.result).toBe(0);
    expect(component.errorMessage).toBeNull();
  });

  it('should return the number for a single number', () => {
    component.calcForm.controls['numbers'].setValue('1');
    component.onCalculate();
    expect(component.result).toBe(1);
    expect(component.errorMessage).toBeNull();
  });

  it('should return the sum for two numbers', () => {
    component.calcForm.controls['numbers'].setValue('1,2');
    component.onCalculate();
    expect(component.result).toBe(3);
    expect(component.errorMessage).toBeNull();
  });

  it('should return the sum for multiple numbers', () => {
    component.calcForm.controls['numbers'].setValue('1,2,3');
    component.onCalculate();
    expect(component.result).toBe(6);
    expect(component.errorMessage).toBeNull();
  });

  it('should handle new lines between numbers', () => {
    component.calcForm.controls['numbers'].setValue('1\n2,3');
    component.onCalculate();
    expect(component.result).toBe(6);
    expect(component.errorMessage).toBeNull();
  });

  it('should support different delimiters', () => {
    component.calcForm.controls['numbers'].setValue('//;\n1;2');
    component.onCalculate();
    expect(component.result).toBe(3);
    expect(component.errorMessage).toBeNull();
  });

  it('should throw an exception for negative numbers', () => {
    component.calcForm.controls['numbers'].setValue('1,-2,3');
    component.onCalculate();
    expect(component.result).toBeNull();
    expect(component.errorMessage).toBe('negative numbers not allowed -2');
  });

  it('should throw an exception for multiple negative numbers', () => {
    component.calcForm.controls['numbers'].setValue('-1,-2,3');
    component.onCalculate();
    expect(component.result).toBeNull();
    expect(component.errorMessage).toBe('negative numbers not allowed -1, -2');
  });
});
