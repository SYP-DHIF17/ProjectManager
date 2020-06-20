import { User } from '@models';

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