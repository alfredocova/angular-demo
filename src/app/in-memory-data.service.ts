import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 11, name: 'Luis Gonzalez', age: '20' },
      { id: 12, name: 'Carlos tevez', age: '23' },
      { id: 13, name: 'Ricardo Milos', age: '21' },
      { id: 14, name: 'Laura Garza', age: '27' },
      { id: 15, name: 'Roberto Villanueva', age: '29' },
      { id: 16, name: 'Pablo lopez', age: '30' },
      { id: 17, name: 'Eugenio Tapia', age: '21' },
      { id: 18, name: 'Dr Acula', age: '20' },
      { id: 19, name: 'Pamela Ortiz', age: '26' },
      { id: 20, name: 'Claudia Serrano', age: '23' }
    ];
    return {users};
  }
}
