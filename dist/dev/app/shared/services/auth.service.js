"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/do');
var myGlobals = require('../../globals');
var Subject_1 = require('rxjs/Subject');
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.profileImageChangeSource = new Subject_1.Subject();
        this.profileImageChanged$ = this.profileImageChangeSource.asObservable();
        this.publicViewfooChangeSource = new Subject_1.Subject();
        this.publicViewfooChanged$ = this.publicViewfooChangeSource.asObservable();
    }
    AuthService.prototype.login = function (username, password) {
        var body = JSON.stringify({
            email: username,
            password: password
        });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/auth/login", body, options)
            .map(function (res) {
            var body = res.json();
            console.log(body.success);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.register = function (register) {
        var body = JSON.stringify(register);
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/signup/register", body, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.forgotpassword = function (forgotEmail) {
        var body = JSON.stringify({
            email: forgotEmail
        });
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/signup/forgotpassword", body, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.useractivation = function (activelink) {
        var link = activelink;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/signup/useractivation/" + link, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.profilebase64 = function (filename, id) {
        var body = JSON.stringify({
            id: id,
            file: filename
        });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobals.imageUrl + "/profile/editprofilebase64", body, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.emitProfileChange = function () {
        this.profileImageChangeSource.next("");
    };
    AuthService.prototype.viewprofile = function (id) {
        var body = JSON.stringify({
            id: id
        });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/profile/viewprofile", body, options)
            .map(function (res) {
            var body = res.json();
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.coverbase64 = function (viewfooid, filename, id) {
        var body = JSON.stringify({
            id: viewfooid,
            coverimage: filename,
            userid: id
        });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(myGlobals.imageUrl + "/coverimage/viewfoo", body, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.editprofile = function (profiledata) {
        var body = JSON.stringify(profiledata);
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/profile/editprofile", body, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.billing = function (billingdata) {
        var billdetail = {
            "firstname": billingdata.firstname, "lastname": billingdata.lastname,
            "email": billingdata.email, "businessname": billingdata.businessname, "address": billingdata.address,
            "app": billingdata.app, "city": billingdata.city, "state": billingdata.state, "zipcode": billingdata.zipcode, "country": billingdata.country
        };
        console.log(billdetail);
        var card = {
            "cardtoken": billingdata.cardtoken, "userid": billingdata.userid,
            "paymenttype": billingdata.paymenttype, "paymentgatway": billingdata.paymentgatway, "cardnumber": billingdata.cardnumber,
            "cardtype": billingdata.cardtype
        };
        console.log(card);
        var body = JSON.stringify({ 'card': card, 'billdetail': billdetail });
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/billing/billing", body, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.tellafriend = function (friendEmail, id) {
        var body = JSON.stringify({
            email: friendEmail, id: id
        });
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/billing/invitefriend", body, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.validatepromocode = function (code, id) {
        var body = JSON.stringify({
            promocode: code, id: id
        });
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/billing/validatepromocode", body, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.chksubdomain = function (subdomain) {
        var body = JSON.stringify({
            subdomain: subdomain
        });
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/signup/validatesubdomain", body, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.viewfoocreate = function (containertype, id) {
        var body = JSON.stringify({
            containertype: containertype,
            userid: id
        });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/viewfoo", body, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.viewfoodelete = function (id) {
        var id;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete(myGlobals.serviceUrl + "/viewfoo/" + id, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.viewfooDetail = function (viewfooid) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/viewfoo/" + viewfooid, options)
            .map(function (res) {
            var body = res.json();
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.containerCreate = function (containertype, viewfooid, userid) {
        var body = JSON.stringify({
            viewfooid: viewfooid,
            userid: userid,
            containertype: containertype
        });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/container", body, options)
            .map(function (res) {
            var body = res.json();
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.containerUpdate = function (containerupdateDict, containerid) {
        var body = JSON.stringify(containerupdateDict);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(myGlobals.serviceUrl + "/container", body, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.addfolder = function (id, foldername, foldertype, parentfolderid) {
        var body = JSON.stringify({
            foldername: foldername,
            userid: id,
            foldertype: foldertype,
            parentid: parentfolderid
        });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/folder", body, options)
            .map(function (res) {
            var body = res.json();
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.viewfooupdate = function (viewfooid, val, settingtype) {
        if (settingtype == "allowsharing") {
            var body = JSON.stringify({
                id: viewfooid,
                allowsharing: val
            });
        }
        else if (settingtype == "allowcomment") {
            var body = JSON.stringify({
                id: viewfooid,
                allowcomment: val
            });
        }
        else if (settingtype == "allowselection") {
            var body = JSON.stringify({
                id: viewfooid,
                allowselection: val
            });
        }
        else if (settingtype == "imagesize") {
            var body = JSON.stringify({
                id: viewfooid,
                imagesize: val
            });
        }
        else if (settingtype == "imagedatamousehover") {
            var body = JSON.stringify({
                id: viewfooid,
                imagedatamousehover: val
            });
        }
        else if (settingtype == "imageinfoframe") {
            var body = JSON.stringify({
                id: viewfooid,
                imageinfoframe: val
            });
        }
        else if (settingtype == "applywatermark") {
            var body = JSON.stringify({
                id: viewfooid,
                applywatermark: val
            });
        }
        else if (settingtype == "imagedefaultno") {
            var body = JSON.stringify({
                id: viewfooid,
                imagedefaultno: val
            });
        }
        else if (settingtype == "backgroundcolor") {
            var body = JSON.stringify({
                id: viewfooid,
                backgroundcolor: val
            });
        }
        else if (settingtype == "menufontcolor") {
            var body = JSON.stringify({
                id: viewfooid,
                menufontcolor: val
            });
        }
        else if (settingtype == "menubackgroundcolor") {
            var body = JSON.stringify({
                id: viewfooid,
                menubackgroundcolor: val
            });
        }
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(myGlobals.serviceUrl + "/viewfoo", body, options)
            .map(function (res) {
            var body = res.json();
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.publishviewfooupdate = function (viewfooid, vftitle, vftags, folderid, viewfootype) {
        var body = JSON.stringify({
            id: viewfooid,
            viewfootitle: vftitle,
            tags: vftags,
            folderid: folderid,
            viewfootype: viewfootype
        });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(myGlobals.serviceUrl + "/viewfoo", body, options)
            .map(function (res) {
            var body = res.json();
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.usersetting = function (userid, val, settingtype) {
        if (settingtype == "menustyle") {
            var body = JSON.stringify({
                userid: userid,
                navposition: val
            });
        }
        else if (settingtype == "viewfoostyle") {
            var body = JSON.stringify({
                userid: userid,
                viewfoodisplay: val
            });
        }
        else if (settingtype == "viewfoooption") {
            var body = JSON.stringify({
                userid: userid,
                viewfoooption: val
            });
        }
        else if (settingtype == "allowsharing") {
            var body = JSON.stringify({
                userid: userid,
                allowsharing: val
            });
        }
        else if (settingtype == "allowcomment") {
            var body = JSON.stringify({
                userid: userid,
                allowcomment: val
            });
        }
        else if (settingtype == "allowselection") {
            var body = JSON.stringify({
                userid: userid,
                allowselection: val
            });
        }
        else if (settingtype == "disablerightmousebtn") {
            var body = JSON.stringify({
                userid: userid,
                disablerightmousebtn: val
            });
        }
        else if (settingtype == "sharingfileinfo") {
            var body = JSON.stringify({
                userid: userid,
                sharingfileinfo: val
            });
        }
        else if (settingtype == "addlogoname") {
            var body = JSON.stringify({
                userid: userid,
                logotext: val,
                islogo: 'text'
            });
        }
        else if (settingtype == "logoimage") {
            var body = JSON.stringify({
                userid: userid,
                logoimage: val,
                islogo: 'image'
            });
        }
        else if (settingtype == "facebook") {
            var body = JSON.stringify({
                userid: userid,
                facebook: val
            });
        }
        else if (settingtype == "twitter") {
            var body = JSON.stringify({
                userid: userid,
                twitter: val
            });
        }
        else if (settingtype == "googleplus") {
            var body = JSON.stringify({
                userid: userid,
                googleplus: val
            });
        }
        else if (settingtype == "instagram") {
            var body = JSON.stringify({
                userid: userid,
                instagram: val
            });
        }
        else if (settingtype == "pinterest") {
            var body = JSON.stringify({
                userid: userid,
                pinterest: val
            });
        }
        else if (settingtype == "wordpress") {
            var body = JSON.stringify({
                userid: userid,
                wordpress: val
            });
        }
        else if (settingtype == "youtube") {
            var body = JSON.stringify({
                userid: userid,
                youtube: val
            });
        }
        else if (settingtype == "viber") {
            var body = JSON.stringify({
                userid: userid,
                viber: val
            });
        }
        else if (settingtype == "linkdin") {
            var body = JSON.stringify({
                userid: userid,
                linkdin: val
            });
        }
        else if (settingtype == "behance") {
            var body = JSON.stringify({
                userid: userid,
                behance: val
            });
        }
        else if (settingtype == "tumbler") {
            var body = JSON.stringify({
                userid: userid,
                tumbler: val
            });
        }
        else if (settingtype == "dropbox") {
            var body = JSON.stringify({
                userid: userid,
                dropbox: val
            });
        }
        else if (settingtype == "addfooter") {
            var body = JSON.stringify({
                userid: userid,
                footertext: val
            });
        }
        else if (settingtype == "menucolor") {
            var body = JSON.stringify({
                userid: userid,
                menucolor: val
            });
        }
        else if (settingtype == "fontcolor") {
            var body = JSON.stringify({
                userid: userid,
                fontcolor: val
            });
        }
        else if (settingtype == "mobilenumber") {
            var body = JSON.stringify({
                userid: userid,
                mobilenumber: val
            });
        }
        else if (settingtype == "officenumber") {
            var body = JSON.stringify({
                userid: userid,
                officenumber: val
            });
        }
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/setting/usersetting", body, options)
            .map(function (res) {
            var body = res.json();
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.containerDelete = function (containerid) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete(myGlobals.serviceUrl + "/container/" + containerid, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.containerImageDelete = function (containerimageid) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete(myGlobals.serviceUrl + "/containerimage/" + containerimageid, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.cancelsubscription = function (userid) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete(myGlobals.serviceUrl + "/billing/cancelsubscription/" + userid, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.viewfoolist = function (id) {
        var id = id;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/viewfoo/list/" + id, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.allviewfoolist = function (viewfootype, id, perpage, pageno) {
        var id = id;
        var perpage = perpage;
        var pageno = pageno;
        console.log(perpage);
        console.log(pageno);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = myGlobals.serviceUrl + "/viewfoo/alllist/"
            + id + "/" + perpage + "/" + pageno + "/" + viewfootype;
        return this.http.get(url, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.folderlist = function (id) {
        var id = id;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/folder/" + id, options)
            .map(function (res) {
            var body = res.json();
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.subfolderlist = function (id) {
        var id = id;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/sub/folder/" + id, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.griditemoption = function (gridoptions) {
        var body = JSON.stringify(gridoptions);
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/container/griditemoption", body, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.getusersetting = function (id) {
        var id = id;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/setting/hompage/" + id, options)
            .map(function (res) {
            var body = res.json();
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.sendMail = function (emailAddresses, mailbody, id) {
        var body = JSON.stringify({
            friendemail: emailAddresses,
            message: mailbody,
            userid: id
        });
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post("http://192.168.0.183:1337/friendlist", body, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.publicfolderlist = function (subdomain) {
        var subdomain = subdomain;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/folder/subdomain/" + subdomain, options)
            .map(function (res) {
            var body = res.json();
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.publicviewfoo = function (subdomain, folderid, noofpage, pageno) {
        var id = id;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/viewfoo/" + subdomain + "/folder/" + folderid + "/" + noofpage + "/" + pageno, options)
            .map(function (res) {
            var body = res.json();
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.userpublichomesettings = function (subdomain) {
        var subdomain = subdomain;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/setting/subdomain/" + subdomain, options)
            .map(function (res) {
            var body = res.json();
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.getrealtimenotificationsetting = function (id) {
        var id = id;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/realtimenotification/" + id, options)
            .map(function (res) {
            var body = res.json();
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.viewfoogetcomment = function (viewfooid, imageid) {
        var viewfooid = (viewfooid != '' && viewfooid != undefined) ? viewfooid : '""';
        var imageid = (imageid != '' && imageid != undefined) ? imageid : '""';
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        console.log(myGlobals.serviceUrl + "/viewstatistics/list/" + viewfooid + '/' + imageid + '/comment');
        return this.http.get(myGlobals.serviceUrl + "/viewstatistics/list/" + viewfooid + '/' + imageid + '/comment', options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.getTellafriendlist = function (id) {
        var id = id;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/friendlist/" + id, options)
            .map(function (res) {
            var body = res.json();
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.viewfooaddcomment = function (actiontype, userid, comment, username, useremail, viewfooid, containerimageid) {
        var userid = userid;
        var actiontype = actiontype;
        var viewfooid = viewfooid;
        var containerimageid = containerimageid;
        var userid = userid;
        var useremail = useremail;
        var username = username;
        if (actiontype == 'comment' && viewfooid != undefined && containerimageid == undefined) {
            var body = JSON.stringify({
                userid: userid,
                viewfooid: viewfooid,
                useremail: useremail,
                username: username,
                actiontype: actiontype,
                actiondata: comment
            });
        }
        else if (actiontype == 'comment' && containerimageid != undefined) {
            var body = JSON.stringify({
                containerimageid: containerimageid,
                userid: userid,
                useremail: useremail,
                viewfooid: viewfooid,
                username: username,
                actiontype: actiontype,
                actiondata: comment
            });
        }
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/viewstatistics", body, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
        console.log('here');
    };
    AuthService.prototype.generaterandompw = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/randompassword/viewfoo", options)
            .map(function (res) {
            var body = res.json();
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.passwordprotectedviefoo = function (passworddata) {
        var body = JSON.stringify({
            id: passworddata.id,
            ispasswordprotected: passworddata.ispasswordprotected,
            viewfoopasswordtype: passworddata.viewfoopasswordtype,
            viewfoopassword: passworddata.viewfoopassword,
            sendpasswordbyemail: passworddata.chkmail,
            sendpasswordbysms: passworddata.chksms
        });
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(myGlobals.serviceUrl + "/passwordprotected/viewfoo", body, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.unlockviewfoo = function (id, password) {
        var body = JSON.stringify({
            id: id,
            viewfoopassword: password
        });
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(myGlobals.serviceUrl + "/checkpasswordprotected/viewfoo", body, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.forgotviewfoopassword = function (id, checksms) {
        var body = JSON.stringify({
            id: id,
            sendpasswordbyemail: true,
            sendpasswordbysms: checksms
        });
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/forgotpassword/viewfoo", body, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.selfdestruct = function (id, day, hour, minute, second) {
        var body = JSON.stringify({
            id: id,
            days: day,
            hours: hour,
            minutes: minute,
            seconds: second
        });
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/selfdestruct/viewfoo", body, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.userbillingdetail = function (id) {
        var body = JSON.stringify({
            userid: id
        });
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/billing/userbillingdetail", body, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.realtimenotificationsetting = function (userid, val, settingtype) {
        if (settingtype == "mobilenumber") {
            var body = JSON.stringify({
                userid: userid,
                mobilenumber: val
            });
        }
        else if (settingtype == "issharing") {
            var body = JSON.stringify({
                userid: userid,
                issharing: val
            });
        }
        else if (settingtype == "sharingtype") {
            var body = JSON.stringify({
                userid: userid,
                sharingtype: val
            });
        }
        else if (settingtype == "isphoto") {
            var body = JSON.stringify({
                userid: userid,
                isphoto: val
            });
        }
        else if (settingtype == "phototype") {
            var body = JSON.stringify({
                userid: userid,
                phototype: val
            });
        }
        else if (settingtype == "isphotoselection") {
            var body = JSON.stringify({
                userid: userid,
                isphotoselection: val
            });
        }
        else if (settingtype == "photoselectiontype") {
            var body = JSON.stringify({
                userid: userid,
                photoselectiontype: val
            });
        }
        else if (settingtype == "ischatorcomment") {
            var body = JSON.stringify({
                userid: userid,
                ischatorcomment: val
            });
        }
        else if (settingtype == "chatorcommenttype") {
            var body = JSON.stringify({
                userid: userid,
                chatorcommenttype: val
            });
        }
        else if (settingtype == "isviewfoonews") {
            var body = JSON.stringify({
                userid: userid,
                isviewfoonews: val
            });
        }
        else if (settingtype == "viewfoonewstype") {
            var body = JSON.stringify({
                userid: userid,
                viewfoonewstype: val
            });
        }
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(myGlobals.serviceUrl + "/realtimenotification", body, options)
            .map(function (res) {
            var body = res.json();
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.setviewallnotification = function (id) {
        var body = JSON.stringify({
            receiveruserid: id,
        });
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(myGlobals.serviceUrl + "/notification/viewall", body, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.getviewallnotificationCount = function (id) {
        var id = id;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/notification/" + id, options)
            .map(function (res) {
            var body = res.json();
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.getviewallnotification = function (id) {
        var id = id;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/notification/" + id + "/3/1", options)
            .map(function (res) {
            var body = res.json();
            return body;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.handleErrorMessage = function (error) {
        return Observable_1.Observable.throw(error.json().message || 'Server error');
    };
    AuthService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBMkIsZUFBZSxDQUFDLENBQUE7QUFDM0MscUJBQXdELGVBQWUsQ0FBQyxDQUFBO0FBRXhFLDJCQUEyQixpQkFBaUIsQ0FBQyxDQUFBO0FBRTdDLFFBQU8sdUJBQXVCLENBQUMsQ0FBQTtBQUMvQixRQUFPLHlCQUF5QixDQUFDLENBQUE7QUFDakMsUUFBTywyQkFBMkIsQ0FBQyxDQUFBO0FBRW5DLFFBQU8sc0JBQXNCLENBQUMsQ0FBQTtBQUk5QixJQUFPLFNBQVMsV0FBVyxlQUFlLENBQUMsQ0FBQztBQUU1Qyx3QkFBMkIsY0FBYyxDQUFDLENBQUE7QUFHMUM7SUFVSSxxQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFQdEIsNkJBQXdCLEdBQUcsSUFBSSxpQkFBTyxFQUFVLENBQUM7UUFHekQseUJBQW9CLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFlBQVksRUFBRSxDQUFDO1FBb3NDN0QsOEJBQXlCLEdBQUcsSUFBSSxpQkFBTyxFQUFPLENBQUM7UUFFdEQsMEJBQXFCLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFlBQVksRUFBRSxDQUFDO0lBbHNDcEMsQ0FBQztJQUVuQywyQkFBSyxHQUFMLFVBQU0sUUFBZ0IsRUFBRSxRQUFnQjtRQUVwQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3RCLEtBQUssRUFBRSxRQUFRO1lBQ2YsUUFBUSxFQUFFLFFBQVE7U0FDckIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsZUFBZSxFQUFFLG9EQUFvRCxFQUFFLENBQUMsQ0FBQztRQUN6SSxJQUFJLE9BQU8sR0FBRyxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFF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QVM7UUFDNUIsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ1osSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsZUFBZSxFQUFFLG9EQUFvRCxFQUFFLENBQUMsQ0FBQztRQUN6SSxJQUFJLE9BQU8sR0FBRyxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUN2RCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxnQkFBZ0IsR0FBQyxFQUFFLEdBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQzthQUMzRSxHQUFHLENBQUMsVUFBQyxHQUFhO1lBQ2YsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRXRCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRU8sd0NBQWtCLEdBQTFCLFVBQTJCLEtBQVU7UUFFakMsTUFBTSxDQUFDLHVCQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLElBQUksY0FBYyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVPLGlDQUFXLEdBQW5CLFVBQW9CLEtBQVU7UUFFMUIsTUFBTSxDQUFDLHVCQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLElBQUksY0FBYyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQXpzQ0w7UUFBQyxpQkFBVSxFQUFFOzttQkFBQTtJQStzQ2Isa0JBQUM7QUFBRCxDQTlzQ0EsQUE4c0NDLElBQUE7QUE5c0NZLG1CQUFXLGNBOHNDdkIsQ0FBQSIsImZpbGUiOiJhcHAvc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlcXVlc3RPcHRpb25zLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuLy9HcmFiIGV2ZXJ5dGhpbmcgd2l0aCBpbXBvcnQgJ3J4anMvUngnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2gnO1xuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL3Rocm93Jztcbi8vaW1wb3J0ICdyeGpzL1J4JzsgIC8vIHVzZSB0aGlzIGxpbmUgaWYgeW91IHdhbnQgdG8gYmUgbGF6eSwgb3RoZXJ3aXNlOlxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9kbyc7ICAvLyBkZWJ1Z1xuXG5pbXBvcnQgeyBVc2VyLCBSZWdpc3RlciwgUHJvZmlsZWRhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcblxuaW1wb3J0IG15R2xvYmFscyA9IHJlcXVpcmUoJy4uLy4uL2dsb2JhbHMnKTtcblxuaW1wb3J0IHsgU3ViamVjdCB9ICAgIGZyb20gJ3J4anMvU3ViamVjdCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XG5cblxuICAgIHByaXZhdGUgcHJvZmlsZUltYWdlQ2hhbmdlU291cmNlID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gICAgLy8gT2JzZXJ2YWJsZSBzdHJpbmcgc3RyZWFtc1xuICAgIHByb2ZpbGVJbWFnZUNoYW5nZWQkID0gdGhpcy5wcm9maWxlSW1hZ2VDaGFuZ2VTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICB1c2VyOiBVc2VyO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7IH1cblxuICAgIGxvZ2luKHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcblxuICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGVtYWlsOiB1c2VybmFtZSxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9hdXRoL2xvZ2luXCIsIGJvZHksIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIC8vdGhpcy51c2VyID0gYm9keS5kYXRhO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJvZHkuc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy51c2VyO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyKHJlZ2lzdGVyOiBSZWdpc3Rlcik6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHJlZ2lzdGVyKTtcbiAgICAgICAgY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBkbWxsZDJadmIzVnpaWEk2TWpNek1YTmtOVFpoTkRVMmN6TmtNVFJoY3pZPVwiIH0pO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChteUdsb2JhbHMuc2VydmljZVVybCArIFwiL3NpZ251cC9yZWdpc3RlclwiLCBib2R5LCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgICAgICAgICAvL3JldHVybiB0aGlzLnVzZXI7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG5cbiAgICB9XG5cbiAgICBmb3Jnb3RwYXNzd29yZChmb3Jnb3RFbWFpbDogc3RyaW5nKSB7XG4gICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgZW1haWw6IGZvcmdvdEVtYWlsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvc2lnbnVwL2ZvcmdvdHBhc3N3b3JkXCIsIGJvZHksIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMudXNlcjtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG4gICAgdXNlcmFjdGl2YXRpb24oYWN0aXZlbGluazogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGxldCBsaW5rID0gYWN0aXZlbGluaztcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9zaWdudXAvdXNlcmFjdGl2YXRpb24vXCIgKyBsaW5rLCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcblxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cbiAgICBwcm9maWxlYmFzZTY0KGZpbGVuYW1lOiBzdHJpbmcsIGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICBmaWxlOiBmaWxlbmFtZVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QobXlHbG9iYWxzLmltYWdlVXJsICsgXCIvcHJvZmlsZS9lZGl0cHJvZmlsZWJhc2U2NFwiLCBib2R5LCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgICAgICAgICAvL3JldHVybiB0aGlzLnVzZXI7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG5cblxuICAgIH1cblxuXG4gICAgZW1pdFByb2ZpbGVDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMucHJvZmlsZUltYWdlQ2hhbmdlU291cmNlLm5leHQoXCJcIik7XG4gICAgfVxuXG4gICAgdmlld3Byb2ZpbGUoaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGlkOiBpZFxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvcHJvZmlsZS92aWV3cHJvZmlsZVwiLCBib2R5LCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMudXNlcjtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcblxuICAgIH1cblx0Y292ZXJiYXNlNjQodmlld2Zvb2lkOiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcsIGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBpZDogdmlld2Zvb2lkLFxuICAgICAgICAgICAgY292ZXJpbWFnZTogZmlsZW5hbWUsXG4gICAgICAgICAgICB1c2VyaWQ6IGlkXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KG15R2xvYmFscy5pbWFnZVVybCArIFwiL2NvdmVyaW1hZ2Uvdmlld2Zvb1wiLCBib2R5LCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgICAgICAgICAvL3JldHVybiB0aGlzLnVzZXI7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG5cbiAgICB9XG4gICAgZWRpdHByb2ZpbGUocHJvZmlsZWRhdGE6IFByb2ZpbGVEYXRhKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkocHJvZmlsZWRhdGEpO1xuICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvcHJvZmlsZS9lZGl0cHJvZmlsZVwiLCBib2R5LCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgICAgICAgICAvL3JldHVybiB0aGlzLnVzZXI7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG5cbiAgICB9XG4gICAgYmlsbGluZyhiaWxsaW5nZGF0YTogQmlsbGluZ0RhdGEpOiBPYnNlcnZhYmxlPFVzZXI+IHtcblxuXG4gICAgICAgICAgIGxldCBiaWxsZGV0YWlsID17XG5cdFx0XHRcImZpcnN0bmFtZVwiOiBiaWxsaW5nZGF0YS5maXJzdG5hbWUsIFwibGFzdG5hbWVcIjogYmlsbGluZ2RhdGEubGFzdG5hbWUsXG5cdFx0XHRcImVtYWlsXCI6IGJpbGxpbmdkYXRhLmVtYWlsLCBcImJ1c2luZXNzbmFtZVwiOiBiaWxsaW5nZGF0YS5idXNpbmVzc25hbWUsIFwiYWRkcmVzc1wiOiBiaWxsaW5nZGF0YS5hZGRyZXNzLFxuXHRcdFx0XCJhcHBcIjogYmlsbGluZ2RhdGEuYXBwLCBcImNpdHlcIjogYmlsbGluZ2RhdGEuY2l0eSwgXCJzdGF0ZVwiOiBiaWxsaW5nZGF0YS5zdGF0ZSwgXCJ6aXBjb2RlXCI6IGJpbGxpbmdkYXRhLnppcGNvZGUsIFwiY291bnRyeVwiOiBiaWxsaW5nZGF0YS5jb3VudHJ5XG5cdFx0fTtcblxuICAgICAgICBjb25zb2xlLmxvZyhiaWxsZGV0YWlsKTtcblxuXG4gICAgICAgICBsZXQgY2FyZCA9e1xuXHRcdFx0XCJjYXJkdG9rZW5cIjogYmlsbGluZ2RhdGEuY2FyZHRva2VuLCBcInVzZXJpZFwiOiBiaWxsaW5nZGF0YS51c2VyaWQsXG5cdFx0XHRcInBheW1lbnR0eXBlXCI6IGJpbGxpbmdkYXRhLnBheW1lbnR0eXBlLCBcInBheW1lbnRnYXR3YXlcIjogYmlsbGluZ2RhdGEucGF5bWVudGdhdHdheSwgXCJjYXJkbnVtYmVyXCI6IGJpbGxpbmdkYXRhLmNhcmRudW1iZXIsXG5cdFx0XHRcImNhcmR0eXBlXCI6IGJpbGxpbmdkYXRhLmNhcmR0eXBlXG5cdFx0fTtcblx0XHRjb25zb2xlLmxvZyhjYXJkKTtcblxuICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHsgJ2NhcmQnOiBjYXJkLCdiaWxsZGV0YWlsJzogYmlsbGRldGFpbCAgfSk7XG4vLyAgICAgICAgY29uc29sZS5sb2coYm9keV9qc29uKTtcbi8vICAgICAgICB2YXIgYm9keSA9IGJvZHlfanNvbi5yZXBsYWNlKC9cXFxcL2csXCJcIik7XG4vLy8vbGV0IGJvZHk9SlNPTi5zdHJpbmdpZnkoYm9keV9qc29uKTtcblx0XHRjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvYmlsbGluZy9iaWxsaW5nXCIsIGJvZHksIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMudXNlcjtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcblxuXG5cdFx0Ly9yZXR1cm4gYm9keTtcbiAgICB9XG4gICAgdGVsbGFmcmllbmQoZnJpZW5kRW1haWw6IHN0cmluZywgaWQ6IHN0cmluZykge1xuICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGVtYWlsOiBmcmllbmRFbWFpbCwgaWQ6IGlkXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvYmlsbGluZy9pbnZpdGVmcmllbmRcIiwgYm9keSwgb3B0aW9ucylcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy51c2VyO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cbiAgICB2YWxpZGF0ZXByb21vY29kZShjb2RlOiBzdHJpbmcsIGlkOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBwcm9tb2NvZGU6IGNvZGUsIGlkOiBpZFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBkbWxsZDJadmIzVnpaWEk2TWpNek1YTmtOVFpoTkRVMmN6TmtNVFJoY3pZPVwiIH0pO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChteUdsb2JhbHMuc2VydmljZVVybCArIFwiL2JpbGxpbmcvdmFsaWRhdGVwcm9tb2NvZGVcIiwgYm9keSwgb3B0aW9ucylcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy51c2VyO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuXG4gICAgfVxuICAgIGNoa3N1YmRvbWFpbihzdWJkb21haW46IHN0cmluZykge1xuXG4gICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgc3ViZG9tYWluOiBzdWJkb21haW5cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9zaWdudXAvdmFsaWRhdGVzdWJkb21haW5cIiwgYm9keSwgb3B0aW9ucylcblxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcblxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgICAgICAvLyAgICAgICAgIC5tYXAoKHJlczpSZXNwb25zICAgICAgICBlKSA9PiByZXMuanNvbigpKVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgLy8gICAgICAgICAgIGRhdGEgPT4geyBjbyAgICAgICAgbnNvbGUubG9nKGRhdGEpfSxcbiAgICAgICAgLy8gICAgICAgICAgICBlcnIgPT4gY28gICAgICAgIG5zb2xlLmVycm9yKGVyciksXG4gICAgICAgIC8vICAgICAgICAgICAgKCkgPT4gY28gICAgICAgIG5zb2xlLmxvZygnZG9uZScpXG4gICAgICAgIC8vICAgICAgICAgICAgKTtcbiAgICAgICAgLy8vLyAgICAgICAgICAgICAuc3Vic2MgICAgICAgIHJpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdCl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGNvbiAgICAgICAgc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB9IGVsc2V7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWUgICAgICAgIDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgIH0sXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgICAgICAgIC5tZXNzYWdlID0gZXJyb3I7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3ViZG9tYWluICAgICAgICAgIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAvLyAgICAgICAgIH0pO1xuXG5cblxuICAgIH1cblxuXG4gICAgdmlld2Zvb2NyZWF0ZShjb250YWluZXJ0eXBlOiBzdHJpbmcsIGlkOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBjb250YWluZXJ0eXBlOiBjb250YWluZXJ0eXBlLFxuICAgICAgICAgICAgdXNlcmlkOiBpZFxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvdmlld2Zvb1wiLCBib2R5LCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgICAgICAgICAvL3JldHVybiB0aGlzLnVzZXI7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gICAgfVxuXG4gICAgdmlld2Zvb2RlbGV0ZShpZDogc3RyaW5nKSB7XG4gICAgICAgIGxldCBpZDogaWQ7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBkbWxsZDJadmIzVnpaWEk2TWpNek1YTmtOVFpoTkRVMmN6TmtNVFJoY3pZPVwiIH0pO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvdmlld2Zvby9cIiArIGlkLCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgICAgICAgICAvL3JldHVybiB0aGlzLnVzZXI7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gICAgfVxuXG4gICAgdmlld2Zvb0RldGFpbCh2aWV3Zm9vaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBkbWxsZDJadmIzVnpaWEk2TWpNek1YTmtOVFpoTkRVMmN6TmtNVFJoY3pZPVwiIH0pO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi92aWV3Zm9vL1wiICsgdmlld2Zvb2lkLCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICAvL3RoaXMudXNlciA9IGJvZHkuZGF0YTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGJvZHkuc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy51c2VyO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cblxuICAgIC8vLS0tLS0tLS0tLSBDb250YWluZXIgU2VydmljZXMgLS0tLS0tLS0tLVxuICAgIGNvbnRhaW5lckNyZWF0ZShjb250YWluZXJ0eXBlOiBzdHJpbmcsIHZpZXdmb29pZDogc3RyaW5nLCB1c2VyaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuXG4gICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgdmlld2Zvb2lkOiB2aWV3Zm9vaWQsXG4gICAgICAgICAgICB1c2VyaWQ6IHVzZXJpZCxcbiAgICAgICAgICAgIGNvbnRhaW5lcnR5cGU6IGNvbnRhaW5lcnR5cGVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9jb250YWluZXJcIiwgYm9keSwgb3B0aW9ucylcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgLy90aGlzLnVzZXIgPSBib2R5LmRhdGE7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhib2R5LnN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMudXNlcjtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG5cbiAgICBjb250YWluZXJVcGRhdGUoY29udGFpbmVydXBkYXRlRGljdDogYW55LCBjb250YWluZXJpZDogc3RyaW5nKSB7XG4gICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoY29udGFpbmVydXBkYXRlRGljdCk7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBkbWxsZDJadmIzVnpaWEk2TWpNek1YTmtOVFpoTkRVMmN6TmtNVFJoY3pZPVwiIH0pO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvY29udGFpbmVyXCIsIGJvZHksIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMudXNlcjtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG5cblxuICAgIGFkZGZvbGRlcihpZDogc3RyaW5nLCBmb2xkZXJuYW1lOiBzdHJpbmcsIGZvbGRlcnR5cGU6IHN0cmluZywgcGFyZW50Zm9sZGVyaWQ6IHN0cmluZykge1xuXHRcdGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgZm9sZGVybmFtZTogZm9sZGVybmFtZSxcbiAgICAgICAgICAgIHVzZXJpZDogaWQsXG4gICAgICAgICAgICBmb2xkZXJ0eXBlOiBmb2xkZXJ0eXBlLFxuICAgICAgICAgICAgcGFyZW50aWQ6IHBhcmVudGZvbGRlcmlkXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBkbWxsZDJadmIzVnpaWEk2TWpNek1YTmtOVFpoTkRVMmN6TmtNVFJoY3pZPVwiIH0pO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvZm9sZGVyXCIsIGJvZHksIG9wdGlvbnMpXG5cdFx0XHQvLyByZXR1cm4gdGhpcy5odHRwLnBvc3QoXCJodHRwOi8vMTkyLjE2OC4wLjE4MzoxMzM3XCIgKyBcIi9mb2xkZXJcIiwgYm9keSwgb3B0aW9ucylcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHJlcy5qc29uKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcblxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuXG4gICAgfVxuXG4gICAgdmlld2Zvb3VwZGF0ZSh2aWV3Zm9vaWQ6IHN0cmluZywgdmFsOiBzdHJpbmcsIHNldHRpbmd0eXBlOiBzdHJpbmcpIHtcblxuICAgICAgICBpZiAoc2V0dGluZ3R5cGUgPT0gXCJhbGxvd3NoYXJpbmdcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdGlkOiB2aWV3Zm9vaWQsXG5cdFx0XHRcdGFsbG93c2hhcmluZzogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcImFsbG93Y29tbWVudFwiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0aWQ6IHZpZXdmb29pZCxcblx0XHRcdFx0YWxsb3djb21tZW50OiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cblx0XHRlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcImFsbG93c2VsZWN0aW9uXCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRpZDogdmlld2Zvb2lkLFxuXHRcdFx0XHRhbGxvd3NlbGVjdGlvbjogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXHRcdGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwiaW1hZ2VzaXplXCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRpZDogdmlld2Zvb2lkLFxuXHRcdFx0XHRpbWFnZXNpemU6IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2V0dGluZ3R5cGUgPT0gXCJpbWFnZWRhdGFtb3VzZWhvdmVyXCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRpZDogdmlld2Zvb2lkLFxuXHRcdFx0XHRpbWFnZWRhdGFtb3VzZWhvdmVyOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwiaW1hZ2VpbmZvZnJhbWVcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdGlkOiB2aWV3Zm9vaWQsXG5cdFx0XHRcdGltYWdlaW5mb2ZyYW1lOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwiYXBwbHl3YXRlcm1hcmtcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdGlkOiB2aWV3Zm9vaWQsXG5cdFx0XHRcdGFwcGx5d2F0ZXJtYXJrOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cdFx0ZWxzZSBpZiAoc2V0dGluZ3R5cGUgPT0gXCJpbWFnZWRlZmF1bHRub1wiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0aWQ6IHZpZXdmb29pZCxcblx0XHRcdFx0aW1hZ2VkZWZhdWx0bm86IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuXHRcdGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwiYmFja2dyb3VuZGNvbG9yXCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRpZDogdmlld2Zvb2lkLFxuXHRcdFx0XHRiYWNrZ3JvdW5kY29sb3I6IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblx0XHRlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcIm1lbnVmb250Y29sb3JcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdGlkOiB2aWV3Zm9vaWQsXG5cdFx0XHRcdG1lbnVmb250Y29sb3I6IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblx0XHRlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcIm1lbnViYWNrZ3JvdW5kY29sb3JcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdGlkOiB2aWV3Zm9vaWQsXG5cdFx0XHRcdG1lbnViYWNrZ3JvdW5kY29sb3I6IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuXG5cblxuICAgICAgICAvL2xldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdC8vIGlkOiB2aWV3Zm9vaWQsXG5cdFx0Ly9hbGxvd3NoYXJpbmc6IHZhbFxuXHRcdC8vIH0pO1xuXHRcdC8vIGNvbnNvbGUubG9nPSh2YWwpO1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dChteUdsb2JhbHMuc2VydmljZVVybCArIFwiL3ZpZXdmb29cIiwgYm9keSwgb3B0aW9ucylcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgICAgICAgICAvL3JldHVybiB0aGlzLnVzZXI7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gICAgfVxuICAgIHB1Ymxpc2h2aWV3Zm9vdXBkYXRlKHZpZXdmb29pZDogc3RyaW5nLCB2ZnRpdGxlOiBzdHJpbmcsIHZmdGFnczogc3RyaW5nLCBmb2xkZXJpZDogc3RyaW5nLCB2aWV3Zm9vdHlwZTogc3RyaW5nKSB7XG5cdFx0bGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBpZDogdmlld2Zvb2lkLFxuICAgICAgICAgICAgdmlld2Zvb3RpdGxlOiB2ZnRpdGxlLFxuICAgICAgICAgICAgdGFnczogdmZ0YWdzLFxuICAgICAgICAgICAgZm9sZGVyaWQ6IGZvbGRlcmlkLFxuICAgICAgICAgICAgdmlld2Zvb3R5cGU6IHZpZXdmb290eXBlXG5cdFx0fSk7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBkbWxsZDJadmIzVnpaWEk2TWpNek1YTmtOVFpoTkRVMmN6TmtNVFJoY3pZPVwiIH0pO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvdmlld2Zvb1wiLCBib2R5LCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMudXNlcjtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG4gICAgdXNlcnNldHRpbmcodXNlcmlkOiBzdHJpbmcsIHZhbDogc3RyaW5nLCBzZXR0aW5ndHlwZTogc3RyaW5nKSB7XG5cbiAgICAgICAgaWYgKHNldHRpbmd0eXBlID09IFwibWVudXN0eWxlXCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHR1c2VyaWQ6IHVzZXJpZCxcblx0XHRcdFx0bmF2cG9zaXRpb246IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2V0dGluZ3R5cGUgPT0gXCJ2aWV3Zm9vc3R5bGVcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHVzZXJpZDogdXNlcmlkLFxuXHRcdFx0XHR2aWV3Zm9vZGlzcGxheTogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG5cdFx0ZWxzZSBpZiAoc2V0dGluZ3R5cGUgPT0gXCJ2aWV3Zm9vb3B0aW9uXCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHR1c2VyaWQ6IHVzZXJpZCxcblx0XHRcdFx0dmlld2Zvb29wdGlvbjogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXHRcdGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwiYWxsb3dzaGFyaW5nXCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHR1c2VyaWQ6IHVzZXJpZCxcblx0XHRcdFx0YWxsb3dzaGFyaW5nOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwiYWxsb3djb21tZW50XCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHR1c2VyaWQ6IHVzZXJpZCxcblx0XHRcdFx0YWxsb3djb21tZW50OiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwiYWxsb3dzZWxlY3Rpb25cIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHVzZXJpZDogdXNlcmlkLFxuXHRcdFx0XHRhbGxvd3NlbGVjdGlvbjogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXHRcdGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwiZGlzYWJsZXJpZ2h0bW91c2VidG5cIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHVzZXJpZDogdXNlcmlkLFxuXHRcdFx0XHRkaXNhYmxlcmlnaHRtb3VzZWJ0bjogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG5cdFx0ZWxzZSBpZiAoc2V0dGluZ3R5cGUgPT0gXCJzaGFyaW5nZmlsZWluZm9cIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHVzZXJpZDogdXNlcmlkLFxuXHRcdFx0XHRzaGFyaW5nZmlsZWluZm86IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblx0XHRlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcImFkZGxvZ29uYW1lXCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHR1c2VyaWQ6IHVzZXJpZCxcblx0XHRcdFx0bG9nb3RleHQ6IHZhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNsb2dvOid0ZXh0J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblx0XHRlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcImxvZ29pbWFnZVwiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0dXNlcmlkOiB1c2VyaWQsXG5cdFx0XHRcdGxvZ29pbWFnZTogdmFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc2xvZ286J2ltYWdlJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblx0XHRlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcImZhY2Vib29rXCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHR1c2VyaWQ6IHVzZXJpZCxcblx0XHRcdFx0ZmFjZWJvb2s6IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblx0XHRlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcInR3aXR0ZXJcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHVzZXJpZDogdXNlcmlkLFxuXHRcdFx0XHR0d2l0dGVyOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cdFx0ZWxzZSBpZiAoc2V0dGluZ3R5cGUgPT0gXCJnb29nbGVwbHVzXCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHR1c2VyaWQ6IHVzZXJpZCxcblx0XHRcdFx0Z29vZ2xlcGx1czogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXHRcdGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwiaW5zdGFncmFtXCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHR1c2VyaWQ6IHVzZXJpZCxcblx0XHRcdFx0aW5zdGFncmFtOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cdFx0ZWxzZSBpZiAoc2V0dGluZ3R5cGUgPT0gXCJwaW50ZXJlc3RcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHVzZXJpZDogdXNlcmlkLFxuXHRcdFx0XHRwaW50ZXJlc3Q6IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblx0XHRlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcIndvcmRwcmVzc1wiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0dXNlcmlkOiB1c2VyaWQsXG5cdFx0XHRcdHdvcmRwcmVzczogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXHRcdGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwieW91dHViZVwiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0dXNlcmlkOiB1c2VyaWQsXG5cdFx0XHRcdHlvdXR1YmU6IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblx0XHRlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcInZpYmVyXCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHR1c2VyaWQ6IHVzZXJpZCxcblx0XHRcdFx0dmliZXI6IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblx0XHRlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcImxpbmtkaW5cIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHVzZXJpZDogdXNlcmlkLFxuXHRcdFx0XHRsaW5rZGluOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cdFx0ZWxzZSBpZiAoc2V0dGluZ3R5cGUgPT0gXCJiZWhhbmNlXCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHR1c2VyaWQ6IHVzZXJpZCxcblx0XHRcdFx0YmVoYW5jZTogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXHRcdGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwidHVtYmxlclwiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0dXNlcmlkOiB1c2VyaWQsXG5cdFx0XHRcdHR1bWJsZXI6IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblx0XHRlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcImRyb3Bib3hcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHVzZXJpZDogdXNlcmlkLFxuXHRcdFx0XHRkcm9wYm94OiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cdFx0ZWxzZSBpZiAoc2V0dGluZ3R5cGUgPT0gXCJhZGRmb290ZXJcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHVzZXJpZDogdXNlcmlkLFxuXHRcdFx0XHRmb290ZXJ0ZXh0OiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cdFx0ZWxzZSBpZiAoc2V0dGluZ3R5cGUgPT0gXCJtZW51Y29sb3JcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHVzZXJpZDogdXNlcmlkLFxuXHRcdFx0XHRtZW51Y29sb3I6IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblx0XHRlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcImZvbnRjb2xvclwiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0dXNlcmlkOiB1c2VyaWQsXG5cdFx0XHRcdGZvbnRjb2xvcjogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcIm1vYmlsZW51bWJlclwiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0dXNlcmlkOiB1c2VyaWQsXG5cdFx0XHRcdG1vYmlsZW51bWJlcjogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXHRcdGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwib2ZmaWNlbnVtYmVyXCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHR1c2VyaWQ6IHVzZXJpZCxcblx0XHRcdFx0b2ZmaWNlbnVtYmVyOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cblxuXG5cblxuICAgICAgICAvL2xldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdC8vIGlkOiB2aWV3Zm9vaWQsXG5cdFx0Ly9hbGxvd3NoYXJpbmc6IHZhbFxuXHRcdC8vIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcblx0XHRyZXR1cm4gdGhpcy5odHRwLnBvc3QobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9zZXR0aW5nL3VzZXJzZXR0aW5nXCIsIGJvZHksIG9wdGlvbnMpXG5cdFx0XHQvL3JldHVybiB0aGlzLmh0dHAucG9zdChcImh0dHA6Ly8xOTIuMTY4LjAuMTgzOjEzMzdcIisgXCIvc2V0dGluZy91c2Vyc2V0dGluZ1wiLCBib2R5LCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMudXNlcjtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG5cbiAgICBjb250YWluZXJEZWxldGUoY29udGFpbmVyaWQ6IHN0cmluZykge1xuXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBkbWxsZDJadmIzVnpaWEk2TWpNek1YTmtOVFpoTkRVMmN6TmtNVFJoY3pZPVwiIH0pO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvY29udGFpbmVyL1wiICsgY29udGFpbmVyaWQsIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMudXNlcjtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG5cbiAgICAvLy0tLS0tLS0tLS0tIENvbnRhaW5lciBJbWFnZSAtLS0tLS0tLS0tLS0tLVxuICAgIGNvbnRhaW5lckltYWdlRGVsZXRlKGNvbnRhaW5lcmltYWdlaWQ6IHN0cmluZykge1xuXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBkbWxsZDJadmIzVnpaWEk2TWpNek1YTmtOVFpoTkRVMmN6TmtNVFJoY3pZPVwiIH0pO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvY29udGFpbmVyaW1hZ2UvXCIgKyBjb250YWluZXJpbWFnZWlkLCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgICAgICAgICAvL3JldHVybiB0aGlzLnVzZXI7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cblxuICAgIGNhbmNlbHN1YnNjcmlwdGlvbih1c2VyaWQ6IHN0cmluZykge1xuXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBkbWxsZDJadmIzVnpaWEk2TWpNek1YTmtOVFpoTkRVMmN6TmtNVFJoY3pZPVwiIH0pO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvYmlsbGluZy9jYW5jZWxzdWJzY3JpcHRpb24vXCIrIHVzZXJpZCwgb3B0aW9ucylcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy51c2VyO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcblxuICAgIH1cblx0dmlld2Zvb2xpc3QoaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBsZXQgaWQgPSBpZDtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi92aWV3Zm9vL2xpc3QvXCIgKyBpZCwgb3B0aW9ucylcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG5cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG5cblxuXG4gICAgYWxsdmlld2Zvb2xpc3Qodmlld2Zvb3R5cGU6IHN0cmluZywgaWQ6IHN0cmluZywgcGVycGFnZTogbnVtYmVyLCBwYWdlbm86IG51bWJlcik6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBsZXQgaWQgPSBpZDtcbiAgICAgICAgbGV0IHBlcnBhZ2UgPSBwZXJwYWdlO1xuICAgICAgICBsZXQgcGFnZW5vID0gcGFnZW5vO1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJwYWdlKTtcbiAgICAgICAgY29uc29sZS5sb2cocGFnZW5vKTtcblxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuXG4gICAgICAgIGxldCB1cmwgPSBteUdsb2JhbHMuc2VydmljZVVybCArIFwiL3ZpZXdmb28vYWxsbGlzdC9cIlxuXHRcdFx0KyBpZCArIFwiL1wiICsgcGVycGFnZSArIFwiL1wiICsgcGFnZW5vICsgXCIvXCIgKyB2aWV3Zm9vdHlwZVxuXHRcdHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwgb3B0aW9ucylcblx0XHRcdC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cblxuICAgIGZvbGRlcmxpc3QoaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBsZXQgaWQgPSBpZDtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9mb2xkZXIvXCIgKyBpZCwgb3B0aW9ucylcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcblxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cbiAgICBzdWJmb2xkZXJsaXN0KGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgbGV0IGlkID0gaWQ7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBkbWxsZDJadmIzVnpaWEk2TWpNek1YTmtOVFpoTkRVMmN6TmtNVFJoY3pZPVwiIH0pO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvc3ViL2ZvbGRlci9cIiArIGlkLCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcblxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cblxuXG4gICAgZ3JpZGl0ZW1vcHRpb24oZ3JpZG9wdGlvbnM6IEdyaWRPcHRpb25zKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoZ3JpZG9wdGlvbnMpO1xuICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvY29udGFpbmVyL2dyaWRpdGVtb3B0aW9uXCIsIGJvZHksIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMudXNlcjtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcblxuICAgIH1cbiAgICBnZXR1c2Vyc2V0dGluZyhpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGxldCBpZCA9IGlkO1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChteUdsb2JhbHMuc2VydmljZVVybCArIFwiL3NldHRpbmcvaG9tcGFnZS9cIiArIGlkLCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gICAgfVxuICAgIHNlbmRNYWlsKGVtYWlsQWRkcmVzc2VzOiBzdHJpbmcsIG1haWxib2R5OiBzdHJpbmcsIGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBmcmllbmRlbWFpbDogZW1haWxBZGRyZXNzZXMsXG4gICAgICAgICAgICBtZXNzYWdlOiBtYWlsYm9keSxcbiAgICAgICAgICAgIHVzZXJpZDogaWRcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXCJodHRwOi8vMTkyLjE2OC4wLjE4MzoxMzM3L2ZyaWVuZGxpc3RcIiwgYm9keSwgb3B0aW9ucylcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy51c2VyO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cblxuICAgIHB1YmxpY2ZvbGRlcmxpc3Qoc3ViZG9tYWluOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgbGV0IHN1YmRvbWFpbiA9IHN1YmRvbWFpbjtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9mb2xkZXIvc3ViZG9tYWluL1wiICsgc3ViZG9tYWluLCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG5cbiAgICBwdWJsaWN2aWV3Zm9vKHN1YmRvbWFpbjogYW55LCBmb2xkZXJpZDogc3RyaW5nLCBub29mcGFnZTogYW55LCBwYWdlbm86IGFueSk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBsZXQgaWQgPSBpZDtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi92aWV3Zm9vL1wiK3N1YmRvbWFpbitcIi9mb2xkZXIvXCIgKyBmb2xkZXJpZCtcIi9cIitub29mcGFnZStcIi9cIitwYWdlbm8sIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cblxuICAgIHVzZXJwdWJsaWNob21lc2V0dGluZ3Moc3ViZG9tYWluOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgbGV0IHN1YmRvbWFpbiA9IHN1YmRvbWFpbjtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9zZXR0aW5nL3N1YmRvbWFpbi9cIiArIHN1YmRvbWFpbiwgb3B0aW9ucylcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gICAgfVxuXG4gICAgZ2V0cmVhbHRpbWVub3RpZmljYXRpb25zZXR0aW5nKGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgbGV0IGlkID0gaWQ7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBkbWxsZDJadmIzVnpaWEk2TWpNek1YTmtOVFpoTkRVMmN6TmtNVFJoY3pZPVwiIH0pO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvcmVhbHRpbWVub3RpZmljYXRpb24vXCIgKyBpZCwgb3B0aW9ucylcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG5cbiAgICB2aWV3Zm9vZ2V0Y29tbWVudCh2aWV3Zm9vaWQ6IHN0cmluZyxpbWFnZWlkOnN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBcbiAgICAgICAgbGV0IHZpZXdmb29pZCA9ICAodmlld2Zvb2lkIT0nJyAmJiB2aWV3Zm9vaWQhPXVuZGVmaW5lZCk/dmlld2Zvb2lkOidcIlwiJztcbiAgICAgICAgbGV0IGltYWdlaWQgPSAoaW1hZ2VpZCE9JycgJiYgaW1hZ2VpZCE9dW5kZWZpbmVkKT9pbWFnZWlkOidcIlwiJztcblxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhteUdsb2JhbHMuc2VydmljZVVybCArIFwiL3ZpZXdzdGF0aXN0aWNzL2xpc3QvXCIgKyB2aWV3Zm9vaWQrJy8nK2ltYWdlaWQrJy9jb21tZW50Jyk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvdmlld3N0YXRpc3RpY3MvbGlzdC9cIiArIHZpZXdmb29pZCsnLycraW1hZ2VpZCsnL2NvbW1lbnQnLCBvcHRpb25zKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG5cbiAgICBnZXRUZWxsYWZyaWVuZGxpc3QoaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBsZXQgaWQgPSBpZDtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9mcmllbmRsaXN0L1wiICsgaWQsIG9wdGlvbnMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gICAgfVxuICAgIHZpZXdmb29hZGRjb21tZW50KGFjdGlvbnR5cGU6c3RyaW5nLHVzZXJpZDpzdHJpbmcsY29tbWVudDpzdHJpbmcsdXNlcm5hbWU6c3RyaW5nLHVzZXJlbWFpbDpzdHJpbmcsdmlld2Zvb2lkOnN0cmluZyxjb250YWluZXJpbWFnZWlkOnN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBsZXQgdXNlcmlkID0gdXNlcmlkO1xuICAgICAgICBsZXQgYWN0aW9udHlwZSA9IGFjdGlvbnR5cGU7XG4gICAgICAgIGxldCB2aWV3Zm9vaWQgPSB2aWV3Zm9vaWQ7XG4gICAgICAgIGxldCBjb250YWluZXJpbWFnZWlkID0gY29udGFpbmVyaW1hZ2VpZDtcbiAgICAgICAgbGV0IHVzZXJpZCA9IHVzZXJpZDtcbiAgICAgICAgbGV0IHVzZXJlbWFpbCA9IHVzZXJlbWFpbDtcbiAgICAgICAgbGV0IHVzZXJuYW1lID0gdXNlcm5hbWU7XG4gICAgICAgXG4gICAgICAgIGlmKGFjdGlvbnR5cGU9PSdjb21tZW50JyAmJiB2aWV3Zm9vaWQhPXVuZGVmaW5lZCAmJiBjb250YWluZXJpbWFnZWlkPT11bmRlZmluZWQpe1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyaWQ6IHVzZXJpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdmb29pZDogdmlld2Zvb2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcmVtYWlsOiB1c2VyZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTp1c2VybmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnR5cGU6YWN0aW9udHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbmRhdGE6Y29tbWVudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1lbHNlIGlmKGFjdGlvbnR5cGU9PSdjb21tZW50JyAmJiBjb250YWluZXJpbWFnZWlkIT11bmRlZmluZWQpe1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXJpbWFnZWlkOmNvbnRhaW5lcmltYWdlaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyaWQ6IHVzZXJpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJlbWFpbDogdXNlcmVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlld2Zvb2lkOiB2aWV3Zm9vaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTp1c2VybmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnR5cGU6YWN0aW9udHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbmRhdGE6Y29tbWVudFxuICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuXHRcdHJldHVybiB0aGlzLmh0dHAucG9zdChteUdsb2JhbHMuc2VydmljZVVybCArIFwiL3ZpZXdzdGF0aXN0aWNzXCIsIGJvZHksIG9wdGlvbnMpXG4gICAgICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgICAgICAgICAvL3JldHVybiB0aGlzLnVzZXI7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gICAgICAgIGNvbnNvbGUubG9nKCdoZXJlJyk7XG5cbiAgICB9XG4gICAgZ2VuZXJhdGVyYW5kb21wdygpOiBPYnNlcnZhYmxlPFVzZXI+IHtcblxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChteUdsb2JhbHMuc2VydmljZVVybCArIFwiL3JhbmRvbXBhc3N3b3JkL3ZpZXdmb29cIiwgb3B0aW9ucylcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cbiAgICBwYXNzd29yZHByb3RlY3RlZHZpZWZvbyhwYXNzd29yZGRhdGE6cGFzc3dvcmREYXRhKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGxldCBib2R5PUpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGlkOnBhc3N3b3JkZGF0YS5pZCxcbiAgICBpc3Bhc3N3b3JkcHJvdGVjdGVkOnBhc3N3b3JkZGF0YS5pc3Bhc3N3b3JkcHJvdGVjdGVkLFxuICAgIHZpZXdmb29wYXNzd29yZHR5cGU6cGFzc3dvcmRkYXRhLnZpZXdmb29wYXNzd29yZHR5cGUsXG4gICAgdmlld2Zvb3Bhc3N3b3JkOnBhc3N3b3JkZGF0YS52aWV3Zm9vcGFzc3dvcmQsXG4gICAgc2VuZHBhc3N3b3JkYnllbWFpbDpwYXNzd29yZGRhdGEuY2hrbWFpbCxcbiAgICBzZW5kcGFzc3dvcmRieXNtczpwYXNzd29yZGRhdGEuY2hrc21zXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9wYXNzd29yZHByb3RlY3RlZC92aWV3Zm9vXCIsIGJvZHksIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMudXNlcjtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcblxuICAgIH1cbiAgICB1bmxvY2t2aWV3Zm9vKGlkLHBhc3N3b3JkKTpPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgICAgICBsZXQgYm9keT1KU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBpZDppZCxcbiAgICAgICAgICAgIHZpZXdmb29wYXNzd29yZDpwYXNzd29yZFxuXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9jaGVja3Bhc3N3b3JkcHJvdGVjdGVkL3ZpZXdmb29cIiwgYm9keSwgb3B0aW9ucylcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy51c2VyO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuXG4gICAgfVxuXG4gICAgZm9yZ290dmlld2Zvb3Bhc3N3b3JkKGlkLGNoZWNrc21zKTpPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICBzZW5kcGFzc3dvcmRieWVtYWlsOiB0cnVlLFxuICAgICAgICAgICAgc2VuZHBhc3N3b3JkYnlzbXM6IGNoZWNrc21zXG5cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9mb3Jnb3RwYXNzd29yZC92aWV3Zm9vXCIsIGJvZHksIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMudXNlcjtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcblxuICAgIH1cbiAgICBzZWxmZGVzdHJ1Y3QoaWQsZGF5LGhvdXIsbWludXRlLHNlY29uZCk6T2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgIGRheXM6ZGF5LFxuICAgICAgICAgICAgaG91cnM6aG91cixcbiAgICAgICAgICAgIG1pbnV0ZXM6bWludXRlLFxuICAgICAgICAgICAgc2Vjb25kczpzZWNvbmRcblxuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBkbWxsZDJadmIzVnpaWEk2TWpNek1YTmtOVFpoTkRVMmN6TmtNVFJoY3pZPVwiIH0pO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChteUdsb2JhbHMuc2VydmljZVVybCArIFwiL3NlbGZkZXN0cnVjdC92aWV3Zm9vXCIsIGJvZHksIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMudXNlcjtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgICAgICAgXG4gICAgfVxuICAgIHVzZXJiaWxsaW5nZGV0YWlsKGlkKTpPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgdXNlcmlkOiBpZFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBkbWxsZDJadmIzVnpaWEk2TWpNek1YTmtOVFpoTkRVMmN6TmtNVFJoY3pZPVwiIH0pO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChteUdsb2JhbHMuc2VydmljZVVybCArIFwiL2JpbGxpbmcvdXNlcmJpbGxpbmdkZXRhaWxcIiwgYm9keSwgb3B0aW9ucylcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy51c2VyO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cblxuICAgIHJlYWx0aW1lbm90aWZpY2F0aW9uc2V0dGluZyh1c2VyaWQ6IHN0cmluZywgdmFsOiBzdHJpbmcsIHNldHRpbmd0eXBlOiBzdHJpbmcpIHtcblxuICAgICAgICBpZiAoc2V0dGluZ3R5cGUgPT0gXCJtb2JpbGVudW1iZXJcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcmlkOiB1c2VyaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9iaWxlbnVtYmVyIDogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcImlzc2hhcmluZ1wiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyaWQ6IHVzZXJpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc3NoYXJpbmcgOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwic2hhcmluZ3R5cGVcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcmlkOiB1c2VyaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hhcmluZ3R5cGUgOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwiaXNwaG90b1wiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyaWQ6IHVzZXJpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc3Bob3RvIDogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcInBob3RvdHlwZVwiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyaWQ6IHVzZXJpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaG90b3R5cGUgOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwiaXNwaG90b3NlbGVjdGlvblwiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyaWQ6IHVzZXJpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc3Bob3Rvc2VsZWN0aW9uIDogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcInBob3Rvc2VsZWN0aW9udHlwZVwiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyaWQ6IHVzZXJpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaG90b3NlbGVjdGlvbnR5cGUgOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwiaXNjaGF0b3Jjb21tZW50XCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJpZDogdXNlcmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzY2hhdG9yY29tbWVudCA6IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoc2V0dGluZ3R5cGUgPT0gXCJjaGF0b3Jjb21tZW50dHlwZVwiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyaWQ6IHVzZXJpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGF0b3Jjb21tZW50dHlwZSA6IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoc2V0dGluZ3R5cGUgPT0gXCJpc3ZpZXdmb29uZXdzXCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJpZDogdXNlcmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzdmlld2Zvb25ld3MgOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwidmlld2Zvb25ld3N0eXBlXCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJpZDogdXNlcmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdmb29uZXdzdHlwZSA6IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcblx0XHRyZXR1cm4gdGhpcy5odHRwLnB1dChteUdsb2JhbHMuc2VydmljZVVybCArIFwiL3JlYWx0aW1lbm90aWZpY2F0aW9uXCIsIGJvZHksIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy51c2VyO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cbiAgICBcbiAgICBzZXR2aWV3YWxsbm90aWZpY2F0aW9uKGlkKTpPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICByZWNlaXZlcnVzZXJpZDogaWQsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9ub3RpZmljYXRpb24vdmlld2FsbFwiLCBib2R5LCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcblxuICAgIH1cbiAgICBcbiAgICBcbiAgICBnZXR2aWV3YWxsbm90aWZpY2F0aW9uQ291bnQoaWQ6c3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGxldCBpZCA9IGlkO1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChteUdsb2JhbHMuc2VydmljZVVybCArIFwiL25vdGlmaWNhdGlvbi9cIitpZCwgb3B0aW9ucylcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gICAgfVxuICAgIFxuICAgIGdldHZpZXdhbGxub3RpZmljYXRpb24oaWQ6c3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGxldCBpZCA9IGlkO1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChteUdsb2JhbHMuc2VydmljZVVybCArIFwiL25vdGlmaWNhdGlvbi9cIitpZCtcIi8zLzFcIiwgb3B0aW9ucylcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3JNZXNzYWdlKGVycm9yOiBhbnkpIHtcbiAgICAgICAgLy9jb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpLm1lc3NhZ2UgfHwgJ1NlcnZlciBlcnJvcicpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSkge1xuICAgICAgICAvL2NvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29uKCkuZXJyb3IgfHwgJ1NlcnZlciBlcnJvcicpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwdWJsaWNWaWV3Zm9vQ2hhbmdlU291cmNlID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAgIC8vIE9ic2VydmFibGUgc3RyaW5nIHN0cmVhbXNcbiAgICBwdWJsaWNWaWV3Zm9vQ2hhbmdlZCQgPSB0aGlzLnB1YmxpY1ZpZXdmb29DaGFuZ2VTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG5cbn1cbiJdfQ==
