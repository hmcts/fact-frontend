import { Application } from 'express';
import { getHomePage } from '../controllers/home';

export default function(app: Application): void {

  app.get('/', getHomePage);

}
