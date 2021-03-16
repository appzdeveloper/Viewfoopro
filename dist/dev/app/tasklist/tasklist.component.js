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
var taskdetail_component_1 = require('../taskdetail/taskdetail.component');
var project_service_1 = require('../shared/services/project.service');
var myGlobals = require('../globals');
var TaskListComponent = (function () {
    function TaskListComponent(_router, projectService) {
        this._router = _router;
        this.projectService = projectService;
    }
    TaskListComponent.prototype.ngOnInit = function () {
        console.log("Task list loaded for project");
    };
    TaskListComponent.prototype.routerOnActivate = function (curr, prev, currTree) {
        this.currSegment = curr;
        var pkproid = +curr.getParam('pkproid');
        console.log("TaskListComponent routerOnActivate : " + pkproid);
        this.getProjectTaskList(pkproid);
    };
    TaskListComponent.prototype.getProjectTaskList = function (pkproid) {
        var _this = this;
        this.projectService.projectDetail(pkproid)
            .subscribe(function (tasks) {
            _this.tasks = tasks;
        }, function (error) {
            _this.errorMsg = error;
        });
    };
    TaskListComponent.prototype.showTaskDetail = function (tasksel) {
        console.log("TaskListComponent clicked pktaskid : " + tasksel.pktaskid);
        myGlobals.selectedTask = tasksel;
        this._router.navigate(['./' + tasksel.pktaskid], this.currSegment);
    };
    TaskListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'tasklist',
            templateUrl: 'tasklist.component.html',
            directives: [router_1.ROUTER_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
        }),
        router_1.Routes([
            { path: '/:pktaskid', component: taskdetail_component_1.TaskDetailComponent }
        ]), 
        __metadata('design:paramtypes', [router_1.Router, project_service_1.ProjectService])
    ], TaskListComponent);
    return TaskListComponent;
}());
exports.TaskListComponent = TaskListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC90YXNrbGlzdC90YXNrbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFnQyxlQUFlLENBQUMsQ0FBQTtBQUNoRCx1QkFBdUcsaUJBQWlCLENBQUMsQ0FBQTtBQUV6SCx1QkFBaUQsaUJBQWlCLENBQUMsQ0FBQTtBQUluRSxxQ0FBa0Msb0NBQW9DLENBQUMsQ0FBQTtBQUV2RSxnQ0FBK0Isb0NBQW9DLENBQUMsQ0FBQTtBQUdwRSxJQUFPLFNBQVMsV0FBVyxZQUFZLENBQUMsQ0FBQztBQVd6QztJQVNJLDJCQUFvQixPQUFlLEVBQ3ZCLGNBQThCO1FBRHRCLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDdkIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBRzFDLENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFJRCw0Q0FBZ0IsR0FBaEIsVUFBaUIsSUFBa0IsRUFBRSxJQUFrQixFQUFFLFFBQW1CO1FBQ3hFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBR3hCLElBQUksT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxHQUFHLE9BQU8sQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsOENBQWtCLEdBQWxCLFVBQW1CLE9BQWU7UUFBbEMsaUJBZUM7UUFWRyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7YUFDckMsU0FBUyxDQUFDLFVBQUMsS0FBYTtZQUVyQixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUd2QixDQUFDLEVBQUUsVUFBQyxLQUFVO1lBQ1YsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFFMUIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsMENBQWMsR0FBZCxVQUFlLE9BQWE7UUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsR0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdEUsU0FBUyxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEdBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUVyRSxDQUFDO0lBOURMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLFVBQVUsRUFBRSxDQUFDLDBCQUFpQixFQUFFLHdCQUFlLEVBQUUsd0JBQWUsQ0FBQztTQUNwRSxDQUFDO1FBQ0QsZUFBTSxDQUFDO1lBQ0osRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSwwQ0FBbUIsRUFBRTtTQUN6RCxDQUFDOzt5QkFBQTtJQXdERix3QkFBQztBQUFELENBdkRBLEFBdURDLElBQUE7QUF2RFkseUJBQWlCLG9CQXVEN0IsQ0FBQSIsImZpbGUiOiJhcHAvdGFza2xpc3QvdGFza2xpc3QuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JvdXRlciwgT25BY3RpdmF0ZSwgUm91dGVzLCBST1VURVJfRElSRUNUSVZFUywgUk9VVEVSX1BST1ZJREVSUywgUm91dGVTZWdtZW50LCBSb3V0ZVRyZWV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IENPUkVfRElSRUNUSVZFUywgRk9STV9ESVJFQ1RJVkVTIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuLy9pbXBvcnQgeyBBQ0NPUkRJT05fRElSRUNUSVZFUyB9IGZyb20gJ25nMi1ib290c3RyYXAvbmcyLWJvb3RzdHJhcCc7XG4vL2ltcG9ydCB7R3JpZENtcH0gZnJvbSAnLi4vLi4vLi4vcGFnZXMvZ3JpZC9jb21wb25lbnRzL2dyaWQnO1xuaW1wb3J0IHtUYXNrRGV0YWlsQ29tcG9uZW50fSBmcm9tICcuLi90YXNrZGV0YWlsL3Rhc2tkZXRhaWwuY29tcG9uZW50JztcblxuaW1wb3J0IHsgUHJvamVjdFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvcHJvamVjdC5zZXJ2aWNlJztcbmltcG9ydCB7IFByb2plY3QsIFRhc2sgfSBmcm9tICcuLi9zaGFyZWQvaW50ZXJmYWNlcyc7XG5cbmltcG9ydCBteUdsb2JhbHMgPSByZXF1aXJlKCcuLi9nbG9iYWxzJyk7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICd0YXNrbGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICd0YXNrbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTLCBDT1JFX0RJUkVDVElWRVMsIEZPUk1fRElSRUNUSVZFU11cbn0pXG5AUm91dGVzKFsgICBcbiAgICB7IHBhdGg6ICcvOnBrdGFza2lkJywgY29tcG9uZW50OiBUYXNrRGV0YWlsQ29tcG9uZW50IH1cbl0pXG5leHBvcnQgY2xhc3MgVGFza0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQWN0aXZhdGUge1xuXG4gICAgZXJyb3JNc2c6IHN0cmluZztcbiAgICB0YXNrczogVGFza1tdO1xuICAgIFxuICAgIHByaXZhdGUgY3VyclNlZ21lbnQ6IFJvdXRlU2VnbWVudDtcbiAgICAgIFxuICAgIHBrcHJvaWQ6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRlcjogUm91dGVyLCBcbiAgICAgICAgcHJpdmF0ZSBwcm9qZWN0U2VydmljZTogUHJvamVjdFNlcnZpY2UpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIlRhc2tMaXN0Q29tcG9uZW50IGNvbnN0cnVjdG9yIDogXCIrcGFyYW1zLmdldChcImlkXCIpKTtcbiAgICAgICAgLy90aGlzLnBrcHJvaWQgPSBwYXJhbXMuZ2V0KFwiaWRcIik7ICAgICAgICBcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJUYXNrIGxpc3QgbG9hZGVkIGZvciBwcm9qZWN0XCIpO1xuICAgIH1cblxuXG5cbiAgICByb3V0ZXJPbkFjdGl2YXRlKGN1cnI6IFJvdXRlU2VnbWVudCwgcHJldjogUm91dGVTZWdtZW50LCBjdXJyVHJlZTogUm91dGVUcmVlKSB7XG4gICAgICAgIHRoaXMuY3VyclNlZ21lbnQgPSBjdXJyOyAgICAgICBcbiAgICBcbiAgICAgICAgLy9sZXQgcGtwcm9pZCA9ICtjdXJyVHJlZS5wYXJlbnQoY3VycikuZ2V0UGFyYW0oJ3BrcHJvaWQnKTtcbiAgICAgICAgbGV0IHBrcHJvaWQgPSArY3Vyci5nZXRQYXJhbSgncGtwcm9pZCcpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRhc2tMaXN0Q29tcG9uZW50IHJvdXRlck9uQWN0aXZhdGUgOiBcIiArIHBrcHJvaWQpO1xuICAgICAgICB0aGlzLmdldFByb2plY3RUYXNrTGlzdChwa3Byb2lkKTtcbiAgICB9XG5cbiAgICBnZXRQcm9qZWN0VGFza0xpc3QocGtwcm9pZDogbnVtYmVyKSB7XG4gICAgICAgIC8vdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnU2lnbnVwJ10pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhwa3Byb2lkKTtcblxuXG4gICAgICAgIHRoaXMucHJvamVjdFNlcnZpY2UucHJvamVjdERldGFpbChwa3Byb2lkKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgodGFza3M6IFRhc2tbXSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2codGFza3MpXG4gICAgICAgICAgICAgICAgdGhpcy50YXNrcyA9IHRhc2tzOyAgICBcbiAgICAgICAgICAgICAgICAvL3RoaXMucHJvamVjdHMgPSB0aGlzLmZpbHRlcmVkQ3VzdG9tZXJzID0gY3VzdG9tZXJzO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnZGFzaGJvYXJkJ10pO1xuICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkxvZ2luQ29tcG9uZW50IGxvZ2luIGZhaWw6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHNob3dUYXNrRGV0YWlsKHRhc2tzZWw6IFRhc2spIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJUYXNrTGlzdENvbXBvbmVudCBjbGlja2VkIHBrdGFza2lkIDogXCIrdGFza3NlbC5wa3Rhc2tpZCk7XG4gICAgICAgIFxuICAgICAgICBteUdsb2JhbHMuc2VsZWN0ZWRUYXNrID0gdGFza3NlbDtcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnLi8nK3Rhc2tzZWwucGt0YXNraWRdLCB0aGlzLmN1cnJTZWdtZW50KTsgICAgICAgIFxuICAgICAgICAvL3RoaXMuX3JvdXRlci5uYXZpZ2F0ZShbcGt0YXNraWRdKTsgICAgICAgIFxuICAgIH1cblxufVxuIl19
