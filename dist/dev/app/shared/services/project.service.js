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
var http_2 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/do');
var myGlobals = require('../../globals');
var ProjectService = (function () {
    function ProjectService(http) {
        this.http = http;
    }
    ProjectService.prototype.projectList = function (pkuid) {
        var _this = this;
        return this.http.get(myGlobals.serviceUrl + "list/" + pkuid)
            .map(function (res) {
            var body = res.json();
            _this.projects = body.data;
            return _this.projects;
        })
            .catch(this.handleError);
    };
    ProjectService.prototype.projectDetail = function (pkproid) {
        var _this = this;
        return this.http.get(myGlobals.serviceUrl + pkproid + "/tasklist")
            .map(function (res) {
            var body = res.json();
            _this.tasks = body.data;
            return _this.tasks;
        })
            .catch(this.handleError);
    };
    ProjectService.prototype.addTask = function (username, password) {
        var _this = this;
        var body = JSON.stringify({
            email: username,
            password: password
        });
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(this._baseUrl, body, options)
            .map(function (res) {
            var body = res.json();
            _this.user = body.data;
            return _this.user;
        })
            .catch(this.handleError);
    };
    ProjectService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    ProjectService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ProjectService);
    return ProjectService;
}());
exports.ProjectService = ProjectService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvcHJvamVjdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBMkIsZUFBZSxDQUFDLENBQUE7QUFDM0MscUJBQStCLGVBQWUsQ0FBQyxDQUFBO0FBQy9DLHFCQUF3QyxlQUFlLENBQUMsQ0FBQTtBQUV4RCwyQkFBMkIsaUJBQWlCLENBQUMsQ0FBQTtBQUU3QyxRQUFPLHVCQUF1QixDQUFDLENBQUE7QUFDL0IsUUFBTyx5QkFBeUIsQ0FBQyxDQUFBO0FBQ2pDLFFBQU8sMkJBQTJCLENBQUMsQ0FBQTtBQUVuQyxRQUFPLHNCQUFzQixDQUFDLENBQUE7QUFJOUIsSUFBTyxTQUFTLFdBQVcsZUFBZSxDQUFDLENBQUM7QUFHNUM7SUFPSSx3QkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07SUFBSSxDQUFDO0lBRW5DLG9DQUFXLEdBQVgsVUFBWSxLQUFhO1FBQXpCLGlCQWFDO1FBUkcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUMsT0FBTyxHQUFDLEtBQUssQ0FBQzthQUNuRCxHQUFHLENBQUMsVUFBQyxHQUFhO1lBQ2YsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMxQixNQUFNLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQztRQUV6QixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxzQ0FBYSxHQUFiLFVBQWMsT0FBZTtRQUE3QixpQkFhQztRQVJHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFDLE9BQU8sR0FBQyxXQUFXLENBQUM7YUFDekQsR0FBRyxDQUFDLFVBQUMsR0FBYTtZQUNmLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN0QixLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdkIsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUM7UUFFdEIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsZ0NBQU8sR0FBUCxVQUFRLFFBQWdCLEVBQUUsUUFBZ0I7UUFBMUMsaUJBaUJDO1FBZkcsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUN0QixLQUFLLEVBQUUsUUFBUTtZQUNmLFFBQVEsRUFBRSxRQUFRO1NBQ3JCLENBQUMsQ0FBQztRQUNILElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxDQUFDLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQztRQUNsRSxJQUFJLE9BQU8sR0FBRyxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUV2RCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDO2FBQzlDLEdBQUcsQ0FBQyxVQUFDLEdBQWE7WUFDZixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdEIsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDO1FBRXJCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVPLG9DQUFXLEdBQW5CLFVBQW9CLEtBQVU7UUFFMUIsTUFBTSxDQUFDLHVCQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLElBQUksY0FBYyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQTlETDtRQUFDLGlCQUFVLEVBQUU7O3NCQUFBO0lBK0RiLHFCQUFDO0FBQUQsQ0E5REEsQUE4REMsSUFBQTtBQTlEWSxzQkFBYyxpQkE4RDFCLENBQUEiLCJmaWxlIjoiYXBwL3NoYXJlZC9zZXJ2aWNlcy9wcm9qZWN0LnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgSGVhZGVycywgUmVxdWVzdE9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbi8vR3JhYiBldmVyeXRoaW5nIHdpdGggaW1wb3J0ICdyeGpzL1J4JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2NhdGNoJztcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS90aHJvdyc7XG4vL2ltcG9ydCAncnhqcy9SeCc7ICAvLyB1c2UgdGhpcyBsaW5lIGlmIHlvdSB3YW50IHRvIGJlIGxhenksIG90aGVyd2lzZTpcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZG8nOyAgLy8gZGVidWdcblxuaW1wb3J0IHsgUHJvamVjdCwgVGFzayB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuXG5pbXBvcnQgbXlHbG9iYWxzID0gcmVxdWlyZSgnLi4vLi4vZ2xvYmFscycpO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUHJvamVjdFNlcnZpY2Uge1xuXG4gICAgcHVibGljIHRhc2tTZWxlY3RlZDogVGFzaztcbiAgICBcbiAgICBwcm9qZWN0czogUHJvamVjdFtdO1xuICAgIHRhc2tzOiBUYXNrW107XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7IH1cblxuICAgIHByb2plY3RMaXN0KHBrdWlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPFByb2plY3RbXT4ge1xuXG4gICAgICAgIC8vbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgICAgIC8vbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQobXlHbG9iYWxzLnNlcnZpY2VVcmwrXCJsaXN0L1wiK3BrdWlkKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2plY3RzID0gYm9keS5kYXRhO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cbiAgICBcbiAgICBwcm9qZWN0RGV0YWlsKHBrcHJvaWQ6IG51bWJlcik6IE9ic2VydmFibGU8VGFza1tdPiB7XG5cbiAgICAgICAgLy9sZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICAgICAgLy9sZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQobXlHbG9iYWxzLnNlcnZpY2VVcmwrcGtwcm9pZCtcIi90YXNrbGlzdFwiKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tzID0gYm9keS5kYXRhO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhc2tzO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cblxuICAgIGFkZFRhc2sodXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuXG4gICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgZW1haWw6IHVzZXJuYW1lLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLl9iYXNlVXJsLCBib2R5LCBvcHRpb25zKVxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXIgPSBib2R5LmRhdGE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudXNlcjtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogYW55KSB7XG4gICAgICAgIC8vY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKS5lcnJvciB8fCAnU2VydmVyIGVycm9yJyk7XG4gICAgfVxufVxuXG5cbiJdfQ==
