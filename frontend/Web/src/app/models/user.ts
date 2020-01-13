export class User {
    public readonly id: string;
    public firstname: string;
    public lastname: string;
    public email: string;
    public password: string;
    public isActive: boolean;
    public readonly joinedOn: Date;
    public readonly leftOn: Date;

    constructor(id: string, firstname: string, lastname: string, email: string, password: string, isActive: boolean, joinedOn: Date, leftOn: Date){
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.isActive = isActive;
        this.joinedOn = joinedOn;
        this.leftOn = leftOn;
    }
}