export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateUserRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birthdate: string;
}

export interface UpdateUserRequest {
  oldPassword: string;
  newPassword?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
}

export interface CreateProjectRequest {
  name: string;
  startDate: string;
  plannedEndDate: string;
  overallBudget: number;
}

export interface UpdateProjectRequest {
  name: string;
  plannedEndDate: string;
  overallBudget: number;
  realEndDateChange: {
    change: boolean;
    date: string;
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

export interface UpdateProjectPart {
  name?: string;
  position?: number;
}

export interface AddWorkPackage {
  name: string;
  description: string;
  plannedEndDate: string;
  realEndDate: string;
  startDate: string;
}

export interface UpdateWorkPackage {
  name?: string;
  reachDate?: string;
  description?: string
}

export interface CreateMileStone {
  reachDate: string;
  name: string;
  description: string;
}

export interface UpdateMileStone {
  reachDate?: string;
  name?: string;
  description?: string;
}
