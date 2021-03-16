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
var common_1 = require('@angular/common');
var project_service_1 = require('../shared/services/project.service');
var myGlobals = require('../globals');
var TaskDetailComponent = (function () {
    function TaskDetailComponent(_router, projectService) {
        this._router = _router;
        this.projectService = projectService;
        console.log("TaskDetailComponent");
    }
    TaskDetailComponent.prototype.ngOnInit = function () {
        console.log("TaskDetailComponent Loaded");
    };
    TaskDetailComponent.prototype.routerOnActivate = function (curr) {
        console.log(myGlobals.taskSelected);
        this.taskCurrent = myGlobals.selectedTask;
    };
    TaskDetailComponent.prototype.getProjectTaskList = function (pkproid) {
        var _this = this;
        this.projectService.projectDetail(pkproid)
            .subscribe(function (tasks) {
            _this.tasks = tasks;
        }, function (error) {
            _this.errorMsg = error;
        });
    };
    TaskDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'taskdetail',
            templateUrl: 'taskdetail.component.html',
            directives: [router_1.ROUTER_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Router, project_service_1.ProjectService])
    ], TaskDetailComponent);
    return TaskDetailComponent;
}());
exports.TaskDetailComponent = TaskDetailComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC90YXNrZGV0YWlsL3Rhc2tkZXRhaWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBZ0MsZUFBZSxDQUFDLENBQUE7QUFDaEQsdUJBQW9GLGlCQUFpQixDQUFDLENBQUE7QUFFdEcsdUJBQWlELGlCQUFpQixDQUFDLENBQUE7QUFLbkUsZ0NBQStCLG9DQUFvQyxDQUFDLENBQUE7QUFHcEUsSUFBTyxTQUFTLFdBQVcsWUFBWSxDQUFDLENBQUM7QUFXekM7SUFPSSw2QkFBb0IsT0FBZSxFQUFVLGNBQThCO1FBQXZELFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDdkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO0lBSXRDLENBQUM7SUFFRCxzQ0FBUSxHQUFSO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0lBRTlDLENBQUM7SUFFRCw4Q0FBZ0IsR0FBaEIsVUFBaUIsSUFBa0I7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDO0lBTzlDLENBQUM7SUFFRCxnREFBa0IsR0FBbEIsVUFBbUIsT0FBZTtRQUFsQyxpQkFlQztRQVZHLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQzthQUNyQyxTQUFTLENBQUMsVUFBQyxLQUFhO1lBRXJCLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBR3ZCLENBQUMsRUFBRSxVQUFDLEtBQVU7WUFDVixLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUUxQixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUF0REw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFdBQVcsRUFBRSwyQkFBMkI7WUFDeEMsVUFBVSxFQUFFLENBQUMsMEJBQWlCLEVBQUUsd0JBQWUsRUFBRSx3QkFBZSxDQUFDO1NBQ3BFLENBQUM7OzJCQUFBO0lBbURGLDBCQUFDO0FBQUQsQ0EvQ0EsQUErQ0MsSUFBQTtBQS9DWSwyQkFBbUIsc0JBK0MvQixDQUFBIiwiZmlsZSI6ImFwcC90YXNrZGV0YWlsL3Rhc2tkZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JvdXRlciwgT25BY3RpdmF0ZSwgUk9VVEVSX0RJUkVDVElWRVMsIFJPVVRFUl9QUk9WSURFUlMsIFJvdXRlU2VnbWVudH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgQ09SRV9ESVJFQ1RJVkVTLCBGT1JNX0RJUkVDVElWRVMgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG4vL2ltcG9ydCB7IEFDQ09SRElPTl9ESVJFQ1RJVkVTIH0gZnJvbSAnbmcyLWJvb3RzdHJhcC9uZzItYm9vdHN0cmFwJztcbi8vaW1wb3J0IHtHcmlkQ21wfSBmcm9tICcuLi8uLi8uLi9wYWdlcy9ncmlkL2NvbXBvbmVudHMvZ3JpZCc7XG5cbmltcG9ydCB7IFByb2plY3RTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL3Byb2plY3Quc2VydmljZSc7XG5pbXBvcnQgeyBQcm9qZWN0LCBUYXNrIH0gZnJvbSAnLi4vc2hhcmVkL2ludGVyZmFjZXMnO1xuXG5pbXBvcnQgbXlHbG9iYWxzID0gcmVxdWlyZSgnLi4vZ2xvYmFscycpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAndGFza2RldGFpbCcsXG4gICAgdGVtcGxhdGVVcmw6ICd0YXNrZGV0YWlsLmNvbXBvbmVudC5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVMsIENPUkVfRElSRUNUSVZFUywgRk9STV9ESVJFQ1RJVkVTXVxufSlcbi8vQFJvdXRlcyhbXG4vLyAgICB7IHBhdGg6ICcvZ3JpZCcsIGNvbXBvbmVudDogR3JpZENtcCwgYXM6ICdHcmlkJyB9XG4vL10pXG5leHBvcnQgY2xhc3MgVGFza0RldGFpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25BY3RpdmF0ZSB7XG5cbiAgICBlcnJvck1zZzogc3RyaW5nO1xuICAgIHRhc2tDdXJyZW50OiBUYXNrO1xuXG4gICAgcGtwcm9pZDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcHJvamVjdFNlcnZpY2U6IFByb2plY3RTZXJ2aWNlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGFza0RldGFpbENvbXBvbmVudFwiKSAgICAgICAgXG4gICAgICAgIC8vdGFza0N1cnJlbnQgPSB0aGlzLnByb2plY3RTZXJ2aWNlLnRhc2tTZWxlY3RlZDtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIlRhc2tEZXRhaWxDb21wb25lbnQgY29uc3RydWN0b3IgOiBcIit0YXNrQ3VycmVudC50YXNrdGl0bGUpO1xuICAgICAgICAvL3RoaXMucGtwcm9pZCA9IHBhcmFtcy5nZXQoXCJpZFwiKTsgICAgICAgIFxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRhc2tEZXRhaWxDb21wb25lbnQgTG9hZGVkXCIpOyAgICAgICAgICAgXG4gICAgICAgIFxuICAgIH1cblxuICAgIHJvdXRlck9uQWN0aXZhdGUoY3VycjogUm91dGVTZWdtZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKG15R2xvYmFscy50YXNrU2VsZWN0ZWQpO1xuICAgICAgICB0aGlzLnRhc2tDdXJyZW50ID0gbXlHbG9iYWxzLnNlbGVjdGVkVGFzazsgICAgIFxuLy8gICAgICAgIGlmKHRoaXMucHJvamVjdFNlcnZpY2UudGFza1NlbGVjdGVkKSB7XG4vLyAgICAgICAgICAgIHRhc2tDdXJyZW50ID0gdGhpcy5wcm9qZWN0U2VydmljZS50YXNrU2VsZWN0ZWQ7ICAgICBcbi8vICAgICAgICB9XG4gICAgICAgIC8vbGV0IHBrcHJvaWQgPSArY3Vyci5nZXRQYXJhbSgncGtwcm9pZCcpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiVGFza0RldGFpbENvbXBvbmVudCByb3V0ZXJPbkFjdGl2YXRlIDogXCIgKyBwa3Byb2lkKTtcbiAgICAgICAgLy90aGlzLmdldFByb2plY3RUYXNrTGlzdChwa3Byb2lkKTtcbiAgICB9XG5cbiAgICBnZXRQcm9qZWN0VGFza0xpc3QocGtwcm9pZDogbnVtYmVyKSB7XG4gICAgICAgIC8vdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnU2lnbnVwJ10pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhwa3Byb2lkKTtcblxuXG4gICAgICAgIHRoaXMucHJvamVjdFNlcnZpY2UucHJvamVjdERldGFpbChwa3Byb2lkKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgodGFza3M6IFRhc2tbXSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2codGFza3MpXG4gICAgICAgICAgICAgICAgdGhpcy50YXNrcyA9IHRhc2tzOyAgICBcbiAgICAgICAgICAgICAgICAvL3RoaXMucHJvamVjdHMgPSB0aGlzLmZpbHRlcmVkQ3VzdG9tZXJzID0gY3VzdG9tZXJzO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnZGFzaGJvYXJkJ10pO1xuICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkxvZ2luQ29tcG9uZW50IGxvZ2luIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=
