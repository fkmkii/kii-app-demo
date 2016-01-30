class TopPage implements Page {
    app : Application;
    ractive : Ractive;
    
    constructor(app : Application) {
        this.app = app;
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
        this.app.navigate('/conferences');
    }
}