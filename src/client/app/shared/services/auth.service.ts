import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
//import 'rxjs/Rx';  // use this line if you want to be lazy, otherwise:
import 'rxjs/add/operator/do';  // debug

import { User, Register, Profiledata } from '../interfaces';

import myGlobals = require('../../globals');

import { Subject }    from 'rxjs/Subject';

@Injectable()
export class AuthService {


    private profileImageChangeSource = new Subject<string>();

    // Observable string streams
    profileImageChanged$ = this.profileImageChangeSource.asObservable();

    user: User;

    constructor(private http: Http) { }

    login(username: string, password: string): Observable<User> {

        let body = JSON.stringify({
            email: username,
            password: password
        });
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(myGlobals.serviceUrl + "/auth/login", body, options)
            .map((res: Response) => {
                let body = res.json();
                //this.user = body.data;
                console.log(body.success);
                return body;
                //return this.user;

            })
            .catch(this.handleError);
    }

    register(register: Register): Observable<User> {
        let body = JSON.stringify(register);
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/signup/register", body, options)
            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;
                //return this.user;

            })
            .catch(this.handleError);

    }

    forgotpassword(forgotEmail: string) {
        let body = JSON.stringify({
            email: forgotEmail
        });
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/signup/forgotpassword", body, options)
            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;
                //return this.user;

            })
            .catch(this.handleError);
    }
    useractivation(activelink: string): Observable<User> {
        let link = activelink;
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/signup/useractivation/" + link, options)
            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;


            })
            .catch(this.handleError);
    }
    profilebase64(filename: string, id: string): Observable<User> {
        let body = JSON.stringify({
            id: id,
            file: filename
        });
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(myGlobals.imageUrl + "/profile/editprofilebase64", body, options)
            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;
                //return this.user;

            })
            .catch(this.handleError);


    }


    emitProfileChange() {
        this.profileImageChangeSource.next("");
    }

    viewprofile(id: string): Observable<User> {
        let body = JSON.stringify({
            id: id
        });
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/profile/viewprofile", body, options)
            .map((res: Response) => {
                let body = res.json();
                //console.log(body);
                return body;
                //return this.user;

            })
            .catch(this.handleError);

    }
	coverbase64(viewfooid: string, filename: string, id: string): Observable<User> {
        let body = JSON.stringify({
            id: viewfooid,
            coverimage: filename,
            userid: id
        });
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(myGlobals.imageUrl + "/coverimage/viewfoo", body, options)
            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;
                //return this.user;

            })
            .catch(this.handleError);

    }
    editprofile(profiledata: ProfileData): Observable<User> {
        let body = JSON.stringify(profiledata);
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/profile/editprofile", body, options)
            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;
                //return this.user;

            })
            .catch(this.handleError);

    }
    billing(billingdata: BillingData): Observable<User> {


           let billdetail ={
			"firstname": billingdata.firstname, "lastname": billingdata.lastname,
			"email": billingdata.email, "businessname": billingdata.businessname, "address": billingdata.address,
			"app": billingdata.app, "city": billingdata.city, "state": billingdata.state, "zipcode": billingdata.zipcode, "country": billingdata.country
		};

        console.log(billdetail);


         let card ={
			"cardtoken": billingdata.cardtoken, "userid": billingdata.userid,
			"paymenttype": billingdata.paymenttype, "paymentgatway": billingdata.paymentgatway, "cardnumber": billingdata.cardnumber,
			"cardtype": billingdata.cardtype
		};
		console.log(card);

        let body = JSON.stringify({ 'card': card,'billdetail': billdetail  });
//        console.log(body_json);
//        var body = body_json.replace(/\\/g,"");
////let body=JSON.stringify(body_json);
		console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/billing/billing", body, options)
            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;
                //return this.user;

            })
            .catch(this.handleError);


		//return body;
    }
    tellafriend(friendEmail: string, id: string) {
        let body = JSON.stringify({
            email: friendEmail, id: id
        });
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/billing/invitefriend", body, options)
            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;
                //return this.user;

            })
            .catch(this.handleError);
    }
    validatepromocode(code: string, id: string) {
        let body = JSON.stringify({
            promocode: code, id: id
        });
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/billing/validatepromocode", body, options)
            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;
                //return this.user;

            })
            .catch(this.handleError);

    }
    chksubdomain(subdomain: string) {

        let body = JSON.stringify({
            subdomain: subdomain
        });
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/signup/validatesubdomain", body, options)

            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;


            })
            .catch(this.handleError);
        //         .map((res:Respons        e) => res.json())
        //                 .subscribe(
        //           data => { co        nsole.log(data)},
        //            err => co        nsole.error(err),
        //            () => co        nsole.log('done')
        //            );
        ////             .subsc        ribe(result => {
        //                    if(result){
        //                con        sole.log(result);
        //                        return false;
        //                    } else{
        //                        return true        ;
        //                    }
        //        },
        //                 (error: any) => {
        //                           // this        .message = error;
        //
        //                console.log("subdomain          fail: " + error);
        //         });



    }


    viewfoocreate(containertype: string, id: string) {
        let body = JSON.stringify({
            containertype: containertype,
            userid: id
        });
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/viewfoo", body, options)
            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;
                //return this.user;

            })
            .catch(this.handleError);
    }

    viewfoodelete(id: string) {
        let id: id;
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(myGlobals.serviceUrl + "/viewfoo/" + id, options)
            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;
                //return this.user;

            })
            .catch(this.handleError);
    }

    viewfooDetail(viewfooid: string): Observable<User> {

        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(myGlobals.serviceUrl + "/viewfoo/" + viewfooid, options)
            .map((res: Response) => {
                let body = res.json();
                //this.user = body.data;
                //console.log(body.success);
                return body;
                //return this.user;

            })
            .catch(this.handleError);
    }

    //---------- Container Services ----------
    containerCreate(containertype: string, viewfooid: string, userid: string): Observable<User> {

        let body = JSON.stringify({
            viewfooid: viewfooid,
            userid: userid,
            containertype: containertype
        });

        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(myGlobals.serviceUrl + "/container", body, options)
            .map((res: Response) => {
                let body = res.json();
                //this.user = body.data;
                //console.log(body.success);
                return body;
                //return this.user;

            })
            .catch(this.handleError);
    }

    containerUpdate(containerupdateDict: any, containerid: string) {
        let body = JSON.stringify(containerupdateDict);
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(myGlobals.serviceUrl + "/container", body, options)
            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;
                //return this.user;

            })
            .catch(this.handleError);
    }


    addfolder(id: string, foldername: string, foldertype: string, parentfolderid: string) {
		let body = JSON.stringify({
            foldername: foldername,
            userid: id,
            foldertype: foldertype,
            parentid: parentfolderid
        });

        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(myGlobals.serviceUrl + "/folder", body, options)
			// return this.http.post("http://192.168.0.183:1337" + "/folder", body, options)
            .map((res: Response) => {
                let body = res.json();

                return body;


            })
            .catch(this.handleError);

    }

    viewfooupdate(viewfooid: string, val: string, settingtype: string) {

        if (settingtype == "allowsharing") {
            let body = JSON.stringify({
				id: viewfooid,
				allowsharing: val
            });
        }
        else if (settingtype == "allowcomment") {
            let body = JSON.stringify({
				id: viewfooid,
				allowcomment: val
            });
        }

		else if (settingtype == "allowselection") {
            let body = JSON.stringify({
				id: viewfooid,
				allowselection: val
            });
        }
		else if (settingtype == "imagesize") {
            let body = JSON.stringify({
				id: viewfooid,
				imagesize: val
            });
        }
        else if (settingtype == "imagedatamousehover") {
            let body = JSON.stringify({
				id: viewfooid,
				imagedatamousehover: val
            });
        }
        else if (settingtype == "imageinfoframe") {
            let body = JSON.stringify({
				id: viewfooid,
				imageinfoframe: val
            });
        }
        else if (settingtype == "applywatermark") {
            let body = JSON.stringify({
				id: viewfooid,
				applywatermark: val
            });
        }
		else if (settingtype == "imagedefaultno") {
            let body = JSON.stringify({
				id: viewfooid,
				imagedefaultno: val
            });
        }

		else if (settingtype == "backgroundcolor") {
            let body = JSON.stringify({
				id: viewfooid,
				backgroundcolor: val
            });
        }
		else if (settingtype == "menufontcolor") {
            let body = JSON.stringify({
				id: viewfooid,
				menufontcolor: val
            });
        }
		else if (settingtype == "menubackgroundcolor") {
            let body = JSON.stringify({
				id: viewfooid,
				menubackgroundcolor: val
            });
        }




        //let body = JSON.stringify({
		// id: viewfooid,
		//allowsharing: val
		// });
		// console.log=(val);
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(myGlobals.serviceUrl + "/viewfoo", body, options)
            .map((res: Response) => {
                let body = res.json();
                //console.log(body);
                return body;
                //return this.user;

            })
            .catch(this.handleError);
    }
    publishviewfooupdate(viewfooid: string, vftitle: string, vftags: string, folderid: string, viewfootype: string) {
		let body = JSON.stringify({
            id: viewfooid,
            viewfootitle: vftitle,
            tags: vftags,
            folderid: folderid,
            viewfootype: viewfootype
		});
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(myGlobals.serviceUrl + "/viewfoo", body, options)
            .map((res: Response) => {
                let body = res.json();
                //console.log(body);
                return body;
                //return this.user;

            })
            .catch(this.handleError);
    }
    usersetting(userid: string, val: string, settingtype: string) {

        if (settingtype == "menustyle") {
            let body = JSON.stringify({
				userid: userid,
				navposition: val
            });
        }
        else if (settingtype == "viewfoostyle") {
            let body = JSON.stringify({
				userid: userid,
				viewfoodisplay: val
            });
        }

		else if (settingtype == "viewfoooption") {
            let body = JSON.stringify({
				userid: userid,
				viewfoooption: val
            });
        }
		else if (settingtype == "allowsharing") {
            let body = JSON.stringify({
				userid: userid,
				allowsharing: val
            });
        }
        else if (settingtype == "allowcomment") {
            let body = JSON.stringify({
				userid: userid,
				allowcomment: val
            });
        }
        else if (settingtype == "allowselection") {
            let body = JSON.stringify({
				userid: userid,
				allowselection: val
            });
        }
		else if (settingtype == "disablerightmousebtn") {
            let body = JSON.stringify({
				userid: userid,
				disablerightmousebtn: val
            });
        }

		else if (settingtype == "sharingfileinfo") {
            let body = JSON.stringify({
				userid: userid,
				sharingfileinfo: val
            });
        }
		else if (settingtype == "addlogoname") {
            let body = JSON.stringify({
				userid: userid,
				logotext: val,
                                islogo:'text'
            });
        }
		else if (settingtype == "logoimage") {
            let body = JSON.stringify({
				userid: userid,
				logoimage: val,
                                islogo:'image'
            });
        }
		else if (settingtype == "facebook") {
            let body = JSON.stringify({
				userid: userid,
				facebook: val
            });
        }
		else if (settingtype == "twitter") {
            let body = JSON.stringify({
				userid: userid,
				twitter: val
            });
        }
		else if (settingtype == "googleplus") {
            let body = JSON.stringify({
				userid: userid,
				googleplus: val
            });
        }
		else if (settingtype == "instagram") {
            let body = JSON.stringify({
				userid: userid,
				instagram: val
            });
        }
		else if (settingtype == "pinterest") {
            let body = JSON.stringify({
				userid: userid,
				pinterest: val
            });
        }
		else if (settingtype == "wordpress") {
            let body = JSON.stringify({
				userid: userid,
				wordpress: val
            });
        }
		else if (settingtype == "youtube") {
            let body = JSON.stringify({
				userid: userid,
				youtube: val
            });
        }
		else if (settingtype == "viber") {
            let body = JSON.stringify({
				userid: userid,
				viber: val
            });
        }
		else if (settingtype == "linkdin") {
            let body = JSON.stringify({
				userid: userid,
				linkdin: val
            });
        }
		else if (settingtype == "behance") {
            let body = JSON.stringify({
				userid: userid,
				behance: val
            });
        }
		else if (settingtype == "tumbler") {
            let body = JSON.stringify({
				userid: userid,
				tumbler: val
            });
        }
		else if (settingtype == "dropbox") {
            let body = JSON.stringify({
				userid: userid,
				dropbox: val
            });
        }
		else if (settingtype == "addfooter") {
            let body = JSON.stringify({
				userid: userid,
				footertext: val
            });
        }
		else if (settingtype == "menucolor") {
            let body = JSON.stringify({
				userid: userid,
				menucolor: val
            });
        }
		else if (settingtype == "fontcolor") {
            let body = JSON.stringify({
				userid: userid,
				fontcolor: val
            });
        }
        else if (settingtype == "mobilenumber") {
            let body = JSON.stringify({
				userid: userid,
				mobilenumber: val
            });
        }
		else if (settingtype == "officenumber") {
            let body = JSON.stringify({
				userid: userid,
				officenumber: val
            });
        }





        //let body = JSON.stringify({
		// id: viewfooid,
		//allowsharing: val
		// });
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
		return this.http.post(myGlobals.serviceUrl + "/setting/usersetting", body, options)
			//return this.http.post("http://192.168.0.183:1337"+ "/setting/usersetting", body, options)
            .map((res: Response) => {
                let body = res.json();
                //console.log(body);
                return body;
                //return this.user;

            })
            .catch(this.handleError);
    }

    containerDelete(containerid: string) {

        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(myGlobals.serviceUrl + "/container/" + containerid, options)
            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;
                //return this.user;

            })
            .catch(this.handleError);
    }

    //----------- Container Image --------------
    containerImageDelete(containerimageid: string) {

        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(myGlobals.serviceUrl + "/containerimage/" + containerimageid, options)
            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;
                //return this.user;
            })
            .catch(this.handleError);
    }

    cancelsubscription(userid: string) {

        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(myGlobals.serviceUrl + "/billing/cancelsubscription/"+ userid, options)
            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;
                //return this.user;
            })
            .catch(this.handleError);

    }
	viewfoolist(id: string): Observable<User> {
        let id = id;
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/viewfoo/list/" + id, options)
            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;


            })
            .catch(this.handleError);
    }



    allviewfoolist(viewfootype: string, id: string, perpage: number, pageno: number): Observable<User> {
        let id = id;
        let perpage = perpage;
        let pageno = pageno;
        console.log(perpage);
        console.log(pageno);

        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });

        let url = myGlobals.serviceUrl + "/viewfoo/alllist/"
			+ id + "/" + perpage + "/" + pageno + "/" + viewfootype
		return this.http.get(url, options)
			.map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;
            })
            .catch(this.handleError);
    }

    folderlist(id: string): Observable<User> {
        let id = id;
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/folder/" + id, options)
            .map((res: Response) => {
                let body = res.json();
                //console.log(body);
                return body;


            })
            .catch(this.handleError);
    }
    subfolderlist(id: string): Observable<User> {
        let id = id;
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/sub/folder/" + id, options)
            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;


            })
            .catch(this.handleError);
    }


    griditemoption(gridoptions: GridOptions): Observable<User> {
        let body = JSON.stringify(gridoptions);
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/container/griditemoption", body, options)
            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;
                //return this.user;

            })
            .catch(this.handleError);

    }
    getusersetting(id: string): Observable<User> {
        let id = id;
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/setting/hompage/" + id, options)
            .map((res: Response) => {
                let body = res.json();
                //console.log(body);
                return body;


            })
            .catch(this.handleError);
    }
    sendMail(emailAddresses: string, mailbody: string, id: string): Observable<User> {
        let body = JSON.stringify({
            friendemail: emailAddresses,
            message: mailbody,
            userid: id
        });
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.post("http://192.168.0.183:1337/friendlist", body, options)
            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;
                //return this.user;

            })
            .catch(this.handleError);
    }

    publicfolderlist(subdomain: string): Observable<User> {
        let subdomain = subdomain;
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/folder/subdomain/" + subdomain, options)
            .map((res: Response) => {
                let body = res.json();
                //console.log(body);
                return body;
            })
            .catch(this.handleError);
    }

    publicviewfoo(subdomain: any, folderid: string, noofpage: any, pageno: any): Observable<User> {
        let id = id;
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/viewfoo/"+subdomain+"/folder/" + folderid+"/"+noofpage+"/"+pageno, options)
            .map((res: Response) => {
                let body = res.json();
                //console.log(body);
                return body;
            })
            .catch(this.handleError);
    }

    userpublichomesettings(subdomain: string): Observable<User> {
        let subdomain = subdomain;
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/setting/subdomain/" + subdomain, options)
            .map((res: Response) => {
                let body = res.json();
                //console.log(body);
                return body;
            })
            .catch(this.handleError);
    }

    getrealtimenotificationsetting(id: string): Observable<User> {
        let id = id;
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/realtimenotification/" + id, options)
                    .map((res: Response) => {
                let body = res.json();
                //console.log(body);
                return body;
            })
            .catch(this.handleError);
    }

    viewfoogetcomment(viewfooid: string,imageid:string): Observable<User> {
        
        let viewfooid =  (viewfooid!='' && viewfooid!=undefined)?viewfooid:'""';
        let imageid = (imageid!='' && imageid!=undefined)?imageid:'""';

        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        console.log(myGlobals.serviceUrl + "/viewstatistics/list/" + viewfooid+'/'+imageid+'/comment');
        return this.http.get(myGlobals.serviceUrl + "/viewstatistics/list/" + viewfooid+'/'+imageid+'/comment', options)
                                   .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;
            })
            .catch(this.handleError);
    }

    getTellafriendlist(id: string): Observable<User> {
        let id = id;
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/friendlist/" + id, options)
                                   .map((res: Response) => {
                let body = res.json();
                return body;

            })
            .catch(this.handleError);
    }
    viewfooaddcomment(actiontype:string,userid:string,comment:string,username:string,useremail:string,viewfooid:string,containerimageid:string): Observable<User> {
        let userid = userid;
        let actiontype = actiontype;
        let viewfooid = viewfooid;
        let containerimageid = containerimageid;
        let userid = userid;
        let useremail = useremail;
        let username = username;
       
        if(actiontype=='comment' && viewfooid!=undefined && containerimageid==undefined){
            let body = JSON.stringify({
                        userid: userid,
                        viewfooid: viewfooid,
                        useremail: useremail,
                        username:username,
                        actiontype:actiontype,
                        actiondata:comment
            });
        }else if(actiontype=='comment' && containerimageid!=undefined){
            let body = JSON.stringify({
                           containerimageid:containerimageid,
                           userid: userid,
                           useremail: useremail,
                           viewfooid: viewfooid,
                           username:username,
                           actiontype:actiontype,
                           actiondata:comment
               });
        }

        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
		return this.http.post(myGlobals.serviceUrl + "/viewstatistics", body, options)
                .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;
                //return this.user;

            })
            .catch(this.handleError);
        console.log('here');

    }
    generaterandompw(): Observable<User> {

        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/randompassword/viewfoo", options)
            .map((res: Response) => {
                let body = res.json();
                return body;
            })
            .catch(this.handleError);
    }
    passwordprotectedviefoo(passworddata:passwordData): Observable<User> {
        let body=JSON.stringify({
            id:passworddata.id,
    ispasswordprotected:passworddata.ispasswordprotected,
    viewfoopasswordtype:passworddata.viewfoopasswordtype,
    viewfoopassword:passworddata.viewfoopassword,
    sendpasswordbyemail:passworddata.chkmail,
    sendpasswordbysms:passworddata.chksms
        });
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(myGlobals.serviceUrl + "/passwordprotected/viewfoo", body, options)
            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;
                //return this.user;

            })
            .catch(this.handleError);

    }
    unlockviewfoo(id,password):Observable<User> {
             let body=JSON.stringify({
            id:id,
            viewfoopassword:password

        });
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(myGlobals.serviceUrl + "/checkpasswordprotected/viewfoo", body, options)
            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;
                //return this.user;

            })
            .catch(this.handleError);

    }

    forgotviewfoopassword(id,checksms):Observable<User> {
        let body = JSON.stringify({
            id: id,
            sendpasswordbyemail: true,
            sendpasswordbysms: checksms

        });
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/forgotpassword/viewfoo", body, options)
            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;
                //return this.user;

            })
            .catch(this.handleError);

    }
    selfdestruct(id,day,hour,minute,second):Observable<User> {
         let body = JSON.stringify({
            id: id,
            days:day,
            hours:hour,
            minutes:minute,
            seconds:second

        });
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/selfdestruct/viewfoo", body, options)
            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;
                //return this.user;

            })
            .catch(this.handleError);
        
    }
    userbillingdetail(id):Observable<User> {
         let body = JSON.stringify({
            userid: id
        });
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(myGlobals.serviceUrl + "/billing/userbillingdetail", body, options)
            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;
                //return this.user;

            })
            .catch(this.handleError);
    }

    realtimenotificationsetting(userid: string, val: string, settingtype: string) {

        if (settingtype == "mobilenumber") {
            let body = JSON.stringify({
                            userid: userid,
                            mobilenumber : val
            });
        } else if (settingtype == "issharing") {
            let body = JSON.stringify({
                            userid: userid,
                            issharing : val
            });
        } else if (settingtype == "sharingtype") {
            let body = JSON.stringify({
                            userid: userid,
                            sharingtype : val
            });
        } else if (settingtype == "isphoto") {
            let body = JSON.stringify({
                            userid: userid,
                            isphoto : val
            });
        } else if (settingtype == "phototype") {
            let body = JSON.stringify({
                            userid: userid,
                            phototype : val
            });
        } else if (settingtype == "isphotoselection") {
            let body = JSON.stringify({
                            userid: userid,
                            isphotoselection : val
            });
        } else if (settingtype == "photoselectiontype") {
            let body = JSON.stringify({
                            userid: userid,
                            photoselectiontype : val
            });
        } else if (settingtype == "ischatorcomment") {
            let body = JSON.stringify({
                            userid: userid,
                            ischatorcomment : val
            });
        } else if (settingtype == "chatorcommenttype") {
            let body = JSON.stringify({
                            userid: userid,
                            chatorcommenttype : val
            });
        } else if (settingtype == "isviewfoonews") {
            let body = JSON.stringify({
                            userid: userid,
                            isviewfoonews : val
            });
        } else if (settingtype == "viewfoonewstype") {
            let body = JSON.stringify({
                            userid: userid,
                            viewfoonewstype : val
            });
        }

        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
		return this.http.put(myGlobals.serviceUrl + "/realtimenotification", body, options)
            .map((res: Response) => {
                let body = res.json();
                //console.log(body);
                return body;
                //return this.user;

            })
            .catch(this.handleError);
    }
    
    setviewallnotification(id):Observable<User> {
        let body = JSON.stringify({
            receiveruserid: id,
        });
        console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(myGlobals.serviceUrl + "/notification/viewall", body, options)
            .map((res: Response) => {
                let body = res.json();
                console.log(body);
                return body;

            })
            .catch(this.handleError);

    }
    
    
    getviewallnotificationCount(id:string): Observable<User> {
        let id = id;
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/notification/"+id, options)
            .map((res: Response) => {
                let body = res.json();
                //console.log(body);
                return body;
            })
            .catch(this.handleError);
    }
    
    getviewallnotification(id:string): Observable<User> {
        let id = id;
        let headers = new Headers({ 'Content-Type': 'application/json', "Authorization": "Basic dmlld2Zvb3VzZXI6MjMzMXNkNTZhNDU2czNkMTRhczY=" });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(myGlobals.serviceUrl + "/notification/"+id+"/3/1", options)
            .map((res: Response) => {
                let body = res.json();
                //console.log(body);
                return body;
            })
            .catch(this.handleError);
    }
    
    private handleErrorMessage(error: any) {
        //console.error(error);
        return Observable.throw(error.json().message || 'Server error');
    }

    private handleError(error: any) {
        //console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    public publicViewfooChangeSource = new Subject<any>();
    // Observable string streams
    publicViewfooChanged$ = this.publicViewfooChangeSource.asObservable();

}
