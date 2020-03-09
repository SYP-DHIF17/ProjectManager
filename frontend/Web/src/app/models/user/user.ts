export interface User {
  readonly userId: string;
  readonly createdOn: Date;
  readonly createdBy: string;
  firstname: string;
  lastname: string;
  email: string;
  isActive: boolean;
  readonly birthdate: Date;
  readonly leftOn: Date;
}
