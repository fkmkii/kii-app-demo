class CompanyListPage implements Page {
    app : Application;
    ractive : Ractive;
    
    constructor(app : Application) {
        this.app = app;
    }
    
    onCreate() {
        var data = [
            {'name' : 'Kii', 'url' : 'https://jp.kii.com/'},
            {'name' : 'Mokelab', 'url' : 'http://mokelab.com'},
            {'name' : 'Company1', 'url' : 'http://mokelab.com'},
            {'name' : 'Company2', 'url' : 'http://mokelab.com'},
        ];
        this.ractive = new Ractive({
            el : '#container',
            template : '#CompanyListTemplate',
            data : {
                list : data
            }
        });
        this.app.setDrawerEnabled(true);
        this.app.setTitle('企業');
    }
}