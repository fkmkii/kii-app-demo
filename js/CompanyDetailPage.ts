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
        this.ractive = new Ractive({
            el : '#container',
            template : '#CompanyDetailTemplate',
            data : {
                company : company,
            }
        });
        this.app.setDrawerEnabled(false);
        this.app.showBackButton();
    }
}