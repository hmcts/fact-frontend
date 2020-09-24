export class HomeController {
  public get(req: any, res: any): void {
    res.render('home', req.i18n.getDataByLanguage(req.lng).home);
  }
}
