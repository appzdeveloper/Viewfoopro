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
    AuthService.prototype.viewfoogetcomment = function (id) {
        var id = id;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/comment/" + id + '/viewfoo', options)
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
    AuthService.prototype.viewfooaddcomment = function (userid, commenttype, comment, viewfooid) {
        var userid = userid;
        var viewfooid = viewfooid;
        var commenttype = commenttype;
        if (commenttype == 'viewfoo') {
            var body = JSON.stringify({
                userid: userid,
                viewfooid: viewfooid,
                commenttype: commenttype,
                commenttext: comment
            });
        }
        else if (commenttype == 'containerimage') {
            var body = JSON.stringify({
                userid: userid,
                viewfooid: viewfooid,
                commenttype: commenttype,
                commenttext: comment,
                containerid: containerid,
                containerimageid: containerimageid
            });
        }
        console.log(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/comment", body, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            return body;
        })
            .catch(this.handleError);
        console.log('here');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvdmlld2Zvb2FkZGNvbW1lbnR2aWV3Zm9vYWRkY29tbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTJCLGVBQWUsQ0FBQyxDQUFBO0FBQzNDLHFCQUF3RCxlQUFlLENBQUMsQ0FBQTtBQUV4RSwyQkFBMkIsaUJBQWlCLENBQUMsQ0FBQTtBQUU3QyxRQUFPLHVCQUF1QixDQUFDLENBQUE7QUFDL0IsUUFBTyx5QkFBeUIsQ0FBQyxDQUFBO0FBQ2pDLFFBQU8sMkJBQTJCLENBQUMsQ0FBQTtBQUVuQyxRQUFPLHNCQUFzQixDQUFDLENBQUE7QUFJOUIsSUFBTyxTQUFTLFdBQVcsZUFBZSxDQUFDLENBQUM7QUFFNUMsd0JBQTJCLGNBQWMsQ0FBQyxDQUFBO0FBRzFDO0lBVUkscUJBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBUHRCLDZCQUF3QixHQUFHLElBQUksaUJBQU8sRUFBVSxDQUFDO1FBR3pELHlCQUFvQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQWlnQzdELDhCQUF5QixHQUFHLElBQUksaUJBQU8sRUFBTyxDQUFDO1FBRXRELDBCQUFxQixHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQS8vQnBDLENBQUM7SUFFbkMsMkJBQUssR0FBTCxVQUFNLFFBQWdCLEVBQUUsUUFBZ0I7UUFFcEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUN0QixLQUFLLEVBQUUsUUFBUTtZQUNmLFFBQVEsRUFBRSxRQUFRO1NBQ3JCLENBQUMsQ0FBQztRQUNILElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxDQUFDLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLGVBQWUsRUFBRSxvREFBb0QsRUFBRSxDQUFDLENBQUM7UUFDekksSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBYyxDQUFDLEVB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TUFBTSxDQUFDLElBQUksQ0FBQztRQUdoQixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDTyx3Q0FBa0IsR0FBMUIsVUFBMkIsS0FBVTtRQUVqQyxNQUFNLENBQUMsdUJBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sSUFBSSxjQUFjLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRU8saUNBQVcsR0FBbkIsVUFBb0IsS0FBVTtRQUUxQixNQUFNLENBQUMsdUJBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssSUFBSSxjQUFjLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBdGdDTDtRQUFDLGlCQUFVLEVBQUU7O21CQUFBO0lBNmdDYixrQkFBQztBQUFELENBNWdDQSxBQTRnQ0MsSUFBQTtBQTVnQ1ksbUJBQVcsY0E0Z0N2QixDQUFBIiwiZmlsZSI6ImFwcC9zaGFyZWQvc2VydmljZXMvdmlld2Zvb2FkZGNvbW1lbnR2aWV3Zm9vYWRkY29tbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlcXVlc3RPcHRpb25zLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuLy9HcmFiIGV2ZXJ5dGhpbmcgd2l0aCBpbXBvcnQgJ3J4anMvUngnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2gnO1xuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL3Rocm93Jztcbi8vaW1wb3J0ICdyeGpzL1J4JzsgIC8vIHVzZSB0aGlzIGxpbmUgaWYgeW91IHdhbnQgdG8gYmUgbGF6eSwgb3RoZXJ3aXNlOlxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9kbyc7ICAvLyBkZWJ1Z1xuXG5pbXBvcnQgeyBVc2VyLCBSZWdpc3RlciwgUHJvZmlsZWRhdGEgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcblxuaW1wb3J0IG15R2xvYmFscyA9IHJlcXVpcmUoJy4uLy4uL2dsb2JhbHMnKTtcblxuaW1wb3J0IHsgU3ViamVjdCB9ICAgIGZyb20gJ3J4anMvU3ViamVjdCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XG5cblxuICAgIHByaXZhdGUgcHJvZmlsZUltYWdlQ2hhbmdlU291cmNlID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gICAgLy8gT2JzZXJ2YWJsZSBzdHJpbmcgc3RyZWFtc1xuICAgIHByb2ZpbGVJbWFnZUNoYW5nZWQkID0gdGhpcy5wcm9maWxlSW1hZ2VDaGFuZ2VTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICB1c2VyOiBVc2VyO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7IH1cblxuICAgIGxvZ2luKHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcblxuICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGVtYWlsOiB1c2VybmFtZSxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9hdXRoL2xvZ2luXCIsIGJvZHksIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIC8vdGhpcy51c2VyID0gYm9keS5kYXRhO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJvZHkuc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy51c2VyO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyKHJlZ2lzdGVyOiBSZWdpc3Rlcik6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHJlZ2lzdGVyKTtcbiAgICAgICAgY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBkbWxsZDJadmIzVnpaWEk2TWpNek1YTmtOVFpoTkRVMmN6TmtNVFJoY3pZPVwiIH0pO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChteUdsb2JhbHMuc2VydmljZVVybCArIFwiL3NpZ251cC9yZWdpc3RlclwiLCBib2R5LCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgICAgICAgICAvL3JldHVybiB0aGlzLnVzZXI7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG5cbiAgICB9XG5cbiAgICBmb3Jnb3RwYXNzd29yZChmb3Jnb3RFbWFpbDogc3RyaW5nKSB7XG4gICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgZW1haWw6IGZvcmdvdEVtYWlsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvc2lnbnVwL2ZvcmdvdHBhc3N3b3JkXCIsIGJvZHksIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMudXNlcjtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG4gICAgdXNlcmFjdGl2YXRpb24oYWN0aXZlbGluazogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGxldCBsaW5rID0gYWN0aXZlbGluaztcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9zaWdudXAvdXNlcmFjdGl2YXRpb24vXCIgKyBsaW5rLCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcblxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cbiAgICBwcm9maWxlYmFzZTY0KGZpbGVuYW1lOiBzdHJpbmcsIGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICBmaWxlOiBmaWxlbmFtZVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QobXlHbG9iYWxzLmltYWdlVXJsICsgXCIvcHJvZmlsZS9lZGl0cHJvZmlsZWJhc2U2NFwiLCBib2R5LCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgICAgICAgICAvL3JldHVybiB0aGlzLnVzZXI7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG5cblxuICAgIH1cblxuXG4gICAgZW1pdFByb2ZpbGVDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMucHJvZmlsZUltYWdlQ2hhbmdlU291cmNlLm5leHQoXCJcIik7XG4gICAgfVxuXG4gICAgdmlld3Byb2ZpbGUoaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGlkOiBpZFxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvcHJvZmlsZS92aWV3cHJvZmlsZVwiLCBib2R5LCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMudXNlcjtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcblxuICAgIH1cblx0Y292ZXJiYXNlNjQodmlld2Zvb2lkOiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcsIGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBpZDogdmlld2Zvb2lkLFxuICAgICAgICAgICAgY292ZXJpbWFnZTogZmlsZW5hbWUsXG4gICAgICAgICAgICB1c2VyaWQ6IGlkXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KG15R2xvYmFscy5pbWFnZVVybCArIFwiL2NvdmVyaW1hZ2Uvdmlld2Zvb1wiLCBib2R5LCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgICAgICAgICAvL3JldHVybiB0aGlzLnVzZXI7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG5cbiAgICB9XG4gICAgZWRpdHByb2ZpbGUocHJvZmlsZWRhdGE6IFByb2ZpbGVEYXRhKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkocHJvZmlsZWRhdGEpO1xuICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvcHJvZmlsZS9lZGl0cHJvZmlsZVwiLCBib2R5LCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgICAgICAgICAvL3JldHVybiB0aGlzLnVzZXI7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG5cbiAgICB9XG4gICAgYmlsbGluZyhiaWxsaW5nZGF0YTogQmlsbGluZ0RhdGEpOiBPYnNlcnZhYmxlPFVzZXI+IHtcblxuICAgICAgICBcbiAgICAgICAgICAgbGV0IGJpbGxkZXRhaWwgPXtcblx0XHRcdFwiZmlyc3RuYW1lXCI6IGJpbGxpbmdkYXRhLmZpcnN0bmFtZSwgXCJsYXN0bmFtZVwiOiBiaWxsaW5nZGF0YS5sYXN0bmFtZSxcblx0XHRcdFwiZW1haWxcIjogYmlsbGluZ2RhdGEuZW1haWwsIFwiYnVzaW5lc3NuYW1lXCI6IGJpbGxpbmdkYXRhLmJ1c2luZXNzbmFtZSwgXCJhZGRyZXNzXCI6IGJpbGxpbmdkYXRhLmFkZHJlc3MsXG5cdFx0XHRcImFwcFwiOiBiaWxsaW5nZGF0YS5hcHAsIFwiY2l0eVwiOiBiaWxsaW5nZGF0YS5jaXR5LCBcInN0YXRlXCI6IGJpbGxpbmdkYXRhLnN0YXRlLCBcInppcGNvZGVcIjogYmlsbGluZ2RhdGEuemlwY29kZSwgXCJjb3VudHJ5XCI6IGJpbGxpbmdkYXRhLmNvdW50cnlcblx0XHR9O1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGJpbGxkZXRhaWwpO1xuXG5cbiAgICAgICAgIGxldCBjYXJkID17XG5cdFx0XHRcImNhcmR0b2tlblwiOiBiaWxsaW5nZGF0YS5jYXJkdG9rZW4sIFwidXNlcmlkXCI6IGJpbGxpbmdkYXRhLnVzZXJpZCxcblx0XHRcdFwicGF5bWVudHR5cGVcIjogYmlsbGluZ2RhdGEucGF5bWVudHR5cGUsIFwicGF5bWVudGdhdHdheVwiOiBiaWxsaW5nZGF0YS5wYXltZW50Z2F0d2F5LCBcImNhcmRudW1iZXJcIjogYmlsbGluZ2RhdGEuY2FyZG51bWJlcixcblx0XHRcdFwiY2FyZHR5cGVcIjogYmlsbGluZ2RhdGEuY2FyZHR5cGVcblx0XHR9O1xuXHRcdGNvbnNvbGUubG9nKGNhcmQpO1xuXG4gICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoeyAnY2FyZCc6IGNhcmQsJ2JpbGxkZXRhaWwnOiBiaWxsZGV0YWlsICB9KTtcbi8vICAgICAgICBjb25zb2xlLmxvZyhib2R5X2pzb24pO1xuLy8gICAgICAgIHZhciBib2R5ID0gYm9keV9qc29uLnJlcGxhY2UoL1xcXFwvZyxcIlwiKTtcbi8vLy9sZXQgYm9keT1KU09OLnN0cmluZ2lmeShib2R5X2pzb24pO1xuXHRcdGNvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9iaWxsaW5nL2JpbGxpbmdcIiwgYm9keSwgb3B0aW9ucylcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy51c2VyO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuXG5cblx0XHQvL3JldHVybiBib2R5O1xuICAgIH1cbiAgICB0ZWxsYWZyaWVuZChmcmllbmRFbWFpbDogc3RyaW5nLCBpZDogc3RyaW5nKSB7XG4gICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgZW1haWw6IGZyaWVuZEVtYWlsLCBpZDogaWRcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9iaWxsaW5nL2ludml0ZWZyaWVuZFwiLCBib2R5LCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgICAgICAgICAvL3JldHVybiB0aGlzLnVzZXI7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gICAgfVxuICAgIHZhbGlkYXRlcHJvbW9jb2RlKGNvZGU6IHN0cmluZywgaWQ6IHN0cmluZykge1xuICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIHByb21vY29kZTogY29kZSwgaWQ6IGlkXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvYmlsbGluZy92YWxpZGF0ZXByb21vY29kZVwiLCBib2R5LCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgICAgICAgICAvL3JldHVybiB0aGlzLnVzZXI7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG5cbiAgICB9XG4gICAgY2hrc3ViZG9tYWluKHN1YmRvbWFpbjogc3RyaW5nKSB7XG5cbiAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBzdWJkb21haW46IHN1YmRvbWFpblxuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBkbWxsZDJadmIzVnpaWEk2TWpNek1YTmtOVFpoTkRVMmN6TmtNVFJoY3pZPVwiIH0pO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChteUdsb2JhbHMuc2VydmljZVVybCArIFwiL3NpZ251cC92YWxpZGF0ZXN1YmRvbWFpblwiLCBib2R5LCBvcHRpb25zKVxuXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gICAgICAgIC8vICAgICAgICAgLm1hcCgocmVzOlJlc3BvbnMgICAgICAgIGUpID0+IHJlcy5qc29uKCkpXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAvLyAgICAgICAgICAgZGF0YSA9PiB7IGNvICAgICAgICBuc29sZS5sb2coZGF0YSl9LFxuICAgICAgICAvLyAgICAgICAgICAgIGVyciA9PiBjbyAgICAgICAgbnNvbGUuZXJyb3IoZXJyKSxcbiAgICAgICAgLy8gICAgICAgICAgICAoKSA9PiBjbyAgICAgICAgbnNvbGUubG9nKCdkb25lJylcbiAgICAgICAgLy8gICAgICAgICAgICApO1xuICAgICAgICAvLy8vICAgICAgICAgICAgIC5zdWJzYyAgICAgICAgcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0KXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgY29uICAgICAgICBzb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZSAgICAgICAgO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgfSxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyAgICAgICAgLm1lc3NhZ2UgPSBlcnJvcjtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdWJkb21haW4gICAgICAgICAgZmFpbDogXCIgKyBlcnJvcik7XG4gICAgICAgIC8vICAgICAgICAgfSk7XG5cblxuXG4gICAgfVxuXG5cbiAgICB2aWV3Zm9vY3JlYXRlKGNvbnRhaW5lcnR5cGU6IHN0cmluZywgaWQ6IHN0cmluZykge1xuICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGNvbnRhaW5lcnR5cGU6IGNvbnRhaW5lcnR5cGUsXG4gICAgICAgICAgICB1c2VyaWQ6IGlkXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi92aWV3Zm9vXCIsIGJvZHksIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMudXNlcjtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG5cbiAgICB2aWV3Zm9vZGVsZXRlKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGlkOiBpZDtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi92aWV3Zm9vL1wiICsgaWQsIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMudXNlcjtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG5cbiAgICB2aWV3Zm9vRGV0YWlsKHZpZXdmb29pZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG5cbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChteUdsb2JhbHMuc2VydmljZVVybCArIFwiL3ZpZXdmb28vXCIgKyB2aWV3Zm9vaWQsIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIC8vdGhpcy51c2VyID0gYm9keS5kYXRhO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coYm9keS5zdWNjZXNzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgICAgICAgICAvL3JldHVybiB0aGlzLnVzZXI7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gICAgfVxuXG4gICAgLy8tLS0tLS0tLS0tIENvbnRhaW5lciBTZXJ2aWNlcyAtLS0tLS0tLS0tXG4gICAgY29udGFpbmVyQ3JlYXRlKGNvbnRhaW5lcnR5cGU6IHN0cmluZywgdmlld2Zvb2lkOiBzdHJpbmcsIHVzZXJpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG5cbiAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICB2aWV3Zm9vaWQ6IHZpZXdmb29pZCxcbiAgICAgICAgICAgIHVzZXJpZDogdXNlcmlkLFxuICAgICAgICAgICAgY29udGFpbmVydHlwZTogY29udGFpbmVydHlwZVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChteUdsb2JhbHMuc2VydmljZVVybCArIFwiL2NvbnRhaW5lclwiLCBib2R5LCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICAvL3RoaXMudXNlciA9IGJvZHkuZGF0YTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGJvZHkuc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy51c2VyO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cblxuICAgIGNvbnRhaW5lclVwZGF0ZShjb250YWluZXJ1cGRhdGVEaWN0OiBhbnksIGNvbnRhaW5lcmlkOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeShjb250YWluZXJ1cGRhdGVEaWN0KTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9jb250YWluZXJcIiwgYm9keSwgb3B0aW9ucylcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy51c2VyO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cblxuXG4gICAgYWRkZm9sZGVyKGlkOiBzdHJpbmcsIGZvbGRlcm5hbWU6IHN0cmluZywgZm9sZGVydHlwZTogc3RyaW5nLCBwYXJlbnRmb2xkZXJpZDogc3RyaW5nKSB7XG5cdFx0bGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBmb2xkZXJuYW1lOiBmb2xkZXJuYW1lLFxuICAgICAgICAgICAgdXNlcmlkOiBpZCxcbiAgICAgICAgICAgIGZvbGRlcnR5cGU6IGZvbGRlcnR5cGUsXG4gICAgICAgICAgICBwYXJlbnRpZDogcGFyZW50Zm9sZGVyaWRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9mb2xkZXJcIiwgYm9keSwgb3B0aW9ucylcblx0XHRcdC8vIHJldHVybiB0aGlzLmh0dHAucG9zdChcImh0dHA6Ly8xOTIuMTY4LjAuMTgzOjEzMzdcIiArIFwiL2ZvbGRlclwiLCBib2R5LCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG5cbiAgICB9XG5cbiAgICB2aWV3Zm9vdXBkYXRlKHZpZXdmb29pZDogc3RyaW5nLCB2YWw6IHN0cmluZywgc2V0dGluZ3R5cGU6IHN0cmluZykge1xuXG4gICAgICAgIGlmIChzZXR0aW5ndHlwZSA9PSBcImFsbG93c2hhcmluZ1wiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0aWQ6IHZpZXdmb29pZCxcblx0XHRcdFx0YWxsb3dzaGFyaW5nOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwiYWxsb3djb21tZW50XCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRpZDogdmlld2Zvb2lkLFxuXHRcdFx0XHRhbGxvd2NvbW1lbnQ6IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuXHRcdGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwiYWxsb3dzZWxlY3Rpb25cIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdGlkOiB2aWV3Zm9vaWQsXG5cdFx0XHRcdGFsbG93c2VsZWN0aW9uOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cdFx0ZWxzZSBpZiAoc2V0dGluZ3R5cGUgPT0gXCJpbWFnZXNpemVcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdGlkOiB2aWV3Zm9vaWQsXG5cdFx0XHRcdGltYWdlc2l6ZTogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcImltYWdlZGF0YW1vdXNlaG92ZXJcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdGlkOiB2aWV3Zm9vaWQsXG5cdFx0XHRcdGltYWdlZGF0YW1vdXNlaG92ZXI6IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2V0dGluZ3R5cGUgPT0gXCJpbWFnZWluZm9mcmFtZVwiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0aWQ6IHZpZXdmb29pZCxcblx0XHRcdFx0aW1hZ2VpbmZvZnJhbWU6IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblx0XHRlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcImltYWdlZGVmYXVsdG5vXCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRpZDogdmlld2Zvb2lkLFxuXHRcdFx0XHRpbWFnZWRlZmF1bHRubzogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG5cdFx0ZWxzZSBpZiAoc2V0dGluZ3R5cGUgPT0gXCJiYWNrZ3JvdW5kY29sb3JcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdGlkOiB2aWV3Zm9vaWQsXG5cdFx0XHRcdGJhY2tncm91bmRjb2xvcjogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXHRcdGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwibWVudWZvbnRjb2xvclwiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0aWQ6IHZpZXdmb29pZCxcblx0XHRcdFx0bWVudWZvbnRjb2xvcjogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXHRcdGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwibWVudWJhY2tncm91bmRjb2xvclwiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0aWQ6IHZpZXdmb29pZCxcblx0XHRcdFx0bWVudWJhY2tncm91bmRjb2xvcjogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG5cblxuXG4gICAgICAgIC8vbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0Ly8gaWQ6IHZpZXdmb29pZCxcblx0XHQvL2FsbG93c2hhcmluZzogdmFsXG5cdFx0Ly8gfSk7XG5cdFx0Ly8gY29uc29sZS5sb2c9KHZhbCk7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBkbWxsZDJadmIzVnpaWEk2TWpNek1YTmtOVFpoTkRVMmN6TmtNVFJoY3pZPVwiIH0pO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvdmlld2Zvb1wiLCBib2R5LCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMudXNlcjtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG4gICAgcHVibGlzaHZpZXdmb291cGRhdGUodmlld2Zvb2lkOiBzdHJpbmcsIHZmdGl0bGU6IHN0cmluZywgdmZ0YWdzOiBzdHJpbmcsIGZvbGRlcmlkOiBzdHJpbmcsIHZpZXdmb290eXBlOiBzdHJpbmcpIHtcblx0XHRsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGlkOiB2aWV3Zm9vaWQsXG4gICAgICAgICAgICB2aWV3Zm9vdGl0bGU6IHZmdGl0bGUsXG4gICAgICAgICAgICB0YWdzOiB2ZnRhZ3MsXG4gICAgICAgICAgICBmb2xkZXJpZDogZm9sZGVyaWQsXG4gICAgICAgICAgICB2aWV3Zm9vdHlwZTogdmlld2Zvb3R5cGVcblx0XHR9KTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi92aWV3Zm9vXCIsIGJvZHksIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy51c2VyO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cbiAgICB1c2Vyc2V0dGluZyh1c2VyaWQ6IHN0cmluZywgdmFsOiBzdHJpbmcsIHNldHRpbmd0eXBlOiBzdHJpbmcpIHtcblxuICAgICAgICBpZiAoc2V0dGluZ3R5cGUgPT0gXCJtZW51c3R5bGVcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHVzZXJpZDogdXNlcmlkLFxuXHRcdFx0XHRuYXZwb3NpdGlvbjogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcInZpZXdmb29zdHlsZVwiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0dXNlcmlkOiB1c2VyaWQsXG5cdFx0XHRcdHZpZXdmb29kaXNwbGF5OiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cblx0XHRlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcInZpZXdmb29vcHRpb25cIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHVzZXJpZDogdXNlcmlkLFxuXHRcdFx0XHR2aWV3Zm9vb3B0aW9uOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cdFx0ZWxzZSBpZiAoc2V0dGluZ3R5cGUgPT0gXCJhbGxvd3NoYXJpbmdcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHVzZXJpZDogdXNlcmlkLFxuXHRcdFx0XHRhbGxvd3NoYXJpbmc6IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2V0dGluZ3R5cGUgPT0gXCJhbGxvd2NvbW1lbnRcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHVzZXJpZDogdXNlcmlkLFxuXHRcdFx0XHRhbGxvd2NvbW1lbnQ6IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2V0dGluZ3R5cGUgPT0gXCJhbGxvd3NlbGVjdGlvblwiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0dXNlcmlkOiB1c2VyaWQsXG5cdFx0XHRcdGFsbG93c2VsZWN0aW9uOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cdFx0ZWxzZSBpZiAoc2V0dGluZ3R5cGUgPT0gXCJkaXNhYmxlcmlnaHRtb3VzZWJ0blwiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0dXNlcmlkOiB1c2VyaWQsXG5cdFx0XHRcdGRpc2FibGVyaWdodG1vdXNlYnRuOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cblx0XHRlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcInNoYXJpbmdmaWxlaW5mb1wiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0dXNlcmlkOiB1c2VyaWQsXG5cdFx0XHRcdHNoYXJpbmdmaWxlaW5mbzogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXHRcdGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwiYWRkbG9nb25hbWVcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHVzZXJpZDogdXNlcmlkLFxuXHRcdFx0XHRsb2dvdGV4dDogdmFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc2xvZ286J3RleHQnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXHRcdGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwibG9nb2ltYWdlXCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHR1c2VyaWQ6IHVzZXJpZCxcblx0XHRcdFx0bG9nb2ltYWdlOiB2YWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzbG9nbzonaW1hZ2UnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXHRcdGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwiZmFjZWJvb2tcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHVzZXJpZDogdXNlcmlkLFxuXHRcdFx0XHRmYWNlYm9vazogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXHRcdGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwidHdpdHRlclwiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0dXNlcmlkOiB1c2VyaWQsXG5cdFx0XHRcdHR3aXR0ZXI6IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblx0XHRlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcImdvb2dsZXBsdXNcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHVzZXJpZDogdXNlcmlkLFxuXHRcdFx0XHRnb29nbGVwbHVzOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cdFx0ZWxzZSBpZiAoc2V0dGluZ3R5cGUgPT0gXCJpbnN0YWdyYW1cIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHVzZXJpZDogdXNlcmlkLFxuXHRcdFx0XHRpbnN0YWdyYW06IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblx0XHRlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcInBpbnRlcmVzdFwiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0dXNlcmlkOiB1c2VyaWQsXG5cdFx0XHRcdHBpbnRlcmVzdDogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXHRcdGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwid29yZHByZXNzXCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHR1c2VyaWQ6IHVzZXJpZCxcblx0XHRcdFx0d29yZHByZXNzOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cdFx0ZWxzZSBpZiAoc2V0dGluZ3R5cGUgPT0gXCJ5b3V0dWJlXCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHR1c2VyaWQ6IHVzZXJpZCxcblx0XHRcdFx0eW91dHViZTogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXHRcdGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwidmliZXJcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHVzZXJpZDogdXNlcmlkLFxuXHRcdFx0XHR2aWJlcjogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXHRcdGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwibGlua2RpblwiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0dXNlcmlkOiB1c2VyaWQsXG5cdFx0XHRcdGxpbmtkaW46IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblx0XHRlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcImJlaGFuY2VcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHVzZXJpZDogdXNlcmlkLFxuXHRcdFx0XHRiZWhhbmNlOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cdFx0ZWxzZSBpZiAoc2V0dGluZ3R5cGUgPT0gXCJ0dW1ibGVyXCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHR1c2VyaWQ6IHVzZXJpZCxcblx0XHRcdFx0dHVtYmxlcjogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXHRcdGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwiZHJvcGJveFwiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0dXNlcmlkOiB1c2VyaWQsXG5cdFx0XHRcdGRyb3Bib3g6IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblx0XHRlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcImFkZGZvb3RlclwiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0dXNlcmlkOiB1c2VyaWQsXG5cdFx0XHRcdGZvb3RlcnRleHQ6IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblx0XHRlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcIm1lbnVjb2xvclwiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0dXNlcmlkOiB1c2VyaWQsXG5cdFx0XHRcdG1lbnVjb2xvcjogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXHRcdGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwiZm9udGNvbG9yXCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHR1c2VyaWQ6IHVzZXJpZCxcblx0XHRcdFx0Zm9udGNvbG9yOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwibW9iaWxlbnVtYmVyXCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHR1c2VyaWQ6IHVzZXJpZCxcblx0XHRcdFx0bW9iaWxlbnVtYmVyOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cdFx0ZWxzZSBpZiAoc2V0dGluZ3R5cGUgPT0gXCJvZmZpY2VudW1iZXJcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdHVzZXJpZDogdXNlcmlkLFxuXHRcdFx0XHRvZmZpY2VudW1iZXI6IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuXG5cblxuXG4gICAgICAgIC8vbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG5cdFx0Ly8gaWQ6IHZpZXdmb29pZCxcblx0XHQvL2FsbG93c2hhcmluZzogdmFsXG5cdFx0Ly8gfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuXHRcdHJldHVybiB0aGlzLmh0dHAucG9zdChteUdsb2JhbHMuc2VydmljZVVybCArIFwiL3NldHRpbmcvdXNlcnNldHRpbmdcIiwgYm9keSwgb3B0aW9ucylcblx0XHRcdC8vcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFwiaHR0cDovLzE5Mi4xNjguMC4xODM6MTMzN1wiKyBcIi9zZXR0aW5nL3VzZXJzZXR0aW5nXCIsIGJvZHksIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy51c2VyO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cblxuICAgIGNvbnRhaW5lckRlbGV0ZShjb250YWluZXJpZDogc3RyaW5nKSB7XG5cbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9jb250YWluZXIvXCIgKyBjb250YWluZXJpZCwgb3B0aW9ucylcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy51c2VyO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cblxuICAgIC8vLS0tLS0tLS0tLS0gQ29udGFpbmVyIEltYWdlIC0tLS0tLS0tLS0tLS0tXG4gICAgY29udGFpbmVySW1hZ2VEZWxldGUoY29udGFpbmVyaW1hZ2VpZDogc3RyaW5nKSB7XG5cbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9jb250YWluZXJpbWFnZS9cIiArIGNvbnRhaW5lcmltYWdlaWQsIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMudXNlcjtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gICAgfVxuXHR2aWV3Zm9vbGlzdChpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGxldCBpZCA9IGlkO1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChteUdsb2JhbHMuc2VydmljZVVybCArIFwiL3ZpZXdmb28vbGlzdC9cIiArIGlkLCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcblxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cblxuXG5cbiAgICBhbGx2aWV3Zm9vbGlzdCh2aWV3Zm9vdHlwZTogc3RyaW5nLCBpZDogc3RyaW5nLCBwZXJwYWdlOiBudW1iZXIsIHBhZ2VubzogbnVtYmVyKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGxldCBpZCA9IGlkO1xuICAgICAgICBsZXQgcGVycGFnZSA9IHBlcnBhZ2U7XG4gICAgICAgIGxldCBwYWdlbm8gPSBwYWdlbm87XG4gICAgICAgIGNvbnNvbGUubG9nKHBlcnBhZ2UpO1xuICAgICAgICBjb25zb2xlLmxvZyhwYWdlbm8pO1xuXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBkbWxsZDJadmIzVnpaWEk2TWpNek1YTmtOVFpoTkRVMmN6TmtNVFJoY3pZPVwiIH0pO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG5cbiAgICAgICAgbGV0IHVybCA9IG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvdmlld2Zvby9hbGxsaXN0L1wiXG5cdFx0XHQrIGlkICsgXCIvXCIgKyBwZXJwYWdlICsgXCIvXCIgKyBwYWdlbm8gKyBcIi9cIiArIHZpZXdmb290eXBlXG5cdFx0cmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCBvcHRpb25zKVxuXHRcdFx0Lm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gICAgfVxuXG4gICAgZm9sZGVybGlzdChpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGxldCBpZCA9IGlkO1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChteUdsb2JhbHMuc2VydmljZVVybCArIFwiL2ZvbGRlci9cIiArIGlkLCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gICAgfVxuICAgIHN1YmZvbGRlcmxpc3QoaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBsZXQgaWQgPSBpZDtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9zdWIvZm9sZGVyL1wiICsgaWQsIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gICAgfVxuXG5cbiAgICBncmlkaXRlbW9wdGlvbihncmlkb3B0aW9uczogR3JpZE9wdGlvbnMpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeShncmlkb3B0aW9ucyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9jb250YWluZXIvZ3JpZGl0ZW1vcHRpb25cIiwgYm9keSwgb3B0aW9ucylcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy51c2VyO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuXG4gICAgfVxuICAgIGdldHVzZXJzZXR0aW5nKGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgbGV0IGlkID0gaWQ7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBkbWxsZDJadmIzVnpaWEk2TWpNek1YTmtOVFpoTkRVMmN6TmtNVFJoY3pZPVwiIH0pO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvc2V0dGluZy9ob21wYWdlL1wiICsgaWQsIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG5cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG4gICAgc2VuZE1haWwoZW1haWxBZGRyZXNzZXM6IHN0cmluZywgbWFpbGJvZHk6IHN0cmluZywgaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGZyaWVuZGVtYWlsOiBlbWFpbEFkZHJlc3NlcyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1haWxib2R5LFxuICAgICAgICAgICAgdXNlcmlkOiBpZFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBkbWxsZDJadmIzVnpaWEk2TWpNek1YTmtOVFpoTkRVMmN6TmtNVFJoY3pZPVwiIH0pO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcImh0dHA6Ly8xOTIuMTY4LjAuMTgzOjEzMzcvZnJpZW5kbGlzdFwiLCBib2R5LCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgICAgICAgICAvL3JldHVybiB0aGlzLnVzZXI7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gICAgfVxuXG4gICAgcHVibGljZm9sZGVybGlzdChzdWJkb21haW46IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBsZXQgc3ViZG9tYWluID0gc3ViZG9tYWluO1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChteUdsb2JhbHMuc2VydmljZVVybCArIFwiL2ZvbGRlci9zdWJkb21haW4vXCIgKyBzdWJkb21haW4sIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cblxuICAgIHB1YmxpY3ZpZXdmb28oc3ViZG9tYWluOiBhbnksIGZvbGRlcmlkOiBzdHJpbmcsIG5vb2ZwYWdlOiBhbnksIHBhZ2VubzogYW55KTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGxldCBpZCA9IGlkO1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChteUdsb2JhbHMuc2VydmljZVVybCArIFwiL3ZpZXdmb28vXCIrc3ViZG9tYWluK1wiL2ZvbGRlci9cIiArIGZvbGRlcmlkK1wiL1wiK25vb2ZwYWdlK1wiL1wiK3BhZ2Vubywgb3B0aW9ucylcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keSA9IHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gICAgfVxuXG4gICAgdXNlcnB1YmxpY2hvbWVzZXR0aW5ncyhzdWJkb21haW46IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBsZXQgc3ViZG9tYWluID0gc3ViZG9tYWluO1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChteUdsb2JhbHMuc2VydmljZVVybCArIFwiL3NldHRpbmcvc3ViZG9tYWluL1wiICsgc3ViZG9tYWluLCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG5cbiAgICBnZXRyZWFsdGltZW5vdGlmaWNhdGlvbnNldHRpbmcoaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBsZXQgaWQgPSBpZDtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9yZWFsdGltZW5vdGlmaWNhdGlvbi9cIiArIGlkLCBvcHRpb25zKVxuICAgICAgICAgICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cbiAgICBcbiAgICB2aWV3Zm9vZ2V0Y29tbWVudChpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGxldCBpZCA9IGlkO1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgXCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgZG1sbGQyWnZiM1Z6WlhJNk1qTXpNWE5rTlRaaE5EVTJjek5rTVRSaGN6WT1cIiB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChteUdsb2JhbHMuc2VydmljZVVybCArIFwiL2NvbW1lbnQvXCIgKyBpZCsnL3ZpZXdmb28nLCBvcHRpb25zKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0VGVsbGFmcmllbmRsaXN0KGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgbGV0IGlkID0gaWQ7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBkbWxsZDJadmIzVnpaWEk2TWpNek1YTmtOVFpoTkRVMmN6TmtNVFJoY3pZPVwiIH0pO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KG15R2xvYmFscy5zZXJ2aWNlVXJsICsgXCIvZnJpZW5kbGlzdC9cIiArIGlkLCBvcHRpb25zKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG4gICAgdmlld2Zvb2FkZGNvbW1lbnQodXNlcmlkOnN0cmluZyxjb21tZW50dHlwZTpzdHJpbmcsY29tbWVudDpzdHJpbmcsdmlld2Zvb2lkOnN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBsZXQgdXNlcmlkID0gdXNlcmlkO1xuICAgICAgICBsZXQgdmlld2Zvb2lkID0gdmlld2Zvb2lkO1xuICAgICAgICBsZXQgY29tbWVudHR5cGUgPSBjb21tZW50dHlwZTtcbiAgICAgICAgaWYoY29tbWVudHR5cGU9PSd2aWV3Zm9vJyl7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJpZDogdXNlcmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmlld2Zvb2lkOiB2aWV3Zm9vaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tZW50dHlwZTpjb21tZW50dHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnR0ZXh0OmNvbW1lbnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ZWxzZSBpZihjb21tZW50dHlwZT09J2NvbnRhaW5lcmltYWdlJyl7XG4gICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcmlkOiB1c2VyaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3Zm9vaWQ6IHZpZXdmb29pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnR0eXBlOmNvbW1lbnR0eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudHRleHQ6Y29tbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyaWQ6Y29udGFpbmVyaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXJpbWFnZWlkOmNvbnRhaW5lcmltYWdlaWRcbiAgICAgICAgICAgIH0pOyBcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIFwiQXV0aG9yaXphdGlvblwiOiBcIkJhc2ljIGRtbGxkMlp2YjNWelpYSTZNak16TVhOa05UWmhORFUyY3pOa01UUmhjelk9XCIgfSk7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcblx0XHRyZXR1cm4gdGhpcy5odHRwLnBvc3QobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9jb21tZW50XCIsIGJvZHksIG9wdGlvbnMpXG4gICAgICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgICAgICAgICAvL3JldHVybiB0aGlzLnVzZXI7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gICAgICAgIGNvbnNvbGUubG9nKCdoZXJlJyk7XG5cbiAgICB9XG5cbiAgICByZWFsdGltZW5vdGlmaWNhdGlvbnNldHRpbmcodXNlcmlkOiBzdHJpbmcsIHZhbDogc3RyaW5nLCBzZXR0aW5ndHlwZTogc3RyaW5nKSB7XG5cbiAgICAgICAgaWYgKHNldHRpbmd0eXBlID09IFwibW9iaWxlbnVtYmVyXCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJpZDogdXNlcmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vYmlsZW51bWJlciA6IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoc2V0dGluZ3R5cGUgPT0gXCJpc3NoYXJpbmdcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcmlkOiB1c2VyaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNzaGFyaW5nIDogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcInNoYXJpbmd0eXBlXCIpIHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJpZDogdXNlcmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoYXJpbmd0eXBlIDogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcImlzcGhvdG9cIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcmlkOiB1c2VyaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNwaG90byA6IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoc2V0dGluZ3R5cGUgPT0gXCJwaG90b3R5cGVcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcmlkOiB1c2VyaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGhvdG90eXBlIDogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcImlzcGhvdG9zZWxlY3Rpb25cIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcmlkOiB1c2VyaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNwaG90b3NlbGVjdGlvbiA6IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoc2V0dGluZ3R5cGUgPT0gXCJwaG90b3NlbGVjdGlvbnR5cGVcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcmlkOiB1c2VyaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGhvdG9zZWxlY3Rpb250eXBlIDogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcImlzY2hhdG9yY29tbWVudFwiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyaWQ6IHVzZXJpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc2NoYXRvcmNvbW1lbnQgOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwiY2hhdG9yY29tbWVudHR5cGVcIikge1xuICAgICAgICAgICAgbGV0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcmlkOiB1c2VyaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhdG9yY29tbWVudHR5cGUgOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHNldHRpbmd0eXBlID09IFwiaXN2aWV3Zm9vbmV3c1wiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyaWQ6IHVzZXJpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc3ZpZXdmb29uZXdzIDogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChzZXR0aW5ndHlwZSA9PSBcInZpZXdmb29uZXdzdHlwZVwiKSB7XG4gICAgICAgICAgICBsZXQgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyaWQ6IHVzZXJpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3Zm9vbmV3c3R5cGUgOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coYm9keSk7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCBcIkF1dGhvcml6YXRpb25cIjogXCJCYXNpYyBkbWxsZDJadmIzVnpaWEk2TWpNek1YTmtOVFpoTkRVMmN6TmtNVFJoY3pZPVwiIH0pO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG5cdFx0cmV0dXJuIHRoaXMuaHR0cC5wdXQobXlHbG9iYWxzLnNlcnZpY2VVcmwgKyBcIi9yZWFsdGltZW5vdGlmaWNhdGlvblwiLCBib2R5LCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGJvZHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMudXNlcjtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvck1lc3NhZ2UoZXJyb3I6IGFueSkge1xuICAgICAgICAvL2NvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29uKCkubWVzc2FnZSB8fCAnU2VydmVyIGVycm9yJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogYW55KSB7XG4gICAgICAgIC8vY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKS5lcnJvciB8fCAnU2VydmVyIGVycm9yJyk7XG4gICAgfVxuXG4gICAgcHVibGljIHB1YmxpY1ZpZXdmb29DaGFuZ2VTb3VyY2UgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gICAgLy8gT2JzZXJ2YWJsZSBzdHJpbmcgc3RyZWFtc1xuICAgIHB1YmxpY1ZpZXdmb29DaGFuZ2VkJCA9IHRoaXMucHVibGljVmlld2Zvb0NoYW5nZVNvdXJjZS5hc09ic2VydmFibGUoKTtcblxuXG59XG4iXX0=
