import { Request, Router } from 'express';
import TodoService from '../services/todo.service';
import { auth } from '../middleware/auth.middleware';

const router = Router();
router.use(auth);
type AuthReq = Request & { user: any }; // Assuming you have middleware to set req.user
// Get all todos
router.get('', async (req: AuthReq, res) => {
  try {
    const todos = await TodoService.getTodos(req.user.id);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a todo by ID
router.get('/:id', async (req: AuthReq, res) => {
  try {
    const todo = await TodoService.getTodoById(req.user.id, req.params.id);
    res.json(todo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Add a new todo
router.post('', async (req: AuthReq, res) => {
  try {
    const newTodo = await TodoService.addTodo(req.user.id, req.body);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a todo
router.put('/:id', async (req: AuthReq, res) => {
  try {
    const updatedTodo = await TodoService.updateTodo(
      req.user.id,
      req.params.id,
      req.body
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Delete a todo
router.delete('/:id', async (req: AuthReq, res) => {
  try {
    await TodoService.deleteTodo(req.user.id, req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
