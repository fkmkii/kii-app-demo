/// <reference path="./ractive.d.ts"/>
/// <reference path="./Page.ts"/>
/// <reference path="./TopPage.ts"/>
/// <reference path="./ConferenceListPage.ts"/>
/// <reference path="./CompanyListPage.ts"/>
/// <reference path="./CompanyDetailPage.ts"/>
/// <reference path="./MemberListPage.ts"/>
/// <reference path="./MemberDetailPage.ts"/>
/// <reference path="./Application.ts"/>
declare var $;
declare var _;
declare var Backbone;

var app = new Application();

var AppRouter = Backbone.Router.extend({
    routes : {
        "" : "top",
        "conferences" : "conferences",
        "companies" : "companies",
        "companies(/:id)" : "companyDetail",
        "members" : "members",
        "members(/:id)" : "memberDetail",
    },
    top : () => {
        app.page = new TopPage(app);
        app.page.onCreate();
    },
    conferences : () => {
        app.page = new ConferenceListPage(app);
        app.page.onCreate();
    },
    companies : () => {
        app.page = new CompanyListPage(app);
        app.page.onCreate();
    },
    companyDetail : (id : string) => {
        app.page = new CompanyDetailPage(app, id);
        app.page.onCreate();
    },
    members : () => {
        app.page = new MemberListPage(app);
        app.page.onCreate();
    },
    memberDetail : (id : string) => {
        app.page = new MemberDetailPage(app, id);
        app.page.onCreate();
    }
});

$(() => {
    app.start();
    app.router = new AppRouter();
    Backbone.history.start();
});