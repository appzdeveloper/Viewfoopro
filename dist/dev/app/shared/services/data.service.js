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
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var DataService = (function () {
    function DataService(http) {
        this.http = http;
        this._baseUrl = '';
    }
    DataService.prototype.getCustomers = function () {
        var _this = this;
        if (!this.customers) {
            return this.http.get(this._baseUrl + 'customers.json')
                .map(function (res) {
                _this.customers = res.json();
                return _this.customers;
            })
                .catch(this.handleError);
        }
        else {
            return this.createObservable(this.customers);
        }
    };
    DataService.prototype.getCustomer = function (id) {
        var _this = this;
        if (this.customers) {
            return this.findCustomerObservable(id);
        }
        else {
            return Observable_1.Observable.create(function (observer) {
                _this.getCustomers().subscribe(function (customers) {
                    _this.customers = customers;
                    var cust = _this.filterCustomers(id);
                    observer.next(cust);
                    observer.complete();
                });
            })
                .catch(this.handleError);
        }
    };
    DataService.prototype.getOrders = function (id) {
        var _this = this;
        return this.http.get(this._baseUrl + 'orders.json')
            .map(function (res) {
            _this.orders = res.json();
            return _this.orders.filter(function (order) { return order.customerId === id; });
        })
            .catch(this.handleError);
    };
    DataService.prototype.updateCustomer = function (customer) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this.customers.forEach(function (cust, index) {
                if (cust.id === customer.id) {
                    var state = _this.filterStates(customer.state.abbreviation);
                    customer.state.abbreviation = state.abbreviation;
                    customer.state.name = state.name;
                    _this.customers[index] = customer;
                }
            });
            observer.next(true);
            observer.complete();
        });
    };
    DataService.prototype.getStates = function () {
        var _this = this;
        if (this.states) {
            return Observable_1.Observable.create(function (observer) {
                observer.next(_this.states);
                observer.complete();
            });
        }
        else {
            return this.http.get(this._baseUrl + 'states.json').map(function (response) {
                _this.states = response.json();
                return _this.states;
            })
                .catch(this.handleError);
        }
    };
    DataService.prototype.findCustomerObservable = function (id) {
        return this.createObservable(this.filterCustomers(id));
    };
    DataService.prototype.filterCustomers = function (id) {
        var custs = this.customers.filter(function (cust) { return cust.id === id; });
        return (custs.length) ? custs[0] : null;
    };
    DataService.prototype.createObservable = function (data) {
        return Observable_1.Observable.create(function (observer) {
            observer.next(data);
            observer.complete();
        });
    };
    DataService.prototype.filterStates = function (stateAbbreviation) {
        var filteredStates = this.states.filter(function (state) { return state.abbreviation === stateAbbreviation; });
        return (filteredStates.length) ? filteredStates[0] : null;
    };
    DataService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBMkIsZUFBZSxDQUFDLENBQUE7QUFDM0MscUJBQStCLGVBQWUsQ0FBQyxDQUFBO0FBRS9DLDJCQUEyQixpQkFBaUIsQ0FBQyxDQUFBO0FBRTdDLFFBQU8sdUJBQXVCLENBQUMsQ0FBQTtBQUMvQixRQUFPLHlCQUF5QixDQUFDLENBQUE7QUFLakM7SUFPSSxxQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFMOUIsYUFBUSxHQUFXLEVBQUUsQ0FBQztJQUtZLENBQUM7SUFFbkMsa0NBQVksR0FBWjtRQUFBLGlCQWFDO1FBWkcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQztpQkFDekMsR0FBRyxDQUFDLFVBQUMsR0FBYTtnQkFDZixLQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDNUIsTUFBTSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUM7WUFDMUIsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakQsQ0FBQztJQUNMLENBQUM7SUFFRCxpQ0FBVyxHQUFYLFVBQVksRUFBVTtRQUF0QixpQkFnQkM7UUFmRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUVqQixNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUUs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QUMxQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxJQUFJLGNBQWMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUExR0w7UUFBQyxpQkFBVSxFQUFFOzttQkFBQTtJQTRHYixrQkFBQztBQUFELENBM0dBLEFBMkdDLElBQUE7QUEzR1ksbUJBQVcsY0EyR3ZCLENBQUEiLCJmaWxlIjoiYXBwL3NoYXJlZC9zZXJ2aWNlcy9kYXRhLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuLy9HcmFiIGV2ZXJ5dGhpbmcgd2l0aCBpbXBvcnQgJ3J4anMvUngnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQge09ic2VydmVyfSBmcm9tICdyeGpzL09ic2VydmVyJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJzsgXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2NhdGNoJztcblxuaW1wb3J0IHsgSUN1c3RvbWVyLCBJT3JkZXIsIElTdGF0ZSB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0YVNlcnZpY2Uge1xuICBcbiAgICBfYmFzZVVybDogc3RyaW5nID0gJyc7XG4gICAgY3VzdG9tZXJzOiBJQ3VzdG9tZXJbXTtcbiAgICBvcmRlcnM6IElPcmRlcltdO1xuICAgIHN0YXRlczogSVN0YXRlW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHsgfVxuICAgIFxuICAgIGdldEN1c3RvbWVycygpIDogT2JzZXJ2YWJsZTxJQ3VzdG9tZXJbXT4ge1xuICAgICAgICBpZiAoIXRoaXMuY3VzdG9tZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLl9iYXNlVXJsICsgJ2N1c3RvbWVycy5qc29uJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVycyA9IHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tZXJzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vcmV0dXJuIGNhY2hlZCBkYXRhXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVPYnNlcnZhYmxlKHRoaXMuY3VzdG9tZXJzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBnZXRDdXN0b21lcihpZDogbnVtYmVyKSA6IE9ic2VydmFibGU8SUN1c3RvbWVyPiB7XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbWVycykge1xuICAgICAgICAgICAgLy9maWx0ZXIgdXNpbmcgY2FjaGVkIGRhdGFcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmRDdXN0b21lck9ic2VydmFibGUoaWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9RdWVyeSB0aGUgZXhpc3RpbmcgY3VzdG9tZXJzIHRvIGZpbmQgdGhlIHRhcmdldCBjdXN0b21lclxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8SUN1c3RvbWVyPikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEN1c3RvbWVycygpLnN1YnNjcmliZSgoY3VzdG9tZXJzOiBJQ3VzdG9tZXJbXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lcnMgPSBjdXN0b21lcnM7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VzdCA9IHRoaXMuZmlsdGVyQ3VzdG9tZXJzKGlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoY3VzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0T3JkZXJzKGlkOiBudW1iZXIpIDogT2JzZXJ2YWJsZTxJT3JkZXJbXT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5fYmFzZVVybCArICdvcmRlcnMuanNvbicpXG4gICAgICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9yZGVycyA9IHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9yZGVycy5maWx0ZXIoKG9yZGVyOiBJT3JkZXIpID0+IG9yZGVyLmN1c3RvbWVySWQgPT09IGlkKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTsgICAgICAgICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlQ3VzdG9tZXIoY3VzdG9tZXI6IElDdXN0b21lcikgOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8Ym9vbGVhbj4pID0+IHtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJzLmZvckVhY2goKGN1c3Q6IElDdXN0b21lciwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgaWYgKGN1c3QuaWQgPT09IGN1c3RvbWVyLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLmZpbHRlclN0YXRlcyhjdXN0b21lci5zdGF0ZS5hYmJyZXZpYXRpb24pO1xuICAgICAgICAgICAgICAgICAgIGN1c3RvbWVyLnN0YXRlLmFiYnJldmlhdGlvbiA9IHN0YXRlLmFiYnJldmlhdGlvbjtcbiAgICAgICAgICAgICAgICAgICBjdXN0b21lci5zdGF0ZS5uYW1lID0gc3RhdGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyc1tpbmRleF0gPSBjdXN0b21lcjtcbiAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQodHJ1ZSk7XG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgZ2V0U3RhdGVzKCk6IE9ic2VydmFibGU8SVN0YXRlW10+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxJU3RhdGVbXT4pID0+IHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHRoaXMuc3RhdGVzKTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLl9iYXNlVXJsICsgJ3N0YXRlcy5qc29uJykubWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlcyA9IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZXM7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgZmluZEN1c3RvbWVyT2JzZXJ2YWJsZShpZDogbnVtYmVyKSA6IE9ic2VydmFibGU8SUN1c3RvbWVyPiB7ICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlT2JzZXJ2YWJsZSh0aGlzLmZpbHRlckN1c3RvbWVycyhpZCkpO1xuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIGZpbHRlckN1c3RvbWVycyhpZDogbnVtYmVyKSA6IElDdXN0b21lciB7XG4gICAgICAgIGNvbnN0IGN1c3RzID0gdGhpcy5jdXN0b21lcnMuZmlsdGVyKChjdXN0KSA9PiBjdXN0LmlkID09PSBpZCk7XG4gICAgICAgIHJldHVybiAoY3VzdHMubGVuZ3RoKSA/IGN1c3RzWzBdIDogbnVsbDtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBjcmVhdGVPYnNlcnZhYmxlKGRhdGE6IGFueSkgOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxhbnk+KSA9PiB7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KGRhdGEpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgZmlsdGVyU3RhdGVzKHN0YXRlQWJicmV2aWF0aW9uOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgZmlsdGVyZWRTdGF0ZXMgPSB0aGlzLnN0YXRlcy5maWx0ZXIoKHN0YXRlKSA9PiBzdGF0ZS5hYmJyZXZpYXRpb24gPT09IHN0YXRlQWJicmV2aWF0aW9uKTtcbiAgICAgICAgcmV0dXJuIChmaWx0ZXJlZFN0YXRlcy5sZW5ndGgpID8gZmlsdGVyZWRTdGF0ZXNbMF0gOiBudWxsO1xuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKS5lcnJvciB8fCAnU2VydmVyIGVycm9yJyk7XG4gICAgfVxuXG59XG4iXX0=
