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
        this.initDrawer();
    }

    private initDrawer() {
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
        this.drawer.on({
            menuClicked : (e : any, index : number) => {
                this.closeDrawer();
                this.showPage(index);
            }
        });
    }

    private closeDrawer() {
        (<any>document.querySelector('#menu-checkbox')).checked = false;
    }

    private showPage(index : number) {
        switch (index) {
        case 0: // Conference
            this.navigate('/conferences');
            break;
        case 1: // Companies
            this.navigate('/companies');
            break;
        case 2: // Members
            this.navigate('/members');
            break;
        }
    }
   
    navigate(path : string) {
        this.router.navigate(path, {trigger: true});
    }

    setDrawerEnabled(value : boolean) {
        this.header.set('navDrawerEnabled', value);
    }
}