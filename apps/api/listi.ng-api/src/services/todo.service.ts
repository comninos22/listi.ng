import Todo from '../models/todo.model';

export class TodoService {
  // Get all todos for a specific user
  async getTodos(userId: string) {
    return await Todo.findAll({
      where: { userId },
    });
  }

  // Get a specific todo by ID for a specific user
  async getTodoById(userId: string, todoId: string) {
    const todo = await Todo.findOne({
      where: { id: todoId, userId },
    });
    if (!todo) {
      throw new Error('Todo not found or does not belong to the user');
    }
    return todo;
  }

  // Add a new todo for a specific user
  async addTodo(userId: string, data: { title: string; description?: string; completed?: boolean }) {
    const newTodo = await Todo.create({
      id: `${Date.now()}`,
      userId, // Associate the todo with the user
      ...data,
    });
    return newTodo;
  }

  // Update a specific todo for a specific user
  async updateTodo(
    userId: string,
    todoId: string,
    data: { title?: string; description?: string; completed?: boolean }
  ) {
    const todo = await Todo.findOne({
      where: { id: todoId, userId },
    });
    if (!todo) {
      throw new Error('Todo not found or does not belong to the user');
    }
    await todo.update(data);
    return todo;
  }

  // Delete a specific todo for a specific user
  async deleteTodo(userId: string, todoId: string) {
    const todo = await Todo.findOne({
      where: { id: todoId, userId },
    });
    if (!todo) {
      throw new Error('Todo not found or does not belong to the user');
    }
    await todo.destroy();
  }
}

export default new TodoService();