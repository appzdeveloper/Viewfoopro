import { provideRouter, RouterConfig } from '@angular/router';

import { CustomersRoutes } from './customers/customers.routes';
import { CustomerRoutes } from './+customer/customer.routes';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './signup/signup.component';
import {ForgotPasswordComponent} from './forgotpassword/forgotpassword.component';

import {DashboardComponent} from './dashboard/dashboard.component';
import {HomeComponent} from './home/home.component';
import {UserActivationComponent} from './userActivation/useractivation.component';
import {ViewProfileComponent} from './viewprofile/viewprofile.component';
import {PublicHomepageSettingComponent} from './public_homepage_setting/public_homepage_setting.component';
import {EmailNotificationComponent} from './email_notification/email_notification.component';
import {BillingDetailComponent} from './billingdetail/billingdetail.component';
import {SupportComponent} from './support/support.component';
import {TrialBillingComponent} from './trial_billing/trial_billing.component';
import {ContactComponent} from './contact/contact.component';
import {TellAFriendComponent} from './tell_a_friend/tell_a_friend.component';
import {SelectTemplateComponent} from './select_template/select_template.component';

import {GallaryTemplateComponent} from './templates/viewfoo_pro_gallary/gallary_template.component'};

import {ViewfooDetailComponent} from './viewfoodetail/viewfoodetail.component'};

import {DemoCarousel} from './carousel/demo-carousel';
import {PublicDashboardComponent} from './publicviewfoolist/publicdashboard.component';
import {PublicViewfooListComponent} from './publicviewfoolist/publicviewfoolist.component';
import {PublicViewfooDetailComponent} from './publicviewfoolist/publicviewfoodetail.component';
PublicViewfooDetailComponent

import {RealtimenotificationComponent} from './real_time_notification/real_time_notification.component';
import {SquareDemoComponent} from './squaredemo/squaredemo.component';
const appRoutes: RouterConfig = [
  //...CustomersRoutes,
  //...CustomerRoutes
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'useractivation/:id', component: UserActivationComponent },
  { path: 'squaredemo', component: SquareDemoComponent },
  { path: 'singleviewfoo/:viewfooid', component: PublicViewfooDetailComponent },
  {
    path: 'users/:subdomain', component: PublicDashboardComponent,
    children: [
      { path: '', component: PublicViewfooListComponent },
      { path: ':viewfooid', component: PublicViewfooDetailComponent }
    ]
  },
  //{ path: '', component: DemoCarousel },
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'viewprofile', component: ViewProfileComponent },
      { path: 'publichomepagesetting', component: PublicHomepageSettingComponent },
      { path: 'emailnotification', component: EmailNotificationComponent },
      { path: 'billingdetail', component: BillingDetailComponent },
      { path: 'support', component: SupportComponent },
      { path: 'tellafriend', component: TellAFriendComponent },
      { path: 'trialbilling', component: TrialBillingComponent },
      { path: 'contact', component: ContactComponent },
      //{ path: 'addviewfoo', component: AddViewFooComponent },
      { path: 'select_template', component: SelectTemplateComponent },
      { path: 'gallary', component: GallaryTemplateComponent },
      { path: 'gallary/:viewfooid', component: GallaryTemplateComponent },
      { path: 'viewfoodetail/:viewfooid', component: PublicViewfooDetailComponent },
      { path: 'realtimenotification', component: RealtimenotificationComponent },

    ]
  }

];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(appRoutes)
];
