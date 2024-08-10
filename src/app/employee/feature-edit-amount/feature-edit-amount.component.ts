import { Component, inject } from '@angular/core';
import { EditAmountFacade } from '../data-access/edit-amount.facade';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchResultsOverlayComponent } from "../ui/search-results-overlay/search-results-overlay.component";
import { Employee } from '../models/employee.model';
import { employeePairValidator } from '../util/validators/employeePairValidator.util';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { combineLatest, map, startWith } from 'rxjs';

interface FormResult{
  date: string
  employees: FormRowResult[]
}

interface FormRowResult{
  employee_name: string
  employee_id: string
  TypeA_Amount: number
  TypeB_Amount: number
}

@Component({
  selector: 'app-feature-edit-amount',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SearchResultsOverlayComponent, MatDatepickerModule, MatFormFieldModule,MatInputModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './feature-edit-amount.component.html',
  styleUrl: './feature-edit-amount.component.scss'
})
export class FeatureEditAmountComponent {
  facade = inject(EditAmountFacade);
  fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    date: this.fb.control(null,[Validators.required]),
    employees: this.fb.array<FormGroup>([])
  });
  formArray = this.form.get('employees') as FormArray;

  addRow(){
    this.formArray.push(this.fb.group({
      employee_id: new FormControl('', Validators.required),
      employee_name: new FormControl('', Validators.required), 
      TypeA_Amount: new FormControl(0, [Validators.required, Validators.min(1)]), 
      TypeB_Amount: new FormControl(0, [Validators.required, Validators.min(1)]), 
    },{ validators: employeePairValidator(this.facade.mockedEmployeeData()) }))
  }

  onEmployeeSelect(employee:Employee, arrayIndex:number){
    const arrayItemGroup = this.formArray.controls[arrayIndex];
    arrayItemGroup.get('employee_id')?.setValue(employee.id);
    arrayItemGroup.get('employee_name')?.setValue(employee.name);
  }

  filterResults(event:Event){
    const value = (event.target as HTMLInputElement).value;
    const selectedIds = this.formArray.getRawValue().map(group => group.employee_id);
    const filteredEmployees = this.facade.mockedEmployeeData().filter((employee:Employee) =>
      !selectedIds.some(id => id === employee.id) && (employee.name.toLowerCase().includes(value.toLowerCase()) || employee.id.includes(value))
    )
    return filteredEmployees;
  }

  onTypeAChange(arrayIndex:number){
    const arrayItemGroup = this.formArray.controls[arrayIndex];
    const typeAControl = arrayItemGroup.get('TypeA_Amount');
    const typeBControl = arrayItemGroup.get('TypeB_Amount');
    if(typeAControl?.value === null){
      typeAControl.setValue(0);
    }
    if(typeAControl?.value !== 0) {
      typeBControl?.disable()
    }
    if(typeAControl?.value === 0) {
      typeBControl?.enable()
    }
  }

  onTypeBChange(arrayIndex:number){
    const arrayItemGroup = this.formArray.controls[arrayIndex];
    const typeAControl = arrayItemGroup.get('TypeA_Amount');
    const typeBControl = arrayItemGroup.get('TypeB_Amount');
    if(typeBControl?.value === null){
      typeBControl.setValue(0);
    }
    if(typeBControl?.value !== 0) {
      typeAControl?.disable()
    }
    if(typeBControl?.value === 0) {
      typeAControl?.enable()
    }
  }

  typeA_total$ = this.formArray.valueChanges.pipe(
    map(rows => rows.reduce((sum:number, row:FormRowResult) => {
      return sum + (row['TypeA_Amount'] ? row['TypeA_Amount'] : 0)
    }, 0 )),
    startWith(0)
  )

  typeB_total$ = this.formArray.valueChanges.pipe(
    map(rows => rows.reduce((sum:number, row:FormRowResult) => {
      return sum + (row['TypeB_Amount'] ? row['TypeB_Amount'] : 0)
    }, 0 )),
    startWith(0)
  )

  amountDifference$ = combineLatest([this.typeA_total$,this.typeB_total$]).pipe(
    map(([typeA,typeB])=> {
      const typeASubstraction = typeA - typeB;
      const typeBSubstraction = typeB - typeA;
      if(typeASubstraction > 0){
        return typeASubstraction
      }
      if(typeBSubstraction > 0) {
        return typeBSubstraction
      }
      return 0
    })
  )


  submit(){
    if(this.form.valid){
      console.log(this.form.getRawValue())
    }else{
      this.formArray.markAllAsTouched();
      console.log("Form is invalid!");
    }

  }

}
