import express from 'express';
import routes from './routes/routes';
import sequelize from './config/database.config';
import cors from 'cors';
const host = process.env.HOST ?? '0.0.0.0';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(cors()); // Allow requests from the frontend app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    await sequelize.sync(); // Sync models with the database
    console.log('Database synced successfully.');
    app.listen(port, host, () => {
      console.log(`[ ready ] http://${host}:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
