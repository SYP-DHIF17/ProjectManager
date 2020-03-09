import { User } from '@models';
export interface Employee extends User {
  readonly employeeId: string;
}
