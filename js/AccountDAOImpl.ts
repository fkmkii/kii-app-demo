///<reference path="./AccountDAO.ts"/>
///<reference path="./kii-cloud.sdk.d.ts"/>

class AccountDAOImpl implements AccountDAO {
    login(email : string, password : string, callback : (e : any, user : any) => void) {
        KiiUser.authenticate(email, password, {
            success : (user : KiiUser) => {
                var account = new Account();
                account.id = user.getUUID();
                this.getCurrentAccount(account, callback);
            },
            failure : (user : KiiUser, error : string) => {
                callback(error, user);
            }
        });
    }

    loginWithStoredToken(callback : (e : any, account : Account) => void) {
        var token = localStorage.getItem('token');
        if (token == null) {
            callback('stored token not found', null);
            return;
        }
        KiiUser.authenticateWithToken(token, {
            success : (user : KiiUser) => {
                var account = new Account();
                account.id = user.getUUID();
                this.getCurrentAccount(account, callback);                
            },
            failure : (user : KiiUser, error : string) => {
                callback(error, null);
            }
        });
    }

    private getCurrentAccount(account : Account, callback : (e : any, user : any) => void) {
        var uri = 'kiicloud://buckets/account/objects/' + account.id;
        var obj = KiiObject.objectWithURI(uri);
        obj.refresh({
            success : (accountObj : KiiObject) => {
                account.name = <string>accountObj.get('name');
                account.thumbnailUrl = <string>accountObj.get('thumbnail_url');
                
                // save access token
                localStorage.setItem('token', KiiUser.getCurrentUser().getAccessToken());
                callback(null, account);
            },
            failure : (o : KiiObject, error : string) => {
                callback(error, null);
            }
        });
    }

    update(account : Account, name : string, thumbnail : string,
           description : string, callback : (e : any, account : Account) => void) {
        var uri = 'kiicloud://buckets/account/objects/' + account.id;
        var obj = KiiObject.objectWithURI(uri);
        obj.set('name', name);
        obj.set('thumbnail_url', thumbnail);
        obj.set('desc', description);
        obj.save({
            success : (o : KiiObject) => {
                account.name = name;
                account.thumbnailUrl = thumbnail;
                account.description = description;
                callback(null, account);
            },
            failure : (o : KiiObject, error : string) => {
                callback(error, account);
            }
        }, true);
    }
}