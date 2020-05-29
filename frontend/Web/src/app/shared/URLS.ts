export class URLS {
  private static readonly BASE: string = 'localhost';

  public static USER = class {
    public static readonly LOGIN: string = URLS.BASE + '/login';
    public static readonly REGISTER: string = URLS.BASE + '/register';
  }

  public static PROJECTS = class {
    public static readonly ALL: string = URLS.BASE + '/';
  }
}
