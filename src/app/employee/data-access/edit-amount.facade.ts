import { Injectable, signal } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EditAmountFacade {

  mockedEmployeeData = signal<Employee[]>([
    { id: '4583', name: 'John Doe' },
    { id: '7291', name: 'Jane Smith' },
    { id: '6034', name: 'Alice Johnson' },
    { id: '4821', name: 'Bob Brown' },
    { id: '3165', name: 'Charlie Davis' },
    { id: '8910', name: 'Diana Evans' },
    { id: '7459', name: 'Edward Wilson' },
    { id: '2567', name: 'Fiona Harris' },
    { id: '1294', name: 'George Clark' },
    { id: '9384', name: 'Hannah Lewis' },
    { id: '2143', name: 'Ian Walker' },
    { id: '5678', name: 'Julia Robinson' },
    { id: '8430', name: 'Kevin Young' },
    { id: '6792', name: 'Laura King' },
    { id: '3419', name: 'Michael Scott' },
    { id: '4928', name: 'Nancy Turner' },
    { id: '7856', name: 'Oliver Wright' },
    { id: '3621', name: 'Paula White' },
    { id: '7139', name: 'Quincy Green' },
    { id: '8542', name: 'Rachel Adams' }
  ])
}
