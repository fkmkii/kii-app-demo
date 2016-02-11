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
            success : (o : KiiObject) => {
                account = this.toAccount(o);                
                // save access token
                localStorage.setItem('token', KiiUser.getCurrentUser().getAccessToken());
                callback(null, account);
            },
            failure : (o : KiiObject, error : string) => {
                callback(error, null);
            }
        });
    }

    getByIdList(idList : Array<string>, callback : (e : any, list : Array<Account>) => void) {
        var bucket = Kii.bucketWithName('account');
        var query = KiiQuery.queryWithClause(KiiClause.inClause('_id', <any[]>idList));
        var resultList : Array<Account> = [];

        var queryCallback = {
            success : (q : KiiQuery, result : Array<KiiObject>, next : KiiQuery) => {
                for (var i = 0 ; i < result.length ; ++i) {
                    var obj = result[i]
                    resultList.push(this.toAccount(obj));
                }
                callback(null, resultList);
            },
            failure : (b : KiiBucket, error : string) => {
                callback(error, null);
            }
        };
        bucket.executeQuery(query, queryCallback);        
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

    private toAccount(obj : KiiObject) : Account {
        var a = new Account();
        a.id = obj.getUUID();
        a.name = <string>obj.get('name');
        a.thumbnailUrl = <string>obj.get('thumbnail_url');
        return a;
    }
}