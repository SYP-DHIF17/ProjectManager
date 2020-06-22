import { User, Workpackage, Milestone } from '@models';

export interface LoginResponse {
  token: string;
  expiration: string;
  user: User;
}

export interface DefaultResponse {
  id: string;
}

export interface AddMemberToTeamResponse {
    
}

export interface ProjectPartResponse {
  projectPartID: string;
  name: string;
  position: number;
  workpackages: Workpackage[];
  milestones: Milestone[];
}