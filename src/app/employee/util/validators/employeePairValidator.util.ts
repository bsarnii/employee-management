import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Employee } from "../../models/employee.model";

export const employeePairValidator = (employeeData: Employee[]): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const employee_id = control.get('employee_id')?.value;
      const employee_name = control.get('employee_name')?.value;
  
      const validPair = employeeData.some(
        employee => employee.id === employee_id && employee.name === employee_name
      );
  
      return validPair ? null : { invalidEmployeePair: true };
    };
  };