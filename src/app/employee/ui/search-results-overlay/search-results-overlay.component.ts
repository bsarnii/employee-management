import { Component, Input, input, output } from '@angular/core';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-search-results-overlay',
  standalone: true,
  imports: [],
  templateUrl: './search-results-overlay.component.html',
  styleUrl: './search-results-overlay.component.scss'
})
export class SearchResultsOverlayComponent {
  @Input() results:Employee[] = []
  employeeSelected = output<Employee>();

  onSelect(employee:Employee){
    if (document.activeElement instanceof HTMLElement)
      document.activeElement.blur();
    this.employeeSelected.emit(employee);
  }

  onAddEmployeeBtnClick(){
    if (document.activeElement instanceof HTMLElement)
      document.activeElement.blur();
    console.log("Redirect to add employee page")
  }

}
