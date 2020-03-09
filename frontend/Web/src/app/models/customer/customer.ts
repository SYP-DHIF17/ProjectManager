import { User } from '@models';
export interface Customer extends User {
  readonly customerId: string;
  company: string;
}
