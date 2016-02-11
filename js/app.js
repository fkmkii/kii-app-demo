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
///<reference path="./Account.ts"/>
var Company = (function () {
    function Company() {
    }
    return Company;
})();
///<reference path="./Company.ts"/>
///<reference path="./CompanyDAO.ts"/>
var CompanyListPage = (function () {
    function CompanyListPage(app, companyDAO) {
        this.app = app;
        this.companyDAO = companyDAO;
    }
    CompanyListPage.prototype.loginRequired = function () {
        return true;
    };
    CompanyListPage.prototype.onCreate = function () {
        var _this = this;
        this.app.setDrawerEnabled(true);
        this.app.setTitle('企業');
        this.companyDAO.getAll(function (e, list) {
            if (e != null) {
                return;
            }
            _this.list = list;
            _this.onCreateView();
        });
    };
    CompanyListPage.prototype.onCreateView = function () {
        var _this = this;
        this.ractive = new Ractive({
            el: '#container',
            template: '#CompanyListTemplate',
            data: {
                list: this.list
            }
        });
        this.ractive.on({
            companyClicked: function (e, company) {
                _this.showDetail(company);
            }
        });
    };
    CompanyListPage.prototype.showDetail = function (company) {
        app.navigate('/companies/' + company.id);
    };
    return CompanyListPage;
})();
///<reference path="./AccountDAO.ts"/>
///<reference path="./CompanyDAO.ts"/>
var CompanyDetailPage = (function () {
    function CompanyDetailPage(app, accountDAO, companyDAO, id) {
        this.app = app;
        this.accountDAO = accountDAO;
        this.companyDAO = companyDAO;
        this.id = id;
    }
    CompanyDetailPage.prototype.loginRequired = function () {
        return true;
    };
    CompanyDetailPage.prototype.onCreate = function () {
        var _this = this;
        this.companyDAO.getById(this.id, function (e, company) {
            if (e != null) {
                window.history.back();
                return;
            }
            _this.company = company;
            _this.getMembers();
        });
    };
    CompanyDetailPage.prototype.getMembers = function () {
        var _this = this;
        if (this.company.members != null) {
            this.onCreateView();
            return;
        }
        this.companyDAO.getMembers(this.company, this.accountDAO, function (e, company) {
            if (e != null) {
                window.history.back();
                return;
            }
            _this.company = company;
            _this.onCreateView();
        });
    };
    CompanyDetailPage.prototype.onCreateView = function () {
        var _this = this;
        this.ractive = new Ractive({
            el: '#container',
            template: '#CompanyDetailTemplate',
            data: {
                company: this.company,
                memberList: this.company.members
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
        var _this = this;
        var uri = 'kiicloud://buckets/account/objects/' + account.id;
        var obj = KiiObject.objectWithURI(uri);
        obj.refresh({
            success: function (o) {
                account = _this.toAccount(o);
                // save access token
                localStorage.setItem('token', KiiUser.getCurrentUser().getAccessToken());
                callback(null, account);
            },
            failure: function (o, error) {
                callback(error, null);
            }
        });
    };
    AccountDAOImpl.prototype.getByIdList = function (idList, callback) {
        var _this = this;
        var bucket = Kii.bucketWithName('account');
        var query = KiiQuery.queryWithClause(KiiClause.inClause('_id', idList));
        var resultList = [];
        var queryCallback = {
            success: function (q, result, next) {
                for (var i = 0; i < result.length; ++i) {
                    var obj = result[i];
                    resultList.push(_this.toAccount(obj));
                }
                callback(null, resultList);
            },
            failure: function (b, error) {
                callback(error, null);
            }
        };
        bucket.executeQuery(query, queryCallback);
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
    AccountDAOImpl.prototype.toAccount = function (obj) {
        var a = new Account();
        a.id = obj.getUUID();
        a.name = obj.get('name');
        a.thumbnailUrl = obj.get('thumbnail_url');
        return a;
    };
    return AccountDAOImpl;
})();
///<reference path="./CompanyDAO.ts"/>
///<reference path="./kii-cloud.sdk.d.ts"/>
var CompanyDAOImpl = (function () {
    function CompanyDAOImpl() {
    }
    CompanyDAOImpl.prototype.getAll = function (callback) {
        var _this = this;
        if (this.cache != null) {
            callback(null, this.toArray());
            return;
        }
        var bucket = Kii.bucketWithName('company');
        var query = new KiiQuery();
        var resultList = [];
        var queryCallback = {
            success: function (q, result, next) {
                if (_this.cache == null) {
                    _this.cache = {};
                }
                for (var i = 0; i < result.length; ++i) {
                    var obj = result[i];
                    _this.cache[obj.getUUID()] = _this.toCompany(obj);
                }
                callback(null, _this.toArray());
            },
            failure: function (b, error) {
                callback(error, null);
            }
        };
        bucket.executeQuery(query, queryCallback);
    };
    CompanyDAOImpl.prototype.getById = function (id, callback) {
        var _this = this;
        if (this.cache != null) {
            var c = this.cache[id];
            if (c != null) {
                callback(null, c);
            }
        }
        var uri = 'kiicloud://buckets/company/objects/' + id;
        var obj = KiiObject.objectWithURI(uri);
        obj.refresh({
            success: function (o) {
                var company = _this.toCompany(o);
                _this.addToCache(company);
                callback(null, company);
            },
            failure: function (o, error) {
                callback(error, null);
            }
        });
    };
    CompanyDAOImpl.prototype.getMembers = function (company, accountDAO, callback) {
        var _this = this;
        var group = KiiGroup.groupWithID(company.id);
        group.getMemberList({
            success: function (g, list) {
                _this.refreshMembers(company, accountDAO, list, callback);
            },
            failure: function (g, error) {
                callback(error, null);
            }
        });
    };
    CompanyDAOImpl.prototype.refreshMembers = function (company, accountDAO, list, callback) {
        var idList = [];
        for (var i = 0; i < list.length; ++i) {
            idList.push(list[i].getUUID());
        }
        if (idList.length == 0) {
            company.members = [];
            callback(null, company);
            return;
        }
        accountDAO.getByIdList(idList, function (e, accountList) {
            if (e != null) {
                callback(e, null);
                return;
            }
            company.members = accountList;
            callback(null, company);
        });
    };
    CompanyDAOImpl.prototype.toCompany = function (obj) {
        var c = new Company();
        c.id = obj.getUUID();
        c.name = obj.get('name');
        c.url = obj.get('url');
        c.thumbnail = obj.get('thumbnailUrl');
        c.description = obj.get('desc');
        return c;
    };
    CompanyDAOImpl.prototype.toArray = function () {
        var list = [];
        for (var key in this.cache) {
            list.push(this.cache[key]);
        }
        return list;
    };
    CompanyDAOImpl.prototype.addToCache = function (c) {
        if (this.cache == null) {
            this.cache = {};
        }
        this.cache[c.id] = c;
    };
    return CompanyDAOImpl;
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
/// <reference path="./CompanyDAOImpl.ts"/>
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
        this.setPage(new CompanyListPage(app, models.company));
    },
    companyDetail: function (id) {
        this.setPage(new CompanyDetailPage(app, models.account, models.company, id));
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
    models.company = new CompanyDAOImpl();
    app.start();
    app.router = new AppRouter();
    Backbone.history.start();
});
