class Application {
    router : any;
    page : Page;
    header : any;
    drawer : any;
    start() {
        this.header = new Ractive({
            el : '#header',
            template : '#headerTemplate',
            data : {
                title : 'Kii consortium',
                navDrawerEnabled : true,
            },
        });
        this.drawer = new Ractive({
            el : '#menu',
            template : '#drawerTemplate',
            data : {
                menuItems : [
                    "カンファレンス",
                    "企業",
                    "メンバー",
                    "設定",
                ],
                navDrawerEnabled : false
            }
        });
    }
   
    navigate(path : string) {
        this.router.navigate(path, {trigger: true});
    }

    setDrawerEnabled(value : boolean) {
        this.header.set('navDrawerEnabled', value);
    }
}