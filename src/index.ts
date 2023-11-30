import express, { Application } from 'express';
import { initializeControllers } from './controllers';

const app: Application = express();
const PORT = 3000;

app.use(express.static('public'))
initializeControllers(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
