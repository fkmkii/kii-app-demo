class MemberListPage implements Page {
    app : Application;
    ractive : Ractive;
    
    constructor(app : Application) {
        this.app = app;
    }
    
    onCreate() {
        var data = [
            {'name' : 'fkm', 'organization' : 'Mokelab', 'email' : 'demo@mokelab.com'},
            {'name' : 'moke', 'organization' : 'Mokelab', 'email' : 'demo@mokelab.com'},
        ];
        this.ractive = new Ractive({
            el : '#container',
            template : '#MemberListTemplate',
            data : {
                list : data
            }
        });
        this.app.setDrawerEnabled(true);
    }
}