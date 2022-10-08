import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

export default class User {
    private id: string = '';
    private username: string = '';
    private password: string = '';
    private firstName: string | null = null;
    private lastName: string | null = null;
    private email: string = '';
    private profilePhoto: string | null = null;
    private headerImage: string | null = null;
    private accountType: AccountType = AccountType.Personal;
    private maritalStatus: MaritalStatus = MaritalStatus.Single;
    private biograph: string | null = null;
    private dateOfBirth: Date = new Date();
    private location: Location | null = null;

    constructor (id: string, username: string, password: string, firstName: string, lastName: string, email: string){
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName; 
        this.lastName = lastName; 
        this.email = email;
    }
    get uName () {
        return this.username;
    }
    get pass () {
        return this.password;
    }
    get getUid(): string {
        return this.id;
    }
    set setUid(value: string) {
        this.id = value;
    }
    get fName() {
        return this.firstName;
    }
    get lName() {
        return this.lastName;
    }
    get getEmail() {
        return this.email;
    }
}
