import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import { routes } from './routes';
import { fetchData } from './libs/devtoApi';
import { ApiResponse } from './types/apiResponse';

const app: Express = express();
const PORT = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use("/", routes);

app.get('/', async (_: Request, res: Response) => {
  let data: ApiResponse[] = await fetchData();
  let response: ApiResponse[] = data.map(val => ({
    title: val.title,
    description: val.description,
    url: val.url,
    tags: val.tags,
    readable_publish_date: val.readable_publish_date
  }))
  res.json(response);
})

app.listen(PORT, () => {
  console.log(`Application is live and listening on port ${PORT}`);
})