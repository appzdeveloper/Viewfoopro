import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/interfaces';
//import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators, ngform} from '@angular/common'
import { FormGroup, FormControl, Validators, FormBuilder, REACTIVE_FORM_DIRECTIVES }
from '@angular/forms';
import myGlobals = require('../globals');
import {CustomValidators} from '../shared/utils/CustomValidators';

@Component({
    moduleId: module.id,
    selector: 'billingdetail',
    templateUrl: 'billingdetail.component.html'
     directives: [REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES]

})

export class BillingDetailComponent implements OnInit {
    date: Date;
    subenddate: Date;
    day: number;
    loginUser: User;
    loading: boolean = false;
    public paymenttype: string = "monthly";
    public st_token: string;
    invalidcard: boolean = false;
    squareerror: boolean = false;
    firstname: FormControl;
    lastname: FormControl;
    email: FormControl;
    businessname: FormControl;
    bill_firstname: FormControl;
    bill_lastname: FormControl;
     cc_number: FormControl;
     expirydate: FormControl;
     expiryyear: FormControl;
    ccv: FormControl;
    address: FormControl;
    app: FormControl;
    city: FormControl;
    state: FormControl;
     zipcode: FormControl;
    country: FormControl;
    billform: FormGroup;
    ismonthly: boolean = true;
    sqPaymentForm: any;
    isloading: boolean = false;
    ismessage:boolean=false;
    message: string;

    month = ['01', '02', '03', '04', '05', '06',
        '07', '08', '09', '10', '11', '12'];
    public paymentform: any;
    public squarecarddata: any;
    constructor(private builder: FormBuilder, private _router: Router, private authService: AuthService) {
        this.createForm();
        this.loginUser = myGlobals.LoginUser;
    }
    createForm() {
        this.firstname = new FormControl('', Validators.required);
        this.lastname = new FormControl('', Validators.required);
        this.email = new FormControl('', Validators.compose([Validators.required, CustomValidators.emailValidator]));
        this.businessname = new FormControl('', Validators.required);
        this.bill_firstname = new FormControl('', Validators.required);
        this.bill_lastname = new FormControl('', Validators.required);
         this.cc_number = new FormControl('', Validators.compose([Validators.required, CustomValidators.cardValidator]));
         this.expirydate = new FormControl('', Validators.required);
        this.expiryyear = new FormControl('', Validators.required);
       //this.ccv = new FormControl('', Validators.required);
         this.ccv = new FormControl('', Validators.compose([Validators.required, CustomValidators.cvvValidator]));
        this.address = new FormControl('', Validators.required);
        this.app = new FormControl('', Validators.required);
        this.city = new FormControl('', Validators.required);
        this.state = new FormControl('', Validators.required);
       this.zipcode = new FormControl('', Validators.compose([Validators.required, CustomValidators.zipValidator]));
        this.country = new FormControl('', Validators.required);

        this.billform = this.builder.group({
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            businessname: this.businessname,
            bill_firstname: this.bill_firstname,
            bill_lastname: this.bill_lastname,
            cc_number: this.cc_number,
            expirydate: this.expirydate,
             expiryyear: this.expiryyear,
            ccv: this.ccv,
            address: this.address,
            app: this.app,
            city: this.city,
            state: this.state,
            zipcode: this.zipcode,
            country: this.country
        },
        );
    }

    ngOnInit() {

        //this.callsquareapi();
        if (this.loginUser) {
            this.billform.controls['firstname'].updateValue(this.loginUser.firstname);
            this.billform.controls['lastname'].updateValue(this.loginUser.lastname);
            this.billform.controls['email'].updateValue(this.loginUser.email);
            this.billform.controls['businessname'].updateValue(this.loginUser.firstname + " " + this.loginUser.lastname);
        }

        this.loginUser = myGlobals.LoginUser;
        this.calculatedays();
        //        this.date = new Date();
        //       // this.subscriptionenddate = '2016-07-03T09:34:10.487Z';
        //        //this.subenddate = new Date('this.loginUser.subscriptionenddate');
        //        this.subenddate = new Date(this.loginUser.subscriptionenddate);
        //        //if (this.loginUser.subscriptionenable == "no") {
        //        //let days=(new Date(2016,7,3))- (new Date(2016,6,18));
        //        if (this.subenddate < this.date) {
        //            this.day = 0;
        //        }
        //        else {
        //            let diff = (this.subenddate) - (this.date);
        //            this.day = Math.round(diff / 86400000);
        //        }
        $(".CBpaymenttype").change(function() {
            var checked = $(this).is(':checked');
            $(".CBpaymenttype").prop('checked', false);
            if (checked) {
                $(this).prop('checked', true);
            }
        });
    }

    ngAfterViewInit() {
        //this.paymentform = new SqarePaymentForm();
        //this.sqPaymentForm.build();
    }

