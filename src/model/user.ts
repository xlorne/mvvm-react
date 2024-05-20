export class User{
    id: number;
    name: string;
    age: number;
    address: string;

    constructor(id: number|null, name: string, age: number, address: string){
        this.id = id?id:this.generateId()
        this.name = name;
        this.age = age;
        this.address = address;
    }

    private generateId(): number{
        return Math.floor(Math.random() * 1000);
    }

    static fromJson(json: any): User{
        return new User(json.id, json.name, json.age, json.address);
    }

    update(user: User){
        this.name = user.name;
        this.age = user.age;
        this.address = user.address;
    }

}
