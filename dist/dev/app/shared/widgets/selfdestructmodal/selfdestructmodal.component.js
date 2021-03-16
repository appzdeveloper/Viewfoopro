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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var auth_service_1 = require('../../services/auth.service');
var myGlobals = require('../../../globals');
var SelfDestructModal = (function () {
    function SelfDestructModal(_router, authService, builder) {
        this._router = _router;
        this.authService = authService;
        this.builder = builder;
        this.currentday = 0;
        this.currenthour = 0;
        this.currentminute = 0;
        this.currentsecond = 0;
        this.loginUser = myGlobals.LoginUser;
    }
    SelfDestructModal.prototype.checkday = function (val) {
        var day = document.getElementById("changeDay").innerHTML;
        var d = parseInt(day);
        this.currentday = d;
        if (val == "increase") {
            this.currentday++;
        }
        else if (val == "decrease") {
            if (this.currentday == 0) {
                this.currentday = 0;
            }
            else {
                this.currentday--;
            }
        }
    };
    SelfDestructModal.prototype.checkhour = function (val) {
        var hour = document.getElementById("changeHours").innerHTML;
        var h = parseInt(hour);
        this.currenthour = h;
        if (val == "increase") {
            if (this.currenthour == 23) {
                this.currenthour = 0;
            }
            this.currenthour++;
        }
        else if (val == "decrease") {
            if (this.currenthour == 0) {
                this.currenthour = 23;
            }
            this.currenthour--;
        }
    };
    SelfDestructModal.prototype.checkminute = function (val) {
        var minute = document.getElementById("changeMinute").innerHTML;
        var m = parseInt(minute);
        this.currentminute = m;
        if (val == "increase") {
            if (this.currentminute == 59) {
                this.currentminute = 0;
            }
            this.currentminute++;
        }
        else if (val == "decrease") {
            if (this.currentminute == 0) {
                this.currentminute = 59;
            }
            this.currentminute--;
        }
    };
    SelfDestructModal.prototype.checksecond = function (val) {
        var second = document.getElementById("changeSecond").innerHTML;
        var s = parseInt(second);
        this.currentsecond = s;
        if (val == "increase") {
            if (this.currentsecond == 59) {
                this.currentsecond = 0;
            }
            this.currentsecond++;
        }
        else if (val == "decrease") {
            if (this.currentsecond == 0) {
                this.currentsecond = 59;
            }
            this.currentsecond--;
        }
    };
    SelfDestructModal.prototype.selfdestructalert = function () {
        $("#selfdestructModal").modal("hide");
    };
    SelfDestructModal.prototype.selfdestructactivate = function () {
        var _this = this;
        var currentviewfooid = this.currViewfooid;
        var currentday = this.currentday;
        var currenthour = this.currenthour;
        var currentminute = this.currentminute;
        var currentsecond = this.currentsecond;
        this.authService.selfdestruct(currentviewfooid, currentday, currenthour, currentminute, currentsecond)
            .subscribe(function (result) {
            if (result) {
                console.log(result);
                var link = ['/viewfoodetail', currentviewfooid];
                _this._router.navigate(link);
            }
        }, function (error) {
            console.log("self destruct fail: " + error);
        });
    };
    SelfDestructModal.prototype.cnacelselfdestruct = function () {
        $("#selfdestructalert").modal("hide");
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SelfDestructModal.prototype, "currViewfooid", void 0);
    SelfDestructModal = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'selfdestructmodal',
            templateUrl: 'selfdestructmodal.component.html',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES, common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Router, auth_service_1.AuthService, forms_1.FormBuilder])
    ], SelfDestructModal);
    return SelfDestructModal;
}());
exports.SelfDestructModal = SelfDestructModal;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvd2lkZ2V0cy9zZWxmZGVzdHJ1Y3Rtb2RhbC9zZWxmZGVzdHJ1Y3Rtb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLHFCQUVLLGVBQWUsQ0FBQyxDQUFBO0FBQ3JCLHVCQUE4QixpQkFBaUIsQ0FBQyxDQUFBO0FBQ2hELHNCQUEwRixnQkFBZ0IsQ0FBQyxDQUFBO0FBQzNHLHVCQUFnRCxpQkFBaUIsQ0FBQyxDQUFBO0FBRWxFLDZCQUE0Qiw2QkFBNkIsQ0FBQyxDQUFBO0FBRzFELElBQU8sU0FBUyxXQUFXLGtCQUFrQixDQUFDLENBQUM7QUFTL0M7SUFPSSwyQkFBb0IsT0FBZSxFQUFVLFdBQXdCLEVBQVUsT0FBb0I7UUFBL0UsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBYTtRQUw1RixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBQ3hCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBRzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQztJQUV6QyxDQUFDO0lBRUQsb0NBQVEsR0FBUixVQUFTLEdBQUc7UUFDUixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUN6RCxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEIsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RCLENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJ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LENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCw4Q0FBa0IsR0FBbEI7UUFFSSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFMUMsQ0FBQztJQWhIRDtRQUFDLFlBQUssRUFBRTs7NERBQUE7SUFQWjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixXQUFXLEVBQUUsa0NBQWtDO1lBQy9DLFVBQVUsRUFBRSxDQUFDLGdDQUF3QixFQUFFLHdCQUFlLENBQUM7U0FDMUQsQ0FBQzs7eUJBQUE7SUFvSEYsd0JBQUM7QUFBRCxDQW5IQSxBQW1IQyxJQUFBO0FBbkhZLHlCQUFpQixvQkFtSDdCLENBQUEiLCJmaWxlIjoiYXBwL3NoYXJlZC93aWRnZXRzL3NlbGZkZXN0cnVjdG1vZGFsL3NlbGZkZXN0cnVjdG1vZGFsLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBOZ1pvbmUsIElucHV0LCBPdXRwdXQsIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLCBSZW5kZXJlciwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2UsIENoYW5nZURldGVjdG9yUmVmLCBWaWV3Q2hpbGR9XG5mcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q09SRV9ESVJFQ1RJVkVTfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgVmFsaWRhdG9ycywgRm9ybUJ1aWxkZXIsIFJFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7Um91dGVzLCBSb3V0ZXIsIFJPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld2ZvbyB9IGZyb20gJy4uLy4uaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICcuLi8uLmludGVyZmFjZXMnO1xuaW1wb3J0IG15R2xvYmFscyA9IHJlcXVpcmUoJy4uLy4uLy4uL2dsb2JhbHMnKTtcbmltcG9ydCB7Q3VzdG9tVmFsaWRhdG9yc30gZnJvbSAnLi4vLi4vdXRpbHMvQ3VzdG9tVmFsaWRhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdzZWxmZGVzdHJ1Y3Rtb2RhbCcsXG4gICAgdGVtcGxhdGVVcmw6ICdzZWxmZGVzdHJ1Y3Rtb2RhbC5jb21wb25lbnQuaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW1JFQUNUSVZFX0ZPUk1fRElSRUNUSVZFUywgQ09SRV9ESVJFQ1RJVkVTXVxufSlcbmV4cG9ydCBjbGFzcyBTZWxmRGVzdHJ1Y3RNb2RhbCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgcHVibGljIGN1cnJWaWV3Zm9vaWQ6IGFueTtcbiAgICBwdWJsaWMgY3VycmVudGRheTogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgY3VycmVudGhvdXI6IG51bWJlciA9IDA7XG4gICAgcHVibGljIGN1cnJlbnRtaW51dGU6IG51bWJlciA9IDA7XG4gICAgcHVibGljIGN1cnJlbnRzZWNvbmQ6IG51bWJlciA9IDA7XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLCBwcml2YXRlIGJ1aWxkZXI6IEZvcm1CdWlsZGVyKSB7XG4gICAgICAgIHRoaXMubG9naW5Vc2VyID0gbXlHbG9iYWxzLkxvZ2luVXNlcjtcblxuICAgIH1cbiAgICBcbiAgICBjaGVja2RheSh2YWwpIHtcbiAgICAgICAgdmFyIGRheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhbmdlRGF5XCIpLmlubmVySFRNTDtcbiAgICAgICAgdmFyIGQgPSBwYXJzZUludChkYXkpO1xuICAgICAgICB0aGlzLmN1cnJlbnRkYXkgPSBkO1xuICAgICAgICBpZiAodmFsID09IFwiaW5jcmVhc2VcIikge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50ZGF5Kys7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsID09IFwiZGVjcmVhc2VcIikge1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudGRheSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50ZGF5ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudGRheS0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNoZWNraG91cih2YWwpIHtcbiAgICAgICAgdmFyIGhvdXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYW5nZUhvdXJzXCIpLmlubmVySFRNTDtcbiAgICAgICAgdmFyIGggPSBwYXJzZUludChob3VyKTtcbiAgICAgICAgdGhpcy5jdXJyZW50aG91ciA9IGg7XG4gICAgICAgIGlmICh2YWwgPT0gXCJpbmNyZWFzZVwiKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50aG91ciA9PSAyMykge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudGhvdXIgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jdXJyZW50aG91cisrO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbCA9PSBcImRlY3JlYXNlXCIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRob3VyID09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRob3VyID0gMjM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRob3VyLS07XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hlY2ttaW51dGUodmFsKSB7XG4gICAgICAgIHZhciBtaW51dGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYW5nZU1pbnV0ZVwiKS5pbm5lckhUTUw7XG4gICAgICAgIHZhciBtID0gcGFyc2VJbnQobWludXRlKTtcbiAgICAgICAgdGhpcy5jdXJyZW50bWludXRlID0gbTtcbiAgICAgICAgaWYgKHZhbCA9PSBcImluY3JlYXNlXCIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRtaW51dGUgPT0gNTkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRtaW51dGUgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jdXJyZW50bWludXRlKys7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsID09IFwiZGVjcmVhc2VcIikge1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudG1pbnV0ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50bWludXRlID0gNTk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRtaW51dGUtLTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGVja3NlY29uZCh2YWwpIHtcbiAgICAgICAgdmFyIHNlY29uZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhbmdlU2Vjb25kXCIpLmlubmVySFRNTDtcbiAgICAgICAgdmFyIHMgPSBwYXJzZUludChzZWNvbmQpO1xuICAgICAgICB0aGlzLmN1cnJlbnRzZWNvbmQgPSBzO1xuICAgICAgICBpZiAodmFsID09IFwiaW5jcmVhc2VcIikge1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudHNlY29uZCA9PSA1OSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudHNlY29uZCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRzZWNvbmQrKztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWwgPT0gXCJkZWNyZWFzZVwiKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50c2Vjb25kID09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRzZWNvbmQgPSA1OTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY3VycmVudHNlY29uZC0tO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNlbGZkZXN0cnVjdGFsZXJ0KCkge1xuICAgICAgICAvLyQubW9kYWwuY2xvc2UoKTtcbiAgICAgICAgJChcIiNzZWxmZGVzdHJ1Y3RNb2RhbFwiKS5tb2RhbChcImhpZGVcIik7ICAgICAgICBcblxuXG4vLyAgICAgICAgYWxlcnQodGhpcy5jdXJyZW50ZGF5ICAgICAgICApO1xuLy8gICAgICAgIGFsZXJ0KHRoaXMuY3VycmVudGhvdXIgICAgICAgICk7XG4vLyAgICAgICAgYWxlcnQodGhpcy5jdXJyZW50bWludXRlICAgICAgICApO1xuLy8gICAgICAgIGFsZXJ0KHRoaXMuY3VycmVudHNlY29uZCk7XG5cbiAgICB9XG4gICAgc2VsZmRlc3RydWN0YWN0aXZhdGUoKSB7XG4gICAgICAgIGxldCBjdXJyZW50dmlld2Zvb2lkID0gdGhpcy5jdXJyVmlld2Zvb2lkO1xuICAgICAgICBsZXQgY3VycmVudGRheSA9IHRoaXMuY3VycmVudGRheTtcbiAgICAgICAgbGV0IGN1cnJlbnRob3VyID0gdGhpcy5jdXJyZW50aG91cjtcbiAgICAgICAgbGV0IGN1cnJlbnRtaW51dGUgPSB0aGlzLmN1cnJlbnRtaW51dGU7XG4gICAgICAgIGxldCBjdXJyZW50c2Vjb25kID0gdGhpcy5jdXJyZW50c2Vjb25kO1xuXG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uuc2VsZmRlc3RydWN0KGN1cnJlbnR2aWV3Zm9vaWQsIGN1cnJlbnRkYXksIGN1cnJlbnRob3VyLCBjdXJyZW50bWludXRlLCBjdXJyZW50c2Vjb25kKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbGluayA9IFsnL3ZpZXdmb29kZXRhaWwnLCBjdXJyZW50dmlld2Zvb2lkXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKGxpbmspO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZWxmIGRlc3RydWN0IGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY25hY2Vsc2VsZmRlc3RydWN0KCkge1xuICAgICAgICBcbiAgICAgICAgJChcIiNzZWxmZGVzdHJ1Y3RhbGVydFwiKS5tb2RhbChcImhpZGVcIik7XG5cbiAgICB9XG4gICAgXG59Il19
