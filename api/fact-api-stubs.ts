import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
const app = express();

const data = require('./courts.json');
const port = 8080;


app.use(bodyParser.json());

app.get('/courts', (req: Request, res: Response) => {
  const query: string = (req.query.search as string).toUpperCase();
  const courts = [...data];
  const filteredDocs = courts.filter(court => {
    if (court['postcode'].toUpperCase().split(' ').indexOf(query) >= 0 ||
        court['address'].toUpperCase().split(' ').indexOf(query) >= 0 ||
        court['townName'].toUpperCase().split(' ').indexOf(query) >= 0 ||
        court['name'].toUpperCase().split(' ').indexOf(query) >= 0) {
      return true;
    }
  });
  res.json(filteredDocs);
});

app.listen(port, () => {
  console.log(`Application started: http://localhost:${port}`);
});
