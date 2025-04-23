import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TodoDto } from "@listi.ng/common-dtos";
import { PublicApiService } from "../public/publicApi.service";

@Injectable({
  providedIn: "root",
})

export class TodoService {
  private readonly apiUrl = "/todos"; // Base URL for the API

  constructor(private http: PublicApiService) {}

  /**
   * Fetches all todos from the server.
   * @returns An Observable with the list of todos.
   */
  getTodos(): Observable<TodoDto[]> {
    return this.http.get<TodoDto[]>(this.apiUrl);
  }

  /**
   * Fetches a specific todo by its ID.
   * @param id The ID of the todo to fetch.
   * @returns An Observable with the todo details.
   */
  getTodoById(id: string): Observable<TodoDto> {
    return this.http.get<TodoDto>(`${this.apiUrl}/${id}`);
  }

  /**
   * Creates a new todo.
   * @param todo The todo object to create.
   * @returns An Observable with the server response.
   */
  addTodo(todo: TodoDto): Observable<TodoDto> {
    return this.http.post<TodoDto>(this.apiUrl, todo);
  }

  /**
   * Updates an existing todo by its ID.
   * @param id The ID of the todo to update.
   * @param updates The updates to apply to the todo.
   * @returns An Observable with the server response.
   */
  updateTodo(updates: Partial<TodoDto>): Observable<TodoDto> {
    return this.http.put<TodoDto>(`${this.apiUrl}/${updates.id}`, updates);
  }

  /**
   * Deletes a todo by its ID.
   * @param id The ID of the todo to delete.
   * @returns An Observable with the server response.
   */
  deleteTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}