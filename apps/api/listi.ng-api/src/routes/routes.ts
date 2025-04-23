import { Router } from 'express';
import todoRoutes from './todo.routes';
import authRoutes from './auth.routes'; // Assuming you have authRoutes defined
const routes = Router();

routes.use('/api/todos', todoRoutes);
routes.use('/api/auth', authRoutes); // Assuming you have authRoutes defined
export default routes;
