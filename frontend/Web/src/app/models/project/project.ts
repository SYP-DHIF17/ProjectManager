export interface Project {
  readonly projectId: string;
  name: string;
  startDate: Date;
  plannedEnddate: Date;
  realEnddate: Date;
  overallBudget: number;
  leader: string;
  readonly creator: string;
}
