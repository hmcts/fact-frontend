export const getHomePage = (req: any, res: any) => {
  res.render('home', req.i18n.getDataByLanguage(req.lng).home);
};
