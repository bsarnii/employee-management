import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../../models/employee.model';

@Pipe({
  name: 'searchEmployees',
  standalone: true,
})
export class SearchEmployeesPipe implements PipeTransform {
  transform(value:Employee[], searchValue: string) {
    if(searchValue === ''){
      return value
    }
   return value.filter(employee => employee.id.includes(searchValue) || employee.name.toLowerCase().includes(searchValue))
  }
}