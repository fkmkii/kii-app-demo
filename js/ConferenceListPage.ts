class ConferenceListPage implements Page {
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
            {'title' : '第3回カンファレンス', 'desc':'概要3'},
            {'title' : '第2回カンファレンス', 'desc':'概要2'},
            {'title' : '第1回カンファレンス', 'desc':'概要1'},
        ];
        this.ractive = new Ractive({
            el : '#container',
            template : '#ConferenceListTemplate',
            data : {
                list : data
            }
        });
        this.app.setDrawerEnabled(true);
        this.app.setTitle('カンファレンス');
    }
}