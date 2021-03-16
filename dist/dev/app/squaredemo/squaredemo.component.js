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
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var SquareDemoComponent = (function () {
    function SquareDemoComponent() {
    }
    SquareDemoComponent.prototype.ngOnInit = function () {
        this.sqPaymentForm = new SqPaymentForm({
            applicationId: 'sq0idp-nzmxxE_jbcOiUCNjsmtKSw',
            inputClass: 'sq-input',
            cardNumber: {
                elementId: 'sq-card-number',
                placeholder: "0000 0000 0000 0000"
            },
            cvv: {
                elementId: 'sq-cvv',
                placeholder: 'CVV'
            },
            expirationDate: {
                elementId: 'sq-expiration-date',
                placeholder: 'MM/YY'
            },
            postalCode: {
                elementId: 'sq-postal-code',
                placeholder: 'Postal Code'
            },
            inputStyles: [
                {
                    fontSize: '14px',
                    padding: '3px'
                },
                {
                    mediaMaxWidth: '400px',
                    fontSize: '18px',
                }
            ],
            callbacks: {
                cardNonceResponseReceived: function (errors, nonce, cardData) {
                    if (errors) {
                        var errorDiv = document.getElementById('errors');
                        errorDiv.innerHTML = "";
                        errors.forEach(function (error) {
                            var p = document.createElement('p');
                            p.innerHTML = error.message;
                            errorDiv.appendChild(p);
                        });
                    }
                    else {
                        console.log('Nonce received:');
                        console.log(nonce);
                        console.log(JSON.stringify(cardData));
                        var nonceField = document.getElementById('card-nonce');
                        nonceField.value = nonce;
                    }
                },
                unsupportedBrowserDetected: function () {
                }
            }
        });
    };
    SquareDemoComponent.prototype.ngAfterViewInit = function () {
        this.sqPaymentForm.build();
    };
    SquareDemoComponent.prototype.submitButtonClick = function () {
        this.sqPaymentForm.requestCardNonce();
    };
    SquareDemoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'squaredemo',
            templateUrl: 'squaredemo.component.html',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], SquareDemoComponent);
    return SquareDemoComponent;
}());
exports.SquareDemoComponent = SquareDemoComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zcXVhcmVkZW1vL3NxdWFyZWRlbW8uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBZ0MsZUFBZSxDQUFDLENBQUE7QUFDaEQsdUJBQXdDLGlCQUFpQixDQUFDLENBQUE7QUFLMUQsc0JBQ0ssZ0JBQWdCLENBQUMsQ0FBQTtBQWF0QjtJQUFBO0lBc0ZBLENBQUM7SUFsRkcsc0NBQVEsR0FBUjtRQUNLLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxhQUFhLENBQUM7WUFNMUMsYUFBYSxFQUFFLCtCQUErQjtZQUM5QyxVQUFVLEVBQUUsVUFBVTtZQUN0QixVQUFVLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLGdCQUFnQjtnQkFDM0IsV0FBVyxFQUFFLHFCQUFxQjthQUNuQztZQUNELEdBQUcsRUFBRTtnQkFDSCxTQUFTLEVBQUUsUUFBUTtnQkFDbkIsV0FBVyxFQUFFLEtBQUs7YUFDbkI7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsU0FBUyxFQUFFLG9CQUFvQjtnQkFDL0IsV0FBVyxFQUFFLE9BQU87YUFDckI7WUFDRCxVQUFVLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLGdCQUFnQjtnQkFDM0IsV0FBVyxFQUFFLGFBQWE7YUFDM0I7WUFDRCxXQUFXLEVBQUU7Z0JBSVg7b0JBQ0UsUUFBUSxFQUFFLE1BQU07b0JBQ2hCLE9BQU8sRUFBRSxLQUFLO2lCQUNmO2dCQUlEO29CQUNFLGFBQWEsRUFBRSxPQUFPO29CQUN0QixRQUFRLEVBQUUsTUFBTTtpQkFDakI7YUFDRjtZQUNELFNBQVMsRUFBRTtnQkFDVCx5QkFBeUIsRUFBRSxVQUFTLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUTtvQkFDekQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDWCxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUNqRCxRQUFRLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQzt3QkFDeEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFTLEtBQUs7NEJBQzNCLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ3BDLENBQUMsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQzs0QkFDNUIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFFRixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7d0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO3dCQUcxQyxJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUN2RCxVQUFVLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFJM0IsQ0FBQztnQkFDSCxDQUFDO2dCQUNELDBCQUEwQixFQUFFO2dCQUU1QixDQUFDO2FBQ0Y7U0FFRixDQUFDLENBQUM7SUFDSCxDQUFDO0lBQ0QsNkNBQWUsR0FBZjtRQUVJLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUNDLCtDQUFpQixHQUFqQjtRQUVBLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBNUZMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsWUFBWTtZQUN0QixXQUFXLEVBQUUsMkJBQTJCO1lBQ3ZDLFVBQVUsRUFBRSxDQUFDLGdDQUF3QixFQUFFLDBCQUFpQixDQUFDO1NBRzdELENBQUM7OzJCQUFBO0lBd0ZGLDBCQUFDO0FBQUQsQ0F0RkEsQUFzRkMsSUFBQTtBQXRGWSwyQkFBbUIsc0JBc0YvQixDQUFBIiwiZmlsZSI6ImFwcC9zcXVhcmVkZW1vL3NxdWFyZWRlbW8uY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTLCBSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzJztcblxuLy9pbXBvcnQge0ZPUk1fRElSRUNUSVZFUywgRm9ybUJ1aWxkZXIsIENvbnRyb2wsIENvbnRyb2xHcm91cCwgVmFsaWRhdG9ycywgbmdmb3JtfSBmcm9tICdAYW5ndWxhci9jb21tb24nXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBWYWxpZGF0b3JzLCBGb3JtQnVpbGRlciwgUkVBQ1RJVkVfRk9STV9ESVJFQ1RJVkVTIH1cbmZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCBteUdsb2JhbHMgPSByZXF1aXJlKCcuLi9nbG9iYWxzJyk7XG5pbXBvcnQge0N1c3RvbVZhbGlkYXRvcnN9IGZyb20gJy4uL3NoYXJlZC91dGlscy9DdXN0b21WYWxpZGF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ3NxdWFyZWRlbW8nLFxuICAgIHRlbXBsYXRlVXJsOiAnc3F1YXJlZGVtby5jb21wb25lbnQuaHRtbCcsXG4gICAgIGRpcmVjdGl2ZXM6IFtSRUFDVElWRV9GT1JNX0RJUkVDVElWRVMsIFJPVVRFUl9ESVJFQ1RJVkVTXVxuICBcblxufSlcblxuZXhwb3J0IGNsYXNzIFNxdWFyZURlbW9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIFxuICAgIHNxUGF5bWVudEZvcm06YW55O1xuICAgIFxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICAgdGhpcy5zcVBheW1lbnRGb3JtID0gbmV3IFNxUGF5bWVudEZvcm0oe1xuICAgICAgICAgXG4gICAgICBcbiAgICAgIC8vIFJlcGxhY2UgdGhpcyB2YWx1ZSB3aXRoIHlvdXIgYXBwbGljYXRpb24ncyBJRCAoYXZhaWxhYmxlIGZyb20gdGhlIG1lcmNoYW50IGRhc2hib2FyZCkuXG4gICAgICAvLyBJZiB5b3UncmUganVzdCB0ZXN0aW5nIHRoaW5ncyBvdXQsIHJlcGxhY2UgdGhpcyB3aXRoIHlvdXIgX1NhbmRib3hfIGFwcGxpY2F0aW9uIElELFxuICAgICAgLy8gd2hpY2ggaXMgYWxzbyBhdmFpbGFibGUgdGhlcmUuXG4gICAgICBhcHBsaWNhdGlvbklkOiAnc3EwaWRwLW56bXh4RV9qYmNPaVVDTmpzbXRLU3cnLFxuICAgICAgaW5wdXRDbGFzczogJ3NxLWlucHV0JyxcbiAgICAgIGNhcmROdW1iZXI6IHtcbiAgICAgICAgZWxlbWVudElkOiAnc3EtY2FyZC1udW1iZXInLFxuICAgICAgICBwbGFjZWhvbGRlcjogXCIwMDAwIDAwMDAgMDAwMCAwMDAwXCJcbiAgICAgIH0sXG4gICAgICBjdnY6IHtcbiAgICAgICAgZWxlbWVudElkOiAnc3EtY3Z2JyxcbiAgICAgICAgcGxhY2Vob2xkZXI6ICdDVlYnXG4gICAgICB9LFxuICAgICAgZXhwaXJhdGlvbkRhdGU6IHtcbiAgICAgICAgZWxlbWVudElkOiAnc3EtZXhwaXJhdGlvbi1kYXRlJyxcbiAgICAgICAgcGxhY2Vob2xkZXI6ICdNTS9ZWSdcbiAgICAgIH0sXG4gICAgICBwb3N0YWxDb2RlOiB7XG4gICAgICAgIGVsZW1lbnRJZDogJ3NxLXBvc3RhbC1jb2RlJyxcbiAgICAgICAgcGxhY2Vob2xkZXI6ICdQb3N0YWwgQ29kZSdcbiAgICAgIH0sXG4gICAgICBpbnB1dFN0eWxlczogW1xuICAgICAgICAvLyBCZWNhdXNlIHRoaXMgb2JqZWN0IHByb3ZpZGVzIG5vIHZhbHVlIGZvciBtZWRpYU1heFdpZHRoIG9yIG1lZGlhTWluV2lkdGgsXG4gICAgICAgIC8vIHRoZXNlIHN0eWxlcyBhcHBseSBmb3Igc2NyZWVucyBvZiBhbGwgc2l6ZXMsIHVubGVzcyBvdmVycmlkZGVuIGJ5IGFub3RoZXJcbiAgICAgICAgLy8gaW5wdXQgc3R5bGUgYmVsb3cuXG4gICAgICAgIHtcbiAgICAgICAgICBmb250U2l6ZTogJzE0cHgnLFxuICAgICAgICAgIHBhZGRpbmc6ICczcHgnXG4gICAgICAgIH0sXG4gICAgICAgIC8vIFRoZXNlIHN0eWxlcyBhcmUgYXBwbGllZCB0byBpbnB1dHMgT05MWSB3aGVuIHRoZSBzY3JlZW4gd2lkdGggaXMgNDAwcHhcbiAgICAgICAgLy8gb3Igc21hbGxlci4gTm90ZSB0aGF0IGJlY2F1c2UgaXQgZG9lc24ndCBzcGVjaWZ5IGEgdmFsdWUgZm9yIHBhZGRpbmcsXG4gICAgICAgIC8vIHRoZSBwYWRkaW5nIHZhbHVlIGluIHRoZSBwcmV2aW91cyBvYmplY3QgaXMgcHJlc2VydmVkLlxuICAgICAgICB7XG4gICAgICAgICAgbWVkaWFNYXhXaWR0aDogJzQwMHB4JyxcbiAgICAgICAgICBmb250U2l6ZTogJzE4cHgnLFxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgY2FsbGJhY2tzOiB7XG4gICAgICAgIGNhcmROb25jZVJlc3BvbnNlUmVjZWl2ZWQ6IGZ1bmN0aW9uKGVycm9ycywgbm9uY2UsIGNhcmREYXRhKSB7XG4gICAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgICAgdmFyIGVycm9yRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Vycm9ycycpO1xuICAgICAgICAgICAgZXJyb3JEaXYuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgIGVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgIHZhciBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgICBwLmlubmVySFRNTCA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICAgIGVycm9yRGl2LmFwcGVuZENoaWxkKHApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRoaXMgYWxlcnQgaXMgZm9yIGRlYnVnZ2luZyBwdXJwb3NlcyBvbmx5LlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdOb25jZSByZWNlaXZlZDonKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhub25jZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoY2FyZERhdGEpKTtcbiAgICAgICAgICAgIC8vYWxlcnQoJ05vbmNlIHJlY2VpdmVkISAnICsgbm9uY2UgKyAnICcgKyBKU09OLnN0cmluZ2lmeShjYXJkRGF0YSkpO1xuICAgICAgICAgICAgLy8gQXNzaWduIHRoZSB2YWx1ZSBvZiB0aGUgbm9uY2UgdG8gYSBoaWRkZW4gZm9ybSBlbGVtZW50XG4gICAgICAgICAgICB2YXIgbm9uY2VGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXJkLW5vbmNlJyk7XG4gICAgICAgICAgICBub25jZUZpZWxkLnZhbHVlID0gbm9uY2U7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFN1Ym1pdCB0aGUgZm9ybVxuICAgICAgICAgICAgLy9kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybScpLnN1Ym1pdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdW5zdXBwb3J0ZWRCcm93c2VyRGV0ZWN0ZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIEFsZXJ0IHRoZSBidXllciB0aGF0IHRoZWlyIGJyb3dzZXIgaXMgbm90IHN1cHBvcnRlZFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzcVBheW1lbnRGb3JtIGluaXQnKTtcbiAgICB9KTtcbiAgICB9XG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zcVBheW1lbnRGb3JtLmJ1aWxkKCk7XG4gICAgfVxuICAgICAgc3VibWl0QnV0dG9uQ2xpY2soKSB7XG4gICAgICBcbiAgICAgIHRoaXMuc3FQYXltZW50Rm9ybS5yZXF1ZXN0Q2FyZE5vbmNlKCk7XG4gICAgfVxuICAgIFxuICAgIFxufSJdfQ==
