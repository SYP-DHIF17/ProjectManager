import { User } from './user';

export interface Project {
  readonly projectID: string;
  name: string;
  startDate: Date;
  plannedEndDate: Date;
  realEndDate?: Date;
  overallBudget: number;
  leaderID: string;
}
