import { Request, Router } from 'express';
import UserService from '../services/user.service';
import { auth } from '../middleware/auth.middleware';

const router = Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const newUser = await UserService.addUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await UserService.login(email, password);
    res.json({ token, user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});
router.delete('/delete-me', auth, async (req: Request & { user: any }, res) => {
  try {
    const userId = req.user.id; // Assuming you have middleware to set req.user
    await UserService.deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
