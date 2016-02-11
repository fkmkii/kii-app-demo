var Account = (function () {
    function Account() {
    }
    return Account;
})();
///<reference path="./Account.ts"/>
///<reference path="./AccountDAO.ts"/>
var TopPage = (function () {
    function TopPage(app, accountDAO) {
        this.app = app;
        this.accountDAO = accountDAO;
    }
    TopPage.prototype.loginRequired = function () {
        return false;
    };
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
        var _this = this;
        var email = this.ractive.get('email');
        var password = this.ractive.get('password');
        this.accountDAO.login(email, password, function (e, account) {
            if (e != null) {
                alert(e);
                return;
            }
            _this.app.setCurrentAccount(account);
            _this.app.navigate('/conferences');
        });
    };
    return TopPage;
})();
var ConferenceListPage = (function () {
    function ConferenceListPage(app) {
        this.app = app;
    }
    ConferenceListPage.prototype.loginRequired = function () {
        return false;
    };
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
    CompanyListPage.prototype.loginRequired = function () {
        return false;
    };
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
    CompanyDetailPage.prototype.loginRequired = function () {
        return false;
    };
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
    MemberListPage.prototype.loginRequired = function () {
        return false;
    };
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
    MemberDetailPage.prototype.loginRequired = function () {
        return false;
    };
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
var EditAccountPage = (function () {
    function EditAccountPage(app, accountDAO) {
        this.app = app;
        this.accountDAO = accountDAO;
    }
    EditAccountPage.prototype.loginRequired = function () {
        return true;
    };
    EditAccountPage.prototype.onCreate = function () {
        var _this = this;
        var account = this.app.currentAccount;
        this.ractive = new Ractive({
            el: '#container',
            template: '#EditAccountTemplate',
            data: {
                name: account.name,
                thumbnailUrl: account.thumbnailUrl,
                description: account.description
            }
        });
        this.ractive.on({
            updateBasic: function () {
                _this.updateBasic();
            }
        });
        this.app.setDrawerEnabled(false);
        this.app.showBackButton();
    };
    EditAccountPage.prototype.updateBasic = function () {
        var _this = this;
        var r = this.ractive;
        var name = r.get('name');
        var thumbnail = r.get('thumbnailUrl');
        var desc = r.get('description');
        this.accountDAO.update(this.app.currentAccount, name, thumbnail, desc, function (e, account) {
            if (e != null) {
                alert(e);
                return;
            }
            _this.app.currentAccount = account;
        });
    };
    return EditAccountPage;
})();
///<reference path="./AccountDAO.ts"/>
///<reference path="./kii-cloud.sdk.d.ts"/>
var AccountDAOImpl = (function () {
    function AccountDAOImpl() {
    }
    AccountDAOImpl.prototype.login = function (email, password, callback) {
        var _this = this;
        KiiUser.authenticate(email, password, {
            success: function (user) {
                var account = new Account();
                account.id = user.getUUID();
                _this.getCurrentAccount(account, callback);
            },
            failure: function (user, error) {
                callback(error, user);
            }
        });
    };
    AccountDAOImpl.prototype.loginWithStoredToken = function (callback) {
        var _this = this;
        var token = localStorage.getItem('token');
        if (token == null) {
            callback('stored token not found', null);
            return;
        }
        KiiUser.authenticateWithToken(token, {
            success: function (user) {
                var account = new Account();
                account.id = user.getUUID();
                _this.getCurrentAccount(account, callback);
            },
            failure: function (user, error) {
                callback(error, null);
            }
        });
    };
    AccountDAOImpl.prototype.getCurrentAccount = function (account, callback) {
        var uri = 'kiicloud://buckets/account/objects/' + account.id;
        var obj = KiiObject.objectWithURI(uri);
        obj.refresh({
            success: function (accountObj) {
                account.name = accountObj.get('name');
                account.thumbnailUrl = accountObj.get('thumbnail_url');
                // save access token
                localStorage.setItem('token', KiiUser.getCurrentUser().getAccessToken());
                callback(null, account);
            },
            failure: function (o, error) {
                callback(error, null);
            }
        });
    };
    AccountDAOImpl.prototype.update = function (account, name, thumbnail, description, callback) {
        var uri = 'kiicloud://buckets/account/objects/' + account.id;
        var obj = KiiObject.objectWithURI(uri);
        obj.set('name', name);
        obj.set('thumbnail_url', thumbnail);
        obj.set('desc', description);
        obj.save({
            success: function (o) {
                account.name = name;
                account.thumbnailUrl = thumbnail;
                account.description = description;
                callback(null, account);
            },
            failure: function (o, error) {
                callback(error, account);
            }
        }, true);
    };
    return AccountDAOImpl;
})();
///<reference path="./Account.ts"/>
///<reference path="./kii-cloud.sdk.d.ts"/>
var Application = (function () {
    function Application() {
    }
    Application.prototype.start = function () {
        // Kii initialization
        Kii.initializeWithSite("1461e491", "b4b10b319ce3cf6a8cd32ca957c2c2ae", KiiSite.JP);
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
    Application.prototype.setCurrentAccount = function (account) {
        this.currentAccount = account;
        this.drawer.set('account', account);
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
/// <reference path="./EditAccountPage.ts"/>
/// <reference path="./AccountDAOImpl.ts"/>
/// <reference path="./Application.ts"/>
var app = new Application();
var models = {};
var AppRouter = Backbone.Router.extend({
    routes: {
        "": "top",
        "conferences": "conferences",
        "companies": "companies",
        "companies(/:id)": "companyDetail",
        "members": "members",
        "members(/:id)": "memberDetail",
        "account/edit": "editAccount"
    },
    top: function () {
        this.setPage(new TopPage(app, models.account));
    },
    conferences: function () {
        this.setPage(new ConferenceListPage(app));
    },
    companies: function () {
        this.setPage(new CompanyListPage(app));
    },
    companyDetail: function (id) {
        this.setPage(new CompanyDetailPage(app, id));
    },
    members: function () {
        this.setPage(new MemberListPage(app));
    },
    memberDetail: function (id) {
        this.setPage(new MemberDetailPage(app, id));
    },
    editAccount: function () {
        this.setPage(new EditAccountPage(app, models.account));
    },
    setPage: function (page) {
        app.page = page;
        if (!page.loginRequired()) {
            page.onCreate();
            return;
        }
        if (app.currentAccount != null) {
            page.onCreate();
            return;
        }
        // login with token
        models.account.loginWithStoredToken(function (e, account) {
            if (e != null) {
                app.navigate('/');
                return;
            }
            app.setCurrentAccount(account);
            page.onCreate();
        });
    }
});
$(function () {
    models.account = new AccountDAOImpl();
    app.start();
    app.router = new AppRouter();
    Backbone.history.start();
});
