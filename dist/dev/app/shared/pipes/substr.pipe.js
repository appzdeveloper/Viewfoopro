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
var SubstrPipe = (function () {
    function SubstrPipe() {
    }
    SubstrPipe.prototype.transform = function (value) {
        if (!value) {
            return '';
        }
        else {
            var splitArray = value.split("/");
            return splitArray[splitArray.length - 1];
        }
    };
    SubstrPipe = __decorate([
        core_1.Pipe({ name: 'substr' }), 
        __metadata('design:paramtypes', [])
    ], SubstrPipe);
    return SubstrPipe;
}());
exports.SubstrPipe = SubstrPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcGlwZXMvc3Vic3RyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFrQyxlQUFlLENBQUMsQ0FBQTtBQUdsRDtJQUFBO0lBa0JBLENBQUM7SUFqQkcsOEJBQVMsR0FBVCxVQUFVLEtBQVU7UUFDaEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1QsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUVGLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDO1FBUTNDLENBQUM7SUFDTCxDQUFDO0lBbEJMO1FBQUMsV0FBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDOztrQkFBQTtJQW1CekIsaUJBQUM7QUFBRCxDQWxCQSxBQWtCQyxJQUFBO0FBbEJZLGtCQUFVLGFBa0J0QixDQUFBIiwiZmlsZSI6ImFwcC9zaGFyZWQvcGlwZXMvc3Vic3RyLnBpcGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7IG5hbWU6ICdzdWJzdHInIH0pXG5leHBvcnQgY2xhc3MgU3Vic3RyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogYW55KSB7XG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHNwbGl0QXJyYXkgPSB2YWx1ZS5zcGxpdChcIi9cIik7XG4gICAgICAgICAgICByZXR1cm4gc3BsaXRBcnJheVtzcGxpdEFycmF5Lmxlbmd0aC0xXTtcbi8vICAgICAgICAgICAgXG4vLyAgICAgICAgICAgIHZhciBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCk7XG4vLyAgICAgICAgICAgIHZhciB5ZWFyID0gY3VycmVudFRpbWUuZ2V0RnVsbFllYXIoKTtcbi8vICAgICAgICAgICAgdmFyIG4gPSB2YWx1ZS5pbmRleE9mKHllYXIgKyBcIi9cIik7XG4vLyAgICAgICAgICAgIHZhciBzdWIgPSB2YWx1ZS5zdWJzdHIobiArIDUsIHZhbHVlLmxlbmd0aCk7XG5cbiAgICAgICAgICAgIC8vcmV0dXJuIHN1YjtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
