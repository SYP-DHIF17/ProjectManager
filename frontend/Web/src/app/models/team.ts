import { User } from './user';

export interface Team {
  readonly teamID: string;
  name: string;
  projectID?: string;
  leaderID?: string;
}
