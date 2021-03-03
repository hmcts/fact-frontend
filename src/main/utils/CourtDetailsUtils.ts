import { isArrayEmpty } from './validation';

export const decideCatchmentArea = (regionalCentre: boolean, area: { area1: string; area2: string }): string => {
  return regionalCentre ? area.area1 : area.area2;
};

export const formatServiceAreas = (serviceAreas: string[]): string => {
  if(isArrayEmpty(serviceAreas)) {
    return '';
  }

  const lastElement: string = serviceAreas.pop();
  let serviceAreaString: string = serviceAreas.join(', ');
  serviceAreaString += serviceAreas.length >= 1 ? ' and ' : '';
  serviceAreaString += lastElement;

  return serviceAreaString.toLowerCase();
};
