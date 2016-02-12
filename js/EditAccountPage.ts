class EditAccountPage implements Page {
    app : Application;
    ractive : Ractive;
    accountDAO : AccountDAO;
    
    constructor(app : Application, accountDAO : AccountDAO) {
        this.app = app;
        this.accountDAO = accountDAO;
    }

    loginRequired() : boolean {
        return true;
    }
    
    onCreate() {
        var account = this.app.currentAccount;
        this.ractive = new Ractive({
            el : '#container',
            template : '#EditAccountTemplate',
            data : {
                name : account.name,
                organization : account.organization,
                thumbnailUrl : account.thumbnailUrl,
                description : account.description,
            }
        });
        this.ractive.on({
            updateBasic : () => {
                this.updateBasic();
            },
        });
        this.app.setDrawerEnabled(false);
        this.app.showBackButton();
    }

    private updateBasic() {
        var r = this.ractive;
        var name = r.get('name');
        var organization = r.get('organization');
        var thumbnail = r.get('thumbnailUrl');
        var desc = r.get('description');
        this.accountDAO.update(this.app.currentAccount, name, organization, thumbnail, desc, (e : any, account : Account) => {
            if (e != null) {
                this.app.addSnack(e);
                return;
            }
            this.app.currentAccount = account;
            this.app.addSnack('Done!');
        });
    }
}