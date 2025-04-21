import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { type Observable, of } from "rxjs"
import { TodoDto } from "@listi.ng/common-dtos"

@Injectable({
  providedIn: "root",
})
export class TodoService {
  private todos: TodoDto[] = [
    {
      id: "1",
      title: "Learn Angular Material",
      description: "Study the components and implement them in the project",
      completed: false,
    },
    {
      id: "2",
      title: "Create Todo Dashboard",
      description: "Implement a dashboard with filtering capabilities",
      completed: true,
    },
    {
      id: "3",
      title: "Add Unit Tests",
      completed: false,
    },
  ]

  constructor(private http: HttpClient) {}

  // In a real application, these methods would call an API
  // For this example, we're using a local array to simulate API calls

  getTodos(): Observable<TodoDto[]> { 
    // Simulate API call
    return of(this.todos)
  }

  getTodoById(id: string): Observable<TodoDto | undefined> {
    // Simulate API call
    return of(this.todos.find((todo) => todo.id === id))
  }

  addTodo(todo: TodoDto): Observable<TodoDto> {
    // Ensure the todo has an ID
    const newTodo: TodoDto = {
      ...todo,
      id: todo.id || crypto.randomUUID(),
    }

    // Simulate API call
    this.todos.push(newTodo)
    return of(newTodo)
  }

  updateTodo(todo: TodoDto): Observable<TodoDto> {
    // Simulate API call
    const index = this.todos.findIndex((t) => t.id === todo.id)
    if (index !== -1) {
      this.todos[index] = { ...todo }
      return of(this.todos[index])
    }
    return of(todo)
  }

  deleteTodo(id: string): Observable<void> {
    // Simulate API call
    this.todos = this.todos.filter((todo) => todo.id !== id)
    return of(undefined)
  }
}



// import { Injectable } from '@angular/core';
// import { PublicApiService } from '../api/public/publicApi.service';
// import { Observable } from 'rxjs';
// import { TodoDto } from '@listi.ng/common-dtos';
// @Injectable({
//   providedIn: 'root',
// })
// export class TodoService {
//   constructor(private api: PublicApiService) {}

//   /**
//    * Fetches all todos from the server.
//    * @returns An Observable with the list of todos.
//    */
//   getTodos(): Observable<TodoDto[]> {
//     return this.api.get('/todos');
//   }

//   /**
//    * Fetches a specific todo by its ID.
//    * @param id The ID of the todo to fetch.
//    * @returns An Observable with the todo details.
//    */
//   getTodoById(id: string): Observable<TodoDto> {
//     return this.api.get(`/todos/${id}`);
//   }

//   /**
//    * Creates a new todo.
//    * @param todo The todo object to create.
//    * @returns An Observable with the server response.
//    */
//   createTodo(todo: TodoDto): Observable<TodoDto> {
//     return this.api.post('/todos', todo);
//   }

//   /**
//    * Updates an existing todo by its ID.
//    * @param id The ID of the todo to update.
//    * @param updates The updates to apply to the todo.
//    * @returns An Observable with the server response.
//    */
//   updateTodo(id: string, updates: Partial<TodoDto>): Observable<TodoDto> {
//     return this.api.put(`/todos/${id}`, updates);
//   }

//   /**
//    * Deletes a todo by its ID.
//    * @param id The ID of the todo to delete.
//    * @returns An Observable with the server response.
//    */
//   deleteTodo(id: string): Observable<TodoDto> {
//     return this.api.delete(`/todos/${id}`);
//   }
// }
