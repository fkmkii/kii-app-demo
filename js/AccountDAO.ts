///<reference path="./Account.ts"/>

interface AccountDAO {
    login(email : string, password : string, callback : (e : any, account : Account) => void);
    loginWithStoredToken(callback : (e : any, account : Account) => void);
    getByIdList(idList : Array<string>, callback : (e : any, list : Array<Account>) => void);
    update(account : Account, name : string, thumbnail : string,
           description : string, callback : (e : any, account : Account) => void);
}