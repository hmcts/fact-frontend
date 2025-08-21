export const calculateDistance = (lat1: number, lon1: number, court: any) => {
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * court.lat) / 180;
  const theta = lon1 - court.lon;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;

  court.distance = dist;
  return dist;
};
