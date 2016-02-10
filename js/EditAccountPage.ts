class EditAccountPage implements Page {
    app : Application;
    ractive : Ractive;
    
    constructor(app : Application) {
        this.app = app;
    }
    
    onCreate() {
        var member = {
            'name' : 'fkm', 
            'organization' : 'Mokelab',
            'email' : 'demo@mokelab.com',
            'thumbnail' : 'https://pbs.twimg.com/profile_images/693814056348585985/uB2GyQVW.png',
            'desc' : 'Sample description',
        };
        this.ractive = new Ractive({
            el : '#container',
            template : '#EditAccountTemplate',
            data : {
                member : member,
            }
        });
        this.app.setDrawerEnabled(false);
        this.app.showBackButton();
    }
}