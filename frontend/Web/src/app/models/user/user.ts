export interface User {
  readonly userId: string;
  readonly createdBy: string;
  firstname: string;
  lastname: string;
  email: string;
  isActive: boolean;
  readonly birthdate: Date;
  readonly leftOn: Date;
}
