var TopPage = (function () {
    function TopPage(app) {
        this.app = app;
    }
    TopPage.prototype.onCreate = function () {
        var _this = this;
        this.ractive = new Ractive({
            el: '#container',
            template: '#TopTemplate'
        });
        this.ractive.on({
            'login': function () {
                _this.login();
            }
        });
        this.app.setDrawerEnabled(false);
    };
    TopPage.prototype.login = function () {
        this.app.navigate('/conferences');
    };
    return TopPage;
})();
var ConferenceListPage = (function () {
    function ConferenceListPage(app) {
        this.app = app;
    }
    ConferenceListPage.prototype.onCreate = function () {
        var data = [
            { 'title': '第3回カンファレンス', 'desc': '概要3' },
            { 'title': '第2回カンファレンス', 'desc': '概要2' },
            { 'title': '第1回カンファレンス', 'desc': '概要1' },
        ];
        this.ractive = new Ractive({
            el: '#container',
            template: '#ConferenceListTemplate',
            data: {
                list: data
            }
        });
        this.app.setDrawerEnabled(true);
    };
    return ConferenceListPage;
})();
var CompanyListPage = (function () {
    function CompanyListPage(app) {
        this.app = app;
    }
    CompanyListPage.prototype.onCreate = function () {
        var data = [
            { 'name': 'Kii', 'url': 'https://jp.kii.com/' },
            { 'name': 'Mokelab', 'url': 'http://mokelab.com' },
            { 'name': 'Company1', 'url': 'http://mokelab.com' },
            { 'name': 'Company2', 'url': 'http://mokelab.com' },
        ];
        this.ractive = new Ractive({
            el: '#container',
            template: '#CompanyListTemplate',
            data: {
                list: data
            }
        });
        this.app.setDrawerEnabled(true);
    };
    return CompanyListPage;
})();
var Application = (function () {
    function Application() {
    }
    Application.prototype.start = function () {
        this.header = new Ractive({
            el: '#header',
            template: '#headerTemplate',
            data: {
                title: 'Kii consortium',
                navDrawerEnabled: true
            }
        });
        this.initDrawer();
    };
    Application.prototype.initDrawer = function () {
        var _this = this;
        this.drawer = new Ractive({
            el: '#menu',
            template: '#drawerTemplate',
            data: {
                menuItems: [
                    "カンファレンス",
                    "企業",
                    "メンバー",
                    "設定",
                ],
                navDrawerEnabled: false
            }
        });
        this.drawer.on({
            menuClicked: function (e, index) {
                _this.showPage(index);
                _this.closeDrawer();
            }
        });
    };
    Application.prototype.closeDrawer = function () {
        document.querySelector('#menu-checkbox').checked = false;
    };
    Application.prototype.showPage = function (index) {
        switch (index) {
            case 0:
                this.navigate('/conferences');
                break;
            case 1:
                this.navigate('/companies');
                break;
        }
    };
    Application.prototype.navigate = function (path) {
        this.router.navigate(path, { trigger: true });
    };
    Application.prototype.setDrawerEnabled = function (value) {
        this.header.set('navDrawerEnabled', value);
    };
    return Application;
})();
/// <reference path="./ractive.d.ts"/>
/// <reference path="./Page.ts"/>
/// <reference path="./TopPage.ts"/>
/// <reference path="./ConferenceListPage.ts"/>
/// <reference path="./CompanyListPage.ts"/>
/// <reference path="./Application.ts"/>
var app = new Application();
var AppRouter = Backbone.Router.extend({
    routes: {
        "": "top",
        "conferences": "conferences",
        "companies": "companies"
    },
    top: function () {
        app.page = new TopPage(app);
        app.page.onCreate();
    },
    conferences: function () {
        app.page = new ConferenceListPage(app);
        app.page.onCreate();
    },
    companies: function () {
        app.page = new CompanyListPage(app);
        app.page.onCreate();
    }
});
$(function () {
    app.start();
    app.router = new AppRouter();
    Backbone.history.start();
});
