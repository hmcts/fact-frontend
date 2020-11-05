import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
const app = express();

const data = require('./courts.json');
const courtDetails = require('./court-details.json');
const servicesData = require('./services.json');
const moneyServiceAreasData = require('./moneyAreaOfLaw.json');
const familyServiceAreasData = require('./familyAreaOfLaw.json');
const childcareAndParentingServiceAreasData = require('./childcareAndParentingAreaOfLaw.json');
const courtsInMoneyClaims = require('./courts-in-money-claims.json');
const moneyServiceData = require('./money-service-data.json');
const port = 8080;


app.use(bodyParser.json());

app.get('/courts', (req: Request, res: Response) => {
  const query: string = (req.query.q as string).toUpperCase();
  const courts = [...data];
  const filteredDocs = courts.filter(court => {
    if (court['postcode'].toUpperCase().indexOf(query) >= 0 ||
        court['address'].toUpperCase().indexOf(query) >= 0 ||
        court['townName'].toUpperCase().indexOf(query) >= 0 ||
        court['name'].toUpperCase().indexOf(query) >= 0) {
      return true;
    }
  });
  res.json(filteredDocs);
});

app.get('/courts/:slug', (req: Request, res: Response) => {
  const slug: string = (req.params.slug as string).toLowerCase();
  const courts = [...courtDetails];
  const court = courts.find(court => court.slug.toLowerCase() === slug);
  res.json(court);
});

app.get('/services', (req: Request, res: Response) => {
  res.json(servicesData);
});

app.get('/services/money/service-areas', (req: Request, res: Response) => {
  res.json(moneyServiceAreasData);
});

app.get('/services/money', (req: Request, res: Response) => {
  res.json(moneyServiceData);
});

app.get('/services/probate-divorce-ending-civil-partnerships/service-areas', (req: Request, res: Response) => {
  res.json(familyServiceAreasData);
});

app.get('/services/childcare-and-parenting/service-areas', (req: Request, res: Response) => {
  res.json(childcareAndParentingServiceAreasData);
});

app.get('/courts/money/money-claims', (req: Request, res: Response) => {
  res.json(courtsInMoneyClaims);
});

app.listen(port, () => {
  console.log(`Application started: http://localhost:${port}`);
});
