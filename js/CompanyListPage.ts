class CompanyListPage implements Page {
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
        this.ractive.on({
            companyClicked : (e : any, company : any) => {
                this.showDetail(company);
            }            
        });
        this.app.setDrawerEnabled(true);
        this.app.setTitle('企業');
    }

    private showDetail(company : any) {
        app.navigate('/companies/' + company.id);
    }
}