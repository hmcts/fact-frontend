export const decideCatchmentArea = (regionalCentre: boolean, area: { area1: string; area2: string }): string => {
  return regionalCentre ? area.area1 : area.area2;
};