    calculatedays() {
        this.date = new Date();
        // this.subscriptionenddate = '2016-07-03T09:34:10.487Z';
        //this.subenddate = new Date('this.loginUser.subscriptionenddate');
        this.subenddate = new Date(this.loginUser.subscriptionenddate);
        //if (this.loginUser.subscriptionenable == "no") {
        //let days=(new Date(2016,7,3))- (new Date(2016,6,18));
        if (this.subenddate < this.date) {
            this.day = 0;
        }
        else {
            let diff = (this.subenddate) - (this.date);
            this.day = Math.round(diff / 86400000);
        }
    }
//    callsquareapi() {
//
//        var self = this;
//        this.sqPaymentForm = new SqPaymentForm({
//            applicationId: 'sandbox-sq0idp-nzmxxE_jbcOiUCNjsmtKSw',
//            inputClass: 'sq-input',
//            cardNumber: {
//                elementId: 'sq-card-number',
//                placeholder: "Credit Card Number"
//            },
//            cvv: {
//                elementId: 'sq-cvv',
//                placeholder: 'CVV'
//            },
//            expirationDate: {
//                elementId: 'sq-expiration-date',
//                placeholder: 'Expiry Date'
//            },
//            postalCode: {
//                elementId: 'sq-postal-code',
//                placeholder: 'Postal Code'
//            },
//            inputStyles: [
//                {
//                    fontSize: '14px',
//                    fontWeight: 'lighter',
//                    padding: '3px',
//                    color: '#8a8a8a'
//         
//                },
//                {
//                    mediaMaxWidth: '400px',
//                    fontSize: '18px'
//                }
//            ],
//            callbacks: {
//                cardNonceResponseReceived: function(errors, nonce, cardData) {
//                    if (errors) {
//                        self.squareerror = true;
//                        var errorDiv = document.getElementById('errors');
//                        errorDiv.innerHTML = "";
//                        errors.forEach(function(error) {
//                            var p = document.createElement('p');
//                            p.innerHTML = error.message;
//                            errorDiv.appendChild(p);
//                            console.log(errors);
//                            return false;
//                        });
//                    } else {
//                        console.log('Nonce received:');
//                        console.log(nonce);
//                        console.log(JSON.stringify(cardData));
//                        self.squarecarddata = JSON.stringify(cardData);
//                        self.squareerror = false;
//                        var nonceField = document.getElementById('card-nonce');
//                        nonceField.value = nonce;
//                    }
//                },
//                unsupportedBrowserDetected: function() {
//                }
//            }
//
//        });
//    }

    updatebill() {
        this.isloading = true;
        // this.sqPaymentForm.requestCardNonce();
        this.generatetoken();
        var self = this;
        setTimeout(function() {

            let formdata = self.billform.value;
            //            if (self.squarecarddata) {
            //                let carddata = JSON.parse(self.squarecarddata);
            //                let cardnumber = "xxx-xxx-xxx-" + carddata.last_4;
            //                formdata["cardtype"] = carddata.card_brand;
            //                formdata["zipcode"] = carddata.billing_postal_code;
            //            }
            //            else {
            //
            //                return false;
            //            }
            let token = ($("#stripeToken").val());
            console.log("after time out");
            console.log(token);
            var cc_id = (formdata.cc_number).toString();
            var lastthree = cc_id.substr(cc_id.length - 3);
            let cardnumber = "xxx-xxx-xxx-" + lastthree;
    
            formdata["userid"] = self.loginUser.id;
            //formdata["userid"] = "576284a71168679115be0336";
            formdata["cardtoken"] = token;
            formdata["cardnumber"] = cardnumber;
            formdata["paymenttype"] = self.paymenttype;
            formdata["paymentgatway"] = "stripe";
            console.log(formdata);
            self.authService.billing(formdata)
                .subscribe((result) => {
                    self.isloading = false;
                    self.message=result.data;
                    self.ismessage=true;
                    if (result.userdetail) {
                        window.localStorage['user'] = JSON.stringify(result.userdetail);
                        self.loginUser = result.userdetail;
                        myGlobals.LoginUser =  self.loginUser;
                        
                    }
                    //self.sqPaymentForm.destroy();
                    self.calculatedays();
                    //  document.getElementById('card-nonce').value = '';
                    $("#errors").empty();
                    //self.sqPaymentForm.destroy();
                    //self.resetform();
                    //self.sqPaymentForm.build();
                setTimeout(function() {
                    self._router.navigate(['/']);
                    
                      }, 4000);
                }, (error: any) => {
                    self.isloading = false;
                    self.message=error;
                    self.ismessage=true;
                    //document.getElementById('card-nonce').value = '';
                    console.log(" billing fail: " + error);
                });

        }, 4000);
    }

    chngpaymenttype(value) {
        if (value == "monthly") {
            this.ismonthly = true;
        }
        else if (value == "yearly") {
            this.ismonthly = false;
        }
        this.paymenttype = value;
    }

    resetform() {
        this.createForm();
        // this.sqPaymentForm.destroy();
        // this.callsquareapi();
        //        if (this.loginUser) {
        //            this.billform.controls['firstname'].updateValue(this.loginUser.firstname);
        //            this.billform.controls['lastname'].updateValue(this.loginUser.lastname);
        //            this.billform.controls['email'].updateValue(this.loginUser.email);
        //            this.billform.controls['businessname'].updateValue(this.loginUser.firstname + " " + this.loginUser.lastname);
        //        }
    }


    generatetoken() {
        let formdata = this.billform.value;
        let ccnumber = formdata.cc_number;
        let month = formdata.expirydate;
        let year = formdata.expiryyear;
        let ccv = formdata.ccv;
        Stripe.setPublishableKey('pk_test_iOkLeaO4mZGOHZ2x6d6MYJdq');
        if ((Stripe.card.validateExpiry(month, year)) && (Stripe.card.validateCardNumber(ccnumber)) && (Stripe.card.validateCVC(ccv))) {
            Stripe.card.createToken({
                number: ccnumber,
                cvc: ccv,
                exp_month: month,
                exp_year: year
            }, stripeResponseHandler);
            this.invalidcard = false;
        }
        else {
            this.invalidcard = true;
            console.log("card information invalid");
        }
    }
    function stripeResponseHandler(status, response) {

    // Grab the form:
    var $form = $('#billingform');
    var self = this;
    if (response.error) {

        $form.find('.bank-errors').text(response.error.message);
        $form.find('button').prop('disabled', false);

    } else {

        var token = response.id;
        console.log(token);
        $form.append("<input type='hidden' id='stripeToken' value='" + token + "' />");

    }
}

}

