import { bind } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { FORM_PROVIDERS, LocationStrategy, HashLocationStrategy, NgModel } from '@angular/common';

import { Sorter } from './shared/utils/sorter';
import { DataService } from './shared/services/data.service';
import { TrackByService } from './shared/services/trackby.service';
import { AuthService } from './shared/services/auth.service';
import { ProjectService } from './shared/services/project.service';

export const APP_PROVIDERS = [
    Sorter,
    DataService,
    TrackByService,
    FORM_PROVIDERS,
    NgModel,
    HTTP_PROVIDERS,
    AuthService,
    ProjectService,

    //bind(LocationStrategy).toClass(HashLocationStrategy)
];