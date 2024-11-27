export class User {
    id: number;
    fullName: string;
    email: string;
    password: string;
    phone: string;
    role: string; 
    gender:string;
    age:number;// Assuming Role is a string; you can adjust based on your needs

    constructor(id: number, name: string, email: string, password: string, phone: string, role: string,gender:string,age:number) {
        this.id = id;
        this.fullName = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.role = role;
        this.gender=gender;
        this.age=age
    }
}
