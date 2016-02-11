///<reference path="./Account.ts"/>
///<reference path="./kii-cloud.sdk.d.ts"/>

class Application {
    router : any;
    page : Page;
    header : any;
    drawer : any;
    currentAccount : Account;

    start() {
        // Kii initialization
        Kii.initializeWithSite("1461e491", "b4b10b319ce3cf6a8cd32ca957c2c2ae", KiiSite.JP);
        this.header = new Ractive({
            el : '#header',
            template : '#headerTemplate',
            data : {
                title : 'Kii consortium',
                navDrawerEnabled : true,
                showBackButton : false,
            },
        });
        this.header.on({
            back : () => {
                window.history.back();
            }
        });
        this.initDrawer();
    }

    private initDrawer() {
        this.drawer = new Ractive({
            el : '#menu',
            template : '#drawerTemplate',
            data : {
                menuItems : [
                    "fkm",
                    "カンファレンス",
                    "企業",
                    "メンバー",
                ],
                companyList : [
                    "Mokelab Inc",
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
        case 0: // Edit profile
            this.navigate('/account/edit');
            break;
        case 1: // Conference
            this.navigate('/conferences');
            break;
        case 2: // Companies
            this.navigate('/companies');
            break;
        case 3: // Members
            this.navigate('/members');
            break;
        case 4: // Edit company
            this.navigate('/company/edit');
            break;
        }
    }
   
    navigate(path : string) {
        this.router.navigate(path, {trigger: true});
    }

    setDrawerEnabled(value : boolean) {
        this.header.set('navDrawerEnabled', value);
        if (value) {
            this.header.set('showBackButton', false);
        }
    }

    showBackButton() {
        this.header.set('showBackButton', true);
        this.header.set('navDrawerEnabled', false);
    }

    setTitle(value : string) {
        if (value == null ) { value = 'Kii consortium'; }
        this.header.set('title', value);
    }

    setCurrentAccount(account : Account) {
        this.currentAccount = account;
        this.drawer.set('account', account);
        var itemList = this.drawer.get('menuItems');
        itemList[0] = account.name;
        this.drawer.set('menuItems', itemList);
    }
}