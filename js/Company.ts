///<reference path="./Account.ts"/>

class Company {
    id : string;
    name : string;
    url : string;
    thumbnail : string;
    description : string;

    members : Array<Account>;
}