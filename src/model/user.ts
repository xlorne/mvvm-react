export class User{
    id: number;
    name: string;
    age: number;
    address: string;

    constructor(id: number, name: string, age: number, address: string){
        this.id = id;
        this.name = name;
        this.age = age;
        this.address = address;
    }

    static fromJson(json: any): User{
        return new User(json.id, json.name, json.age, json.address);
    }

    setId(id: number){
        this.id = id;
    }

    update(user: User){
        this.name = user.name;
        this.age = user.age;
        this.address = user.address;
    }

}
