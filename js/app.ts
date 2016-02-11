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
declare var $;
declare var _;
declare var Backbone;

var app = new Application();

var models : any = {};

var AppRouter = Backbone.Router.extend({
    routes : {
        "" : "top",
        "conferences" : "conferences",
        "companies" : "companies",
        "companies(/:id)" : "companyDetail",
        "members" : "members",
        "members(/:id)" : "memberDetail",
        "account/edit" : "editAccount",
    },
    top : function(){
        this.setPage(new TopPage(app, models.account));
    },
    conferences : function() {
        this.setPage(new ConferenceListPage(app));
    },
    companies : function() {
        this.setPage(new CompanyListPage(app));
    },
    companyDetail : function(id : string) {
        this.setPage(new CompanyDetailPage(app, id));
    },
    members : function() {
        this.setPage(new MemberListPage(app));
    },
    memberDetail : function(id : string) {
        this.setPage(new MemberDetailPage(app, id));
    },
    editAccount : function() {
        this.setPage(new EditAccountPage(app, models.account));
    },
    setPage : (page : Page) => {
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
        models.account.loginWithStoredToken((e : any, account : Account) => {
            if (e != null) {
                app.navigate('/');
                return;
            }
            app.setCurrentAccount(account);
            page.onCreate();
        });
    }
});

$(() => {
    models.account = new AccountDAOImpl();
    app.start();
    app.router = new AppRouter();
    Backbone.history.start();
});