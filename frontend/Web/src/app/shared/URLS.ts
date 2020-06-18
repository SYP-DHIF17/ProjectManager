export class URLS {
  private static readonly BASE: string = 'localhost/api';

  public static USER = class {
    public static readonly LOGIN: string = URLS.BASE + '/login';
    public static readonly REGISTER: string = URLS.BASE + '/register';
    // TODO get a better name for the url lol
    public static readonly INFO: string = URLS.BASE + '/user';
    public static ID(userID: string) {
      return `${this.INFO}/${userID}`;
    }
  }

  public static PROJECTS = class {
    public static readonly ALL: string = URLS.BASE + '/projects';
    public static ID(projectID: string) {
      return URLS.BASE + `/project/${projectID}`
    }
  }

  public static TEAMS = class {
    public static ALL(projectID: string): string {
      return URLS.PROJECTS.ID(projectID) + "/teams";
    }
    public static ID(teamID: string): string {
      return URLS.BASE + `/team/${teamID}`;
    }
  }

  public static PROJECTPARTS = class {
    public static ALL(projectID: string): string {
      return URLS.PROJECTS.ID(projectID) + "/parts";
    }
    public static ID(partID: string): string {
      return URLS.BASE + `/part/${partID}`;
    }
    public static WITHTEAM(partID: string, teamID: string) {
      return this.ID(partID) + `/${teamID}`;
    }
  }

  public static MILESTONES = class {
    public static ALL(partID: string): string {
      return URLS.PROJECTPARTS.ID(partID) + "/milestones";
    }

    public static ID(milestoneID: string): string {
      return URLS.BASE + `/milestone/${milestoneID}`;
    }
  }

  public static WORKPACKAGES = class {
    public static ALL(partID: string): string {
      return URLS.PROJECTPARTS.ID(partID) + `/workpackages`;
    }
    public static ID(packageID: string): string {
      return URLS.BASE + `/part/${packageID}`;
    }
  }
}
