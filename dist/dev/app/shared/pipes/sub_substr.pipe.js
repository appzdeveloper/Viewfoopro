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
var Sub_SubstrPipe = (function () {
    function Sub_SubstrPipe() {
    }
    Sub_SubstrPipe.prototype.transform = function (value, str) {
        if (!value) {
            return '';
        }
        else {
            var currentTime = new Date();
            var year = currentTime.getFullYear();
            var n = value.indexOf(year + "/");
            var m = str.indexOf(year + "/");
            var main_fld = str.substr(n + 5, value.length);
            var sub = value.substr((n + main_fld.length + 6), value.length);
            return sub;
        }
    };
    Sub_SubstrPipe = __decorate([
        core_1.Pipe({ name: 'sub_substr' }), 
        __metadata('design:paramtypes', [])
    ], Sub_SubstrPipe);
    return Sub_SubstrPipe;
}());
exports.Sub_SubstrPipe = Sub_SubstrPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcGlwZXMvc3ViX3N1YnN0ci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBa0MsZUFBZSxDQUFDLENBQUE7QUFHbEQ7SUFBQTtJQWtCQSxDQUFDO0lBakJDLGtDQUFTLEdBQVQsVUFBVSxLQUFVLEVBQUMsR0FBVTtRQUM3QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ1osQ0FBQztRQUNELElBQUksQ0FDSixDQUFDO1lBQ0UsSUFBSSxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUM3QixJQUFJLElBQUksR0FBRyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0IsSUFBSSxRQUFRLEdBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLEtBQUssQ0FBQyxNQUFNLENBQUUsQ0FBQztZQUU1QyxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLEVBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBRSxDQUFDO1lBRTlELE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDWCxDQUFDO0lBQ0gsQ0FBQztJQWxCSDtRQUFDLFdBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxZQUFZLEVBQUMsQ0FBQzs7c0JBQUE7SUFtQjNCLHFCQUFDO0FBQUQsQ0FsQkEsQUFrQkMsSUFBQTtBQWxCWSxzQkFBYyxpQkFrQjFCLENBQUEiLCJmaWxlIjoiYXBwL3NoYXJlZC9waXBlcy9zdWJfc3Vic3RyLnBpcGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7bmFtZTogJ3N1Yl9zdWJzdHInfSlcbmV4cG9ydCBjbGFzcyBTdWJfU3Vic3RyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odmFsdWU6IGFueSxzdHI6c3RyaW5nKSB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgIHZhciBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgdmFyIHllYXIgPSBjdXJyZW50VGltZS5nZXRGdWxsWWVhcigpO1xuICAgICAgIHZhciBuID0gdmFsdWUuaW5kZXhPZih5ZWFyK1wiL1wiKTtcbiAgICAgICAgdmFyIG0gPSBzdHIuaW5kZXhPZih5ZWFyK1wiL1wiKTtcbiAgICAgICB2YXIgbWFpbl9mbGQ9c3RyLnN1YnN0cihuKzUsdmFsdWUubGVuZ3RoICk7XG5cbiAgICAgIHZhciBzdWIgPSB2YWx1ZS5zdWJzdHIoKG4rbWFpbl9mbGQubGVuZ3RoKzYpLHZhbHVlLmxlbmd0aCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIHJldHVybiBzdWI7XG4gICAgfVxuICB9XG59XG5cbiJdfQ==
