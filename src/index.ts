import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import { routes } from './routes';

const app: Express = express();
const PORT = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use("/", routes);

app.get('/', async (_, res) => {
  // await fetchData();
  res.send('Hello World!');
})

app.listen(PORT, () => {
  console.log(`Application is live and listening on port ${PORT}`);
})