export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateUserRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birthdate: Date;
}

export interface ChangeUserRequest {
  oldPassword: string;
  newPassword?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
}

export interface CreateProjectRequest {
  name: string;
  startDate: Date;
  plannedEndDate: Date;
  overallBudget: number;
}

export interface ChangeProjectRequest {
  name: string;
  plannedEndDate: Date;
  overallBudget: number;
  realEndDateChange: {
    change: boolean;
    date: Date;
  }
}

export interface CreateTeamRequest {
  name: string;
}

export interface UpdateTeamRequest {
  name?: string;
}

export interface AddTeamMemberRequest {
  user: string;
}

export interface AddProjectPart {
  name: string;
  position: number;
}

export interface ChangeProjectPart {
  name?: string;
  position?: number;
}

export interface AddWorkPackage {
  name: string;
  description: string;
  plannedEndDate: Date;
  realEndDate: Date;
  startDate: Date;
}

export interface ChangeWorkPackage {
  name?: string;
  reachDate?: Date;
  description?: string
}
