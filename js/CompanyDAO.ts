///<reference path="./Company.ts"/>

interface CompanyDAO {
    getAll(callback : (e : any, list : Array<Company>) => void);
    getById(id : string, callback : (e : any, company : Company) => void);
    getMembers(company : Company, accountDAO : AccountDAO, callback : (e : any, company : Company) => void);
}