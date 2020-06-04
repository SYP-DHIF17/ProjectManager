export interface Project {
  readonly projectId: string;
  name: string;
  startDate: Date;
  plannedEndDate: Date;
  realEndDate?: Date;
  overallBudget: number;
  leader: string;
}
