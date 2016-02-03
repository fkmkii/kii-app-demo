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
        this.app.setTitle('カンファレンス');
    };
    return ConferenceListPage;
})();
var CompanyListPage = (function () {
    function CompanyListPage(app) {
        this.app = app;
    }
    CompanyListPage.prototype.onCreate = function () {
        var _this = this;
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
        this.ractive.on({
            companyClicked: function (e, company) {
                _this.showDetail(company);
            }
        });
        this.app.setDrawerEnabled(true);
        this.app.setTitle('企業');
    };
    CompanyListPage.prototype.showDetail = function (company) {
        app.navigate('/companies/' + company.id);
    };
    return CompanyListPage;
})();
var CompanyDetailPage = (function () {
    function CompanyDetailPage(app, id) {
        this.app = app;
        this.id = id;
    }
    CompanyDetailPage.prototype.onCreate = function () {
        var _this = this;
        var company = {
            'name': 'Kii',
            'url': 'htps://jp.kii.com',
            'thumbnail': 'https://jp.kii.com/common/images/Kii-logo.png',
            'desc': 'Sample description'
        };
        var memberList = [
            { 'name': 'fkm', 'organization': 'Mokelab', 'email': 'demo@mokelab.com' },
            { 'name': 'moke', 'organization': 'Mokelab', 'email': 'demo@mokelab.com' },
        ];
        this.ractive = new Ractive({
            el: '#container',
            template: '#CompanyDetailTemplate',
            data: {
                company: company,
                memberList: memberList
            }
        });
        this.ractive.on({
            memberClicked: function (e, member) {
                _this.showDetail(member);
            }
        });
        this.app.setDrawerEnabled(false);
        this.app.showBackButton();
    };
    CompanyDetailPage.prototype.showDetail = function (member) {
        app.navigate('/members/' + member.id);
    };
    return CompanyDetailPage;
})();
var MemberListPage = (function () {
    function MemberListPage(app) {
        this.app = app;
    }
    MemberListPage.prototype.onCreate = function () {
        var _this = this;
        var data = [
            { 'name': 'fkm', 'organization': 'Mokelab', 'email': 'demo@mokelab.com' },
            { 'name': 'moke', 'organization': 'Mokelab', 'email': 'demo@mokelab.com' },
        ];
        this.ractive = new Ractive({
            el: '#container',
            template: '#MemberListTemplate',
            data: {
                list: data
            }
        });
        this.ractive.on({
            memberClicked: function (e, member) {
                _this.showDetail(member);
            }
        });
        this.app.setDrawerEnabled(true);
        this.app.setTitle('メンバー');
    };
    MemberListPage.prototype.showDetail = function (member) {
        app.navigate('/members/' + member.id);
    };
    return MemberListPage;
})();
var MemberDetailPage = (function () {
    function MemberDetailPage(app, id) {
        this.app = app;
        this.id = id;
    }
    MemberDetailPage.prototype.onCreate = function () {
        var member = {
            'name': 'fkm',
            'organization': 'Mokelab',
            'email': 'demo@mokelab.com',
            'thumbnail': 'https://pbs.twimg.com/profile_images/693814056348585985/uB2GyQVW.png',
            'desc': 'Sample description'
        };
        this.ractive = new Ractive({
            el: '#container',
            template: '#MemberDetailTemplate',
            data: {
                member: member
            }
        });
        this.app.setDrawerEnabled(false);
        this.app.showBackButton();
    };
    return MemberDetailPage;
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
                navDrawerEnabled: true,
                showBackButton: false
            }
        });
        this.header.on({
            back: function () {
                window.history.back();
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
                    "fkm",
                    "カンファレンス",
                    "企業",
                    "メンバー",
                ],
                companyList: [
                    "Mokelab Inc",
                ],
                navDrawerEnabled: false
            }
        });
        this.drawer.on({
            menuClicked: function (e, index) {
                _this.closeDrawer();
                _this.showPage(index);
            }
        });
    };
    Application.prototype.closeDrawer = function () {
        document.querySelector('#menu-checkbox').checked = false;
    };
    Application.prototype.showPage = function (index) {
        switch (index) {
            case 0:
                this.navigate('/account/edit');
                break;
            case 1:
                this.navigate('/conferences');
                break;
            case 2:
                this.navigate('/companies');
                break;
            case 3:
                this.navigate('/members');
                break;
            case 4:
                this.navigate('/company/edit');
                break;
        }
    };
    Application.prototype.navigate = function (path) {
        this.router.navigate(path, { trigger: true });
    };
    Application.prototype.setDrawerEnabled = function (value) {
        this.header.set('navDrawerEnabled', value);
        if (value) {
            this.header.set('showBackButton', false);
        }
    };
    Application.prototype.showBackButton = function () {
        this.header.set('showBackButton', true);
        this.header.set('navDrawerEnabled', false);
    };
    Application.prototype.setTitle = function (value) {
        if (value == null) {
            value = 'Kii consortium';
        }
        this.header.set('title', value);
    };
    return Application;
})();
/// <reference path="./ractive.d.ts"/>
/// <reference path="./Page.ts"/>
/// <reference path="./TopPage.ts"/>
/// <reference path="./ConferenceListPage.ts"/>
/// <reference path="./CompanyListPage.ts"/>
/// <reference path="./CompanyDetailPage.ts"/>
/// <reference path="./MemberListPage.ts"/>
/// <reference path="./MemberDetailPage.ts"/>
/// <reference path="./Application.ts"/>
var app = new Application();
var AppRouter = Backbone.Router.extend({
    routes: {
        "": "top",
        "conferences": "conferences",
        "companies": "companies",
        "companies(/:id)": "companyDetail",
        "members": "members",
        "members(/:id)": "memberDetail"
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
    },
    companyDetail: function (id) {
        app.page = new CompanyDetailPage(app, id);
        app.page.onCreate();
    },
    members: function () {
        app.page = new MemberListPage(app);
        app.page.onCreate();
    },
    memberDetail: function (id) {
        app.page = new MemberDetailPage(app, id);
        app.page.onCreate();
    }
});
$(function () {
    app.start();
    app.router = new AppRouter();
    Backbone.history.start();
});
