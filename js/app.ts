/// <reference path="./ractive.d.ts"/>
/// <reference path="./Page.ts"/>
/// <reference path="./TopPage.ts"/>
/// <reference path="./ConferenceListPage.ts"/>
/// <reference path="./CompanyListPage.ts"/>
/// <reference path="./MemberListPage.ts"/>
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
        "members" : "members",
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
    members : () => {
        app.page = new MemberListPage(app);
        app.page.onCreate();
    }
});

$(() => {
    app.start();
    app.router = new AppRouter();
    Backbone.history.start();
});