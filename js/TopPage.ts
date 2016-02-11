///<reference path="./AccountDAO.ts"/>

class TopPage implements Page {
    app : Application;
    ractive : Ractive;
    accountDAO : AccountDAO;
    
    constructor(app : Application, accountDAO : AccountDAO) {
        this.app = app;
        this.accountDAO = accountDAO;
    }

    loginRequired() : boolean {
        return false;
    }
    
    onCreate() {
        this.ractive = new Ractive({
            el : '#container',
            template : '#TopTemplate',
        });
        this.ractive.on({
            'login' : () => {
                this.login();
            }
        });
        this.app.setDrawerEnabled(false);
    }

    private login() {
        var email = this.ractive.get('email');
        var password = this.ractive.get('password');
        this.accountDAO.login(email, password, (e : any, account : Account, companyList : Array<Company>) => {
            if (e != null) {
                alert(e);
                return;
            }
            this.app.setCurrentAccount(account, companyList);
            this.app.navigate('/conferences');
        });
    }
}