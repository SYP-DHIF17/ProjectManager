import { User } from './user';

export interface Project {
  readonly projectId: string;
  name: string;
  startDate: Date;
  plannedEndDate: Date;
  realEndDate?: Date;
  overallBudget: number;
  leaderID: string;

  // leader stuff
  userID: User;
}
