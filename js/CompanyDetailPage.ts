class CompanyDetailPage implements Page {
    app : Application;
    id : string;
    ractive : Ractive;
    
    constructor(app : Application, id : string) {
        this.app = app;
        this.id = id;
    }
    
    onCreate() {
        var company = {
            'name' : 'Kii', 
            'url' : 'htps://jp.kii.com',
            'thumbnail' : 'https://jp.kii.com/common/images/Kii-logo.png',
            'desc' : 'Sample description',
        };
        var memberList = [
            {'name' : 'fkm', 'organization' : 'Mokelab', 'email' : 'demo@mokelab.com'},
            {'name' : 'moke', 'organization' : 'Mokelab', 'email' : 'demo@mokelab.com'},
        ];        
        this.ractive = new Ractive({
            el : '#container',
            template : '#CompanyDetailTemplate',
            data : {
                company : company,
                memberList : memberList,
            }
        });
        this.ractive.on({
            memberClicked : (e : any, member : any) => {
                this.showDetail(member);
            }
        });
        this.app.setDrawerEnabled(false);
        this.app.showBackButton();
    }
    private showDetail(member : any) {
        app.navigate('/members/' + member.id);
    }
}