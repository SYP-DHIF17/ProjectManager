import { User } from './user';

export class LoggedInUser extends User {
    public token: string;

    constructor(id: string, firstname: string, lastname: string, email: string, password: string, isActive: boolean, joinedOn: Date, leftOn: Date, token: string){
        super(id, firstname, lastname, email, password, isActive, joinedOn, leftOn);
        this.token = token;
    }
}
