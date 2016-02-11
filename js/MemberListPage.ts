class MemberListPage implements Page {
    app : Application;
    ractive : Ractive;
    
    constructor(app : Application) {
        this.app = app;
    }

    loginRequired() : boolean {
        return false;
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
        this.ractive.on({
            memberClicked : (e : any, member : any) => {
                this.showDetail(member);
            }
        });
        this.app.setDrawerEnabled(true);
        this.app.setTitle('メンバー');
    }

    private showDetail(member : any) {
        app.navigate('/members/' + member.id);
    }
}