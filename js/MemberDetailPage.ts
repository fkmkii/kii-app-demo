class MemberDetailPage implements Page {
    app : Application;
    id : string;
    ractive : Ractive;
    
    constructor(app : Application, id : string) {
        this.app = app;
        this.id = id;
    }

    loginRequired() : boolean {
        return false;
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
            template : '#MemberDetailTemplate',
            data : {
                member : member,
            }
        });
        this.app.setDrawerEnabled(false);
        this.app.showBackButton();
    }
}