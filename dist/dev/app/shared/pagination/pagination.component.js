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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var paginationConfig = {
    maxSize: void 0,
    itemsPerPage: 0,
    boundaryLinks: false,
    directionLinks: true,
    firstText: 'First',
    previousText: 'Previous',
    nextText: 'Next',
    lastText: 'Last',
    rotate: true,
    isCarousel: false
};
var PAGINATION_TEMPLATE = "";
var PaginationComponent = (function () {
    function PaginationComponent(cd, renderer, elementRef, _changeDetectionRef) {
        this.cd = cd;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this._changeDetectionRef = _changeDetectionRef;
        this.isCarousel = false;
        this.isPublicViewfoo = false;
        this.numPages = new core_1.EventEmitter();
        this.pageChanged = new core_1.EventEmitter();
        this.inited = false;
        this.onChange = function (_) {
        };
        this.onTouched = function () {
        };
        cd.valueAccessor = this;
        this.config = this.config || paginationConfig;
    }
    Object.defineProperty(PaginationComponent.prototype, "itemsPerPage", {
        get: function () {
            return this._itemsPerPage;
        },
        set: function (v) {
            this._itemsPerPage = v;
            this.totalPages = this.calculateTotalPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "gotoLastPage", {
        get: function () {
            return this._gotoLastPage;
        },
        set: function (v) {
            this._gotoLastPage = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "currentPage", {
        get: function () {
            return this._currentPage;
        },
        set: function (v) {
            this._currentPage = v;
            this.selectPage(v, null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "totalItems", {
        get: function () {
            return this._totalItems;
        },
        set: function (v) {
            this._totalItems = v;
            this.totalPages = this.calculateTotalPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "totalPages", {
        get: function () {
            return this._totalPages;
        },
        set: function (v) {
            this._totalPages = v;
            this.numPages.emit(v);
            if (this.inited) {
                this.selectPage(this.page);
            }
            if (this.gotoLastPage) {
                this.selectPage(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "page", {
        get: function () {
            return this._page;
        },
        set: function (value) {
            var _previous = this._page;
            this._page = (value > this.totalPages) ? this.totalPages : (value || 1);
            if (_previous === this._page || typeof _previous === 'undefined') {
                return;
            }
            this.pageChanged.emit({
                page: this._page,
                itemsPerPage: this.itemsPerPage
            });
        },
        enumerable: true,
        configurable: true
    });
    PaginationComponent.prototype.ngOnChanges = function (changes) {
        var self = this;
        for (var propName in changes) {
            if (propName == "totalItems") {
            }
        }
    };
    PaginationComponent.prototype.ngOnInit = function () {
        this.page = 1;
        this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';
        this.maxSize = typeof this.maxSize !== 'undefined' ? this.maxSize : paginationConfig.maxSize;
        this.rotate = typeof this.rotate !== 'undefined' ? this.rotate : paginationConfig.rotate;
        this.isCarousel = typeof this.isCarousel !== 'undefined' ? this.isCarousel : paginationConfig.isCarousel;
        this.boundaryLinks = typeof this.boundaryLinks !== 'undefined' ? this.boundaryLinks : paginationConfig.boundaryLinks;
        this.directionLinks = typeof this.directionLinks !== 'undefined' ? this.directionLinks : paginationConfig.directionLinks;
        this.itemsPerPage = typeof this.itemsPerPage !== 'undefined' ? this.itemsPerPage : paginationConfig.itemsPerPage;
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.page, this.totalPages);
        this.inited = true;
    };
    PaginationComponent.prototype.writeValue = function (value) {
        this.page = value;
        this.pages = this.getPages(this.page, this.totalPages);
    };
    PaginationComponent.prototype.selectPage = function (page, event) {
        if (event) {
            event.preventDefault();
        }
        if (!this.disabled) {
            if (event && event.target) {
                var target = event.target;
                target.blur();
            }
            this.writeValue(page);
            this.cd.viewToModelUpdate(this.page);
        }
    };
    PaginationComponent.prototype.getText = function (key) {
        return this[key + 'Text'] || paginationConfig[key + 'Text'];
    };
    PaginationComponent.prototype.noPrevious = function () {
        return this.page === 1;
    };
    PaginationComponent.prototype.noNext = function () {
        return this.page === this.totalPages;
    };
    PaginationComponent.prototype.makePage = function (number, text, isActive) {
        return {
            number: number,
            text: text,
            active: isActive
        };
    };
    PaginationComponent.prototype.getPages = function (currentPage, totalPages) {
        var pages = [];
        var startPage = 1;
        var endPage = totalPages;
        var isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;
        if (isMaxSized) {
            if (this.rotate) {
                startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
                endPage = startPage + this.maxSize - 1;
                if (endPage > totalPages) {
                    endPage = totalPages;
                    startPage = endPage - this.maxSize + 1;
                }
            }
            else {
                startPage = ((Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize) + 1;
                endPage = Math.min(startPage + this.maxSize - 1, totalPages);
            }
        }
        for (var number = startPage; number <= endPage; number++) {
            var page = this.makePage(number, number.toString(), number === currentPage);
            pages.push(page);
        }
        if (isMaxSized && !this.rotate) {
            if (startPage > 1) {
                var previousPageSet = this.makePage(startPage - 1, '...', false);
                pages.unshift(previousPageSet);
            }
            if (endPage < totalPages) {
                var nextPageSet = this.makePage(endPage + 1, '...', false);
                pages.push(nextPageSet);
            }
        }
        return pages;
    };
    PaginationComponent.prototype.calculateTotalPages = function () {
        var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    };
    PaginationComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    PaginationComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PaginationComponent.prototype, "totalItems", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PaginationComponent.prototype, "maxSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PaginationComponent.prototype, "boundaryLinks", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PaginationComponent.prototype, "directionLinks", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PaginationComponent.prototype, "firstText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PaginationComponent.prototype, "previousText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PaginationComponent.prototype, "nextText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PaginationComponent.prototype, "lastText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PaginationComponent.prototype, "isCarousel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PaginationComponent.prototype, "isPublicViewfoo", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PaginationComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PaginationComponent.prototype, "rotate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PaginationComponent.prototype, "numPages", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PaginationComponent.prototype, "pageChanged", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PaginationComponent.prototype, "itemsPerPage", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PaginationComponent.prototype, "gotoLastPage", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], PaginationComponent.prototype, "currentPage", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PaginationComponent.prototype, "totalItems", null);
    PaginationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'pagination',
            templateUrl: 'pagination.component.html',
            directives: [common_1.NgFor, common_1.NgIf]
        }),
        __param(0, core_1.SkipSelf()), 
        __metadata('design:paramtypes', [common_1.NgModel, core_1.Renderer, core_1.ElementRef, core_1.ChangeDetectorRef])
    ], PaginationComponent);
    return PaginationComponent;
}());
exports.PaginationComponent = PaginationComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEscUJBRUssZUFBZSxDQUFDLENBQUE7QUFDckIsdUJBQXlELGlCQUFpQixDQUFDLENBQUE7QUFxQjNFLElBQU0sZ0JBQWdCLEdBQXNCO0lBQ3hDLE9BQU8sRUFBRSxLQUFLLENBQUM7SUFDZixZQUFZLEVBQUUsQ0FBQztJQUNmLGFBQWEsRUFBRSxLQUFLO0lBQ3BCLGNBQWMsRUFBRSxJQUFJO0lBQ3BCLFNBQVMsRUFBRSxPQUFPO0lBQ2xCLFlBQVksRUFBRSxVQUFVO0lBQ3hCLFFBQVEsRUFBRSxNQUFNO0lBQ2hCLFFBQVEsRUFBRSxNQUFNO0lBQ2hCLE1BQU0sRUFBRSxJQUFJO0lBQ1osVUFBVSxFQUFFLEtBQUs7Q0FDcEIsQ0FBQztBQWdDRixJQUFNLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztBQVMvQjtJQTRHSSw2QkFBZ0MsRUFBVyxFQUFTLFFBQWtCLEVBQzNELFVBQXNCLEVBQVUsbUJBQXVDO1FBRGxELE9BQUUsR0FBRixFQUFFLENBQVM7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQzNELGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW9CO1FBOUZsRSxlQUFVLEdBQVksS0FBSyxDQUFDO1FBRTVCLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBSS9CLGFBQVEsR0FBeUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDcEQsZ0JBQVcsR0FBb0MsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUE2QzVFLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFnTWhDLGFBQVEsR0FBRyxVQUFDLENBQU07UUFDbEIsQ0FBQyxDQUFDO1FBQ0YsY0FBUyxHQUFHO1FBQ1osQ0FBQyxDQUFDO1FBdkpFLEVBQUUsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFN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RUFBRTs7OzBEQUFBO0lBU1I7UUFBQyxZQUFLLEVBQUU7O3lEQUFBO0lBMURaO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsWUFBWTtZQUV0QixXQUFXLEVBQUMsMkJBQTJCO1lBQ3ZDLFVBQVUsRUFBRSxDQUFDLGNBQUssRUFBRSxhQUFJLENBQUM7U0FDNUIsQ0FBQzttQkE2R2dCLGVBQVEsRUFBRTs7MkJBN0cxQjtJQWdSRiwwQkFBQztBQUFELENBL1FBLEFBK1FDLElBQUE7QUEvUVksMkJBQW1CLHNCQStRL0IsQ0FBQSIsImZpbGUiOiJhcHAvc2hhcmVkL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFbGVtZW50UmVmLFxuRXZlbnRFbWl0dGVyLCBTZWxmLCBTa2lwU2VsZiwgUmVuZGVyZXIsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlLCBDaGFuZ2VEZXRlY3RvclJlZn1cbmZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ0ZvciwgTmdJZiwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5nTW9kZWx9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0lBdHRyaWJ1dGV9IGZyb20gJy4vSUF0dHJpYnV0ZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVBhZ2luYXRpb25Db25maWcgZXh0ZW5kcyBJQXR0cmlidXRlIHtcbiAgICBtYXhTaXplOiBudW1iZXI7XG4gICAgaXRlbXNQZXJQYWdlOiBudW1iZXI7XG4gICAgYm91bmRhcnlMaW5rczogYm9vbGVhbjtcbiAgICBkaXJlY3Rpb25MaW5rczogYm9vbGVhbjtcbiAgICBmaXJzdFRleHQ6IHN0cmluZztcbiAgICBwcmV2aW91c1RleHQ6IHN0cmluZztcbiAgICBuZXh0VGV4dDogc3RyaW5nO1xuICAgIGxhc3RUZXh0OiBzdHJpbmc7XG5cbiAgICByb3RhdGU6IGJvb2xlYW47XG4gICAgaXNDYXJvdXNlbDogYm9vbGVhbjtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSVBhZ2VDaGFuZ2VkRXZlbnQge1xuICAgIGl0ZW1zUGVyUGFnZTogbnVtYmVyO1xuICAgIHBhZ2U6IG51bWJlcjtcbn1cblxuY29uc3QgcGFnaW5hdGlvbkNvbmZpZzogSVBhZ2luYXRpb25Db25maWcgPSB7XG4gICAgbWF4U2l6ZTogdm9pZCAwLFxuICAgIGl0ZW1zUGVyUGFnZTogMCxcbiAgICBib3VuZGFyeUxpbmtzOiBmYWxzZSxcbiAgICBkaXJlY3Rpb25MaW5rczogdHJ1ZSxcbiAgICBmaXJzdFRleHQ6ICdGaXJzdCcsXG4gICAgcHJldmlvdXNUZXh0OiAnUHJldmlvdXMnLFxuICAgIG5leHRUZXh0OiAnTmV4dCcsXG4gICAgbGFzdFRleHQ6ICdMYXN0JyxcbiAgICByb3RhdGU6IHRydWUsXG4gICAgaXNDYXJvdXNlbDogZmFsc2Vcbn07XG4vLzx1bCBjbGFzcz1cInBhZ2luYXRpb25cIiBbbmdDbGFzc109XCJjbGFzc01hcFwiPlxcblxcXG4vLyAgICA8bGk+SGVsbG88L2xpPlxuLy8gICAgPGxpIGNsYXNzPVwicGFnaW5hdGlvbi1maXJzdCBwYWdlLWl0ZW1cIlxuLy8gICAgICAgICpuZ0lmPVwiYm91bmRhcnlMaW5rc1wiXG4vLyAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cIm5vUHJldmlvdXMoKXx8ZGlzYWJsZWRcIj5cbi8vICAgICAgPGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmIChjbGljayk9XCJzZWxlY3RQYWdlKDEsICRldmVudClcIiBbaW5uZXJIVE1MXT1cImdldFRleHQoJ2ZpcnN0JylcIj48L2E+XG4vLyAgICA8L2xpPlxuLy9cbi8vICAgIDxsaSBjbGFzcz1cInBhZ2luYXRpb24tcHJldiBwYWdlLWl0ZW1cIlxuLy8gICAgICAgICpuZ0lmPVwiZGlyZWN0aW9uTGlua3NcIlxuLy8gICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJub1ByZXZpb3VzKCl8fGRpc2FibGVkXCI+XG4vLyAgICAgIDxhIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZiAoY2xpY2spPVwic2VsZWN0UGFnZShwYWdlIC0gMSwgJGV2ZW50KVwiIFtpbm5lckhUTUxdPVwiZ2V0VGV4dCgncHJldmlvdXMnKVwiPjwvYT5cbi8vICAgICAgPC9saT5cbi8vXG4vLyAgICA8bGkgKm5nRm9yPVwibGV0IHBnIG9mIHBhZ2VzXCJcbi8vICAgICAgICBbY2xhc3MuYWN0aXZlXT1cInBnLmFjdGl2ZVwiXG4vLyAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkJiYhcGcuYWN0aXZlXCJcbi8vICAgICAgICBjbGFzcz1cInBhZ2luYXRpb24tcGFnZSBwYWdlLWl0ZW1cIj5cbi8vICAgICAgPGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmIChjbGljayk9XCJzZWxlY3RQYWdlKHBnLm51bWJlciwgJGV2ZW50KVwiIFtpbm5lckhUTUxdPVwicGcudGV4dFwiPjwvYT5cbi8vICAgIDwvbGk+XG4vL1xuLy8gICAgPGxpIGNsYXNzPVwicGFnaW5hdGlvbi1uZXh0IHBhZ2UtaXRlbVwiXG4vLyAgICAgICAgKm5nSWY9XCJkaXJlY3Rpb25MaW5rc1wiXG4vLyAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cIm5vTmV4dCgpXCI+XG4vLyAgICAgIDxhIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZiAoY2xpY2spPVwic2VsZWN0UGFnZShwYWdlICsgMSwgJGV2ZW50KVwiIFtpbm5lckhUTUxdPVwiZ2V0VGV4dCgnbmV4dCcpXCI+PC9hPjwvbGk+XG4vL1xuLy8gICAgPGxpIGNsYXNzPVwicGFnaW5hdGlvbi1sYXN0IHBhZ2UtaXRlbVwiXG4vLyAgICAgICAgKm5nSWY9XCJib3VuZGFyeUxpbmtzXCJcbi8vICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwibm9OZXh0KClcIj5cbi8vICAgICAgPGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmIChjbGljayk9XCJzZWxlY3RQYWdlKHRvdGFsUGFnZXMsICRldmVudClcIiBbaW5uZXJIVE1MXT1cImdldFRleHQoJ2xhc3QnKVwiPjwvYT48L2xpPlxuLy8gIDwvdWw+XG5jb25zdCBQQUdJTkFUSU9OX1RFTVBMQVRFID0gYGA7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdwYWdpbmF0aW9uJywvL1tuZ01vZGVsXVxuICAgIC8vdGVtcGxhdGU6IFBBR0lOQVRJT05fVEVNUExBVEUsXG4gICAgdGVtcGxhdGVVcmw6J3BhZ2luYXRpb24uY29tcG9uZW50Lmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtOZ0ZvciwgTmdJZl1cbn0pXG5leHBvcnQgY2xhc3MgUGFnaW5hdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgSVBhZ2luYXRpb25Db25maWcsIElBdHRyaWJ1dGUge1xuXG4gICAgLy8tLS0tLS0tLVxuICAgIEBJbnB1dCgpIHB1YmxpYyB0b3RhbEl0ZW1zOiBudW1iZXI7XG4gICAgLy9ASW5wdXQoKSBwdWJsaWMgZ290b0xhc3RQYWdlOiBib29sZWFuO1xuICAgIC8vLS0tLS0tLS1cblxuICAgIEBJbnB1dCgpIHB1YmxpYyBtYXhTaXplOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBwdWJsaWMgYm91bmRhcnlMaW5rczogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBwdWJsaWMgZGlyZWN0aW9uTGlua3M6IGJvb2xlYW47XG4gICAgQElucHV0KCkgcHVibGljIGZpcnN0VGV4dDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBwcmV2aW91c1RleHQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgbmV4dFRleHQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgbGFzdFRleHQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBwdWJsaWMgaXNDYXJvdXNlbDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgcHVibGljIGlzUHVibGljVmlld2ZvbzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgcHJpdmF0ZSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBwdWJsaWMgcm90YXRlOiBib29sZWFuO1xuICAgIEBPdXRwdXQoKSBwcml2YXRlIG51bVBhZ2VzOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgcHJpdmF0ZSBwYWdlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPElQYWdlQ2hhbmdlZEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyBnZXQgaXRlbXNQZXJQYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXNQZXJQYWdlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgaXRlbXNQZXJQYWdlKHY6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9pdGVtc1BlclBhZ2UgPSB2O1xuICAgICAgICB0aGlzLnRvdGFsUGFnZXMgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsUGFnZXMoKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBwcml2YXRlIGdldCBnb3RvTGFzdFBhZ2UoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nb3RvTGFzdFBhZ2U7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBjdXJyZW50UGFnZSh2OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudFBhZ2UgPSB2O1xuICAgICAgICB0aGlzLnNlbGVjdFBhZ2UodiwgbnVsbCk7XG4gICAgfVxuXG4gICAgQElucHV0KCkgcHJpdmF0ZSBnZXQgY3VycmVudFBhZ2UoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50UGFnZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldCBnb3RvTGFzdFBhZ2UodjogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9nb3RvTGFzdFBhZ2UgPSB2O1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwic2V0IGdvdG9MYXN0UGFnZSA9IFwiK3YpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHByaXZhdGUgZ2V0IHRvdGFsSXRlbXMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvdGFsSXRlbXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXQgdG90YWxJdGVtcyh2OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fdG90YWxJdGVtcyA9IHY7XG4gICAgICAgIHRoaXMudG90YWxQYWdlcyA9IHRoaXMuY2FsY3VsYXRlVG90YWxQYWdlcygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb25maWc6IGFueTtcbiAgICBwcml2YXRlIGNsYXNzTWFwOiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIF9pdGVtc1BlclBhZ2U6IG51bWJlcjtcbiAgICBwcml2YXRlIF90b3RhbEl0ZW1zOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfdG90YWxQYWdlczogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBpbml0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgZ2V0IHRvdGFsUGFnZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90b3RhbFBhZ2VzO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0IHRvdGFsUGFnZXModjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3RvdGFsUGFnZXMgPSB2O1xuICAgICAgICB0aGlzLm51bVBhZ2VzLmVtaXQodik7XG4gICAgICAgIGlmICh0aGlzLmluaXRlZCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RQYWdlKHRoaXMucGFnZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5nb3RvTGFzdFBhZ2UpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJzZXQgdG90YWxQYWdlcyBnb3RvTGFzdFBhZ2UgaXMgdHJ1ZVwiKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0UGFnZSh2KTtcbiAgICAgICAgICAgIC8vdGhpcy5nb3RvTGFzdFBhZ2UgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgcGFnZSh2YWx1ZSkge1xuICAgICAgICBjb25zdCBfcHJldmlvdXMgPSB0aGlzLl9wYWdlO1xuICAgICAgICB0aGlzLl9wYWdlID0gKHZhbHVlID4gdGhpcy50b3RhbFBhZ2VzKSA/IHRoaXMudG90YWxQYWdlcyA6ICh2YWx1ZSB8fCAxKTtcblxuICAgICAgICBpZiAoX3ByZXZpb3VzID09PSB0aGlzLl9wYWdlIHx8IHR5cGVvZiBfcHJldmlvdXMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBhZ2VDaGFuZ2VkLmVtaXQoe1xuICAgICAgICAgICAgcGFnZTogdGhpcy5fcGFnZSxcbiAgICAgICAgICAgIGl0ZW1zUGVyUGFnZTogdGhpcy5pdGVtc1BlclBhZ2VcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgcGFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhZ2U7XG4gICAgfVxuXG4gICAgLy8gPz9cbiAgICBwcml2YXRlIF9wYWdlOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBwYWdlczogQXJyYXk8YW55PjtcblxuICAgIGNvbnN0cnVjdG9yKCBAU2tpcFNlbGYoKSBwdWJsaWMgY2Q6IE5nTW9kZWwsIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIsXG4gICAgICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWYgOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICAvL0BTZWxmKCkgcHVibGljIGNkOk5nTW9kZWxcbiAgICAgICAgY2QudmFsdWVBY2Nlc3NvciA9IHRoaXM7XG4gICAgICAgIHRoaXMuY29uZmlnID0gdGhpcy5jb25maWcgfHwgcGFnaW5hdGlvbkNvbmZpZztcblxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW3Byb3BLZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KSB7XG4vLyAgICAgICAgbGV0IGxvZzogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBmb3IgKGxldCBwcm9wTmFtZSBpbiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwibmdPbkNoYW5nZXMgXCIrcHJvcE5hbWUpO1xuICAgICAgICAgICAgaWYocHJvcE5hbWUgPT0gXCJ0b3RhbEl0ZW1zXCIpIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMuaW5pdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvL3RoaXMucGFnZSA9XG4gICAgICAgICAgICB9XG4vLyAgICAgICAgICAgIGxldCBjaGFuZ2VkUHJvcCA9IGNoYW5nZXNbcHJvcE5hbWVdO1xuLy8gICAgICAgICAgICBsZXQgZnJvbSA9IEpTT04uc3RyaW5naWZ5KGNoYW5nZWRQcm9wLnByZXZpb3VzVmFsdWUpO1xuLy8gICAgICAgICAgICBsZXQgdG8gPSBKU09OLnN0cmluZ2lmeShjaGFuZ2VkUHJvcC5jdXJyZW50VmFsdWUpO1xuLy8gICAgICAgICAgICBsb2cucHVzaChgJHtwcm9wTmFtZX0gY2hhbmdlZCBmcm9tICR7ZnJvbX0gdG8gJHt0b31gKTtcbiAgICAgICAgfVxuLy8gICAgICAgIHRoaXMuY2hhbmdlTG9nLnB1c2gobG9nLmpvaW4oJywgJykpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwibmdPbkNoYW5nZXNcIik7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIC8vLS0tLS0tLS1cbiAgICAgICAgdGhpcy5wYWdlID0gMTtcbiAgICAgICAgLy8tLS0tLS0tLVxuICAgICAgICB0aGlzLmNsYXNzTWFwID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdjbGFzcycpIHx8ICcnO1xuICAgICAgICAvLyB3YXRjaCBmb3IgbWF4U2l6ZVxuICAgICAgICB0aGlzLm1heFNpemUgPSB0eXBlb2YgdGhpcy5tYXhTaXplICE9PSAndW5kZWZpbmVkJyA/IHRoaXMubWF4U2l6ZSA6IHBhZ2luYXRpb25Db25maWcubWF4U2l6ZTtcbiAgICAgICAgdGhpcy5yb3RhdGUgPSB0eXBlb2YgdGhpcy5yb3RhdGUgIT09ICd1bmRlZmluZWQnID8gdGhpcy5yb3RhdGUgOiBwYWdpbmF0aW9uQ29uZmlnLnJvdGF0ZTtcbiAgICAgICAgdGhpcy5pc0Nhcm91c2VsID0gdHlwZW9mIHRoaXMuaXNDYXJvdXNlbCAhPT0gJ3VuZGVmaW5lZCcgPyB0aGlzLmlzQ2Fyb3VzZWwgOiBwYWdpbmF0aW9uQ29uZmlnLmlzQ2Fyb3VzZWw7XG4gICAgICAgIHRoaXMuYm91bmRhcnlMaW5rcyA9IHR5cGVvZiB0aGlzLmJvdW5kYXJ5TGlua3MgIT09ICd1bmRlZmluZWQnID8gdGhpcy5ib3VuZGFyeUxpbmtzIDogcGFnaW5hdGlvbkNvbmZpZy5ib3VuZGFyeUxpbmtzO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbkxpbmtzID0gdHlwZW9mIHRoaXMuZGlyZWN0aW9uTGlua3MgIT09ICd1bmRlZmluZWQnID8gdGhpcy5kaXJlY3Rpb25MaW5rcyA6IHBhZ2luYXRpb25Db25maWcuZGlyZWN0aW9uTGlua3M7XG5cbiAgICAgICAgLy8gYmFzZSBjbGFzc1xuICAgICAgICB0aGlzLml0ZW1zUGVyUGFnZSA9IHR5cGVvZiB0aGlzLml0ZW1zUGVyUGFnZSAhPT0gJ3VuZGVmaW5lZCcgPyB0aGlzLml0ZW1zUGVyUGFnZSA6IHBhZ2luYXRpb25Db25maWcuaXRlbXNQZXJQYWdlO1xuICAgICAgICB0aGlzLnRvdGFsUGFnZXMgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsUGFnZXMoKTtcbiAgICAgICAgLy8gdGhpcyBjbGFzc1xuICAgICAgICB0aGlzLnBhZ2VzID0gdGhpcy5nZXRQYWdlcyh0aGlzLnBhZ2UsIHRoaXMudG90YWxQYWdlcyk7XG4gICAgICAgIC8vdGhpcy5wYWdlID0gdGhpcy5jZC52YWx1ZTtcbiAgICAgICAgLy90aGlzLnBhZ2UgPSAxO1xuICAgICAgICB0aGlzLmluaXRlZCA9IHRydWU7XG5cbi8vY29uc29sZS5sb2coXCJwYWdpbmF0aW9uLmNvbXBvbmVudFwiKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInRoaXMudG90YWxJdGVtcyA9IFwiICsgdGhpcy50b3RhbEl0ZW1zKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIml0ZW1zUGVyUGFnZSA9IFwiICsgdGhpcy5pdGVtc1BlclBhZ2UgKyBcIiBwYWdlID0gXCIgKyB0aGlzLnBhZ2UgKyBcIiB0b3RhbFBhZ2VzID0gXCIgKyB0aGlzLnRvdGFsUGFnZXMpO1xuXG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucGFnZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnBhZ2VzID0gdGhpcy5nZXRQYWdlcyh0aGlzLnBhZ2UsIHRoaXMudG90YWxQYWdlcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZWxlY3RQYWdlKHBhZ2U6IG51bWJlciwgZXZlbnQ/OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQ6IGFueSA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgICAgICB0YXJnZXQuYmx1cigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy53cml0ZVZhbHVlKHBhZ2UpO1xuICAgICAgICAgICAgdGhpcy5jZC52aWV3VG9Nb2RlbFVwZGF0ZSh0aGlzLnBhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUZXh0KGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICg8SUF0dHJpYnV0ZT50aGlzKVtrZXkgKyAnVGV4dCddIHx8IHBhZ2luYXRpb25Db25maWdba2V5ICsgJ1RleHQnXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG5vUHJldmlvdXMoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2UgPT09IDE7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBub05leHQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2UgPT09IHRoaXMudG90YWxQYWdlcztcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgcGFnZSBvYmplY3QgdXNlZCBpbiB0ZW1wbGF0ZVxuICAgIHByaXZhdGUgbWFrZVBhZ2UobnVtYmVyOiBudW1iZXIsIHRleHQ6IHN0cmluZywgaXNBY3RpdmU6IGJvb2xlYW4pOiB7IG51bWJlcjogbnVtYmVyLCB0ZXh0OiBzdHJpbmcsIGFjdGl2ZTogYm9vbGVhbiB9IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG51bWJlcjogbnVtYmVyLFxuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIGFjdGl2ZTogaXNBY3RpdmVcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFBhZ2VzKGN1cnJlbnRQYWdlOiBudW1iZXIsIHRvdGFsUGFnZXM6IG51bWJlcik6IEFycmF5PGFueT4ge1xuICAgICAgICBsZXQgcGFnZXM6IGFueVtdID0gW107XG5cbiAgICAgICAgLy8gRGVmYXVsdCBwYWdlIGxpbWl0c1xuICAgICAgICBsZXQgc3RhcnRQYWdlID0gMTtcbiAgICAgICAgbGV0IGVuZFBhZ2UgPSB0b3RhbFBhZ2VzO1xuICAgICAgICBsZXQgaXNNYXhTaXplZCA9IHR5cGVvZiB0aGlzLm1heFNpemUgIT09ICd1bmRlZmluZWQnICYmIHRoaXMubWF4U2l6ZSA8IHRvdGFsUGFnZXM7XG5cbiAgICAgICAgLy8gcmVjb21wdXRlIGlmIG1heFNpemVcbiAgICAgICAgaWYgKGlzTWF4U2l6ZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJvdGF0ZSkge1xuICAgICAgICAgICAgICAgIC8vIEN1cnJlbnQgcGFnZSBpcyBkaXNwbGF5ZWQgaW4gdGhlIG1pZGRsZSBvZiB0aGUgdmlzaWJsZSBvbmVzXG4gICAgICAgICAgICAgICAgc3RhcnRQYWdlID0gTWF0aC5tYXgoY3VycmVudFBhZ2UgLSBNYXRoLmZsb29yKHRoaXMubWF4U2l6ZSAvIDIpLCAxKTtcbiAgICAgICAgICAgICAgICBlbmRQYWdlID0gc3RhcnRQYWdlICsgdGhpcy5tYXhTaXplIC0gMTtcblxuICAgICAgICAgICAgICAgIC8vIEFkanVzdCBpZiBsaW1pdCBpcyBleGNlZWRlZFxuICAgICAgICAgICAgICAgIGlmIChlbmRQYWdlID4gdG90YWxQYWdlcykge1xuICAgICAgICAgICAgICAgICAgICBlbmRQYWdlID0gdG90YWxQYWdlcztcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRQYWdlID0gZW5kUGFnZSAtIHRoaXMubWF4U2l6ZSArIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBWaXNpYmxlIHBhZ2VzIGFyZSBwYWdpbmF0ZWQgd2l0aCBtYXhTaXplXG4gICAgICAgICAgICAgICAgc3RhcnRQYWdlID0gKChNYXRoLmNlaWwoY3VycmVudFBhZ2UgLyB0aGlzLm1heFNpemUpIC0gMSkgKiB0aGlzLm1heFNpemUpICsgMTtcblxuICAgICAgICAgICAgICAgIC8vIEFkanVzdCBsYXN0IHBhZ2UgaWYgbGltaXQgaXMgZXhjZWVkZWRcbiAgICAgICAgICAgICAgICBlbmRQYWdlID0gTWF0aC5taW4oc3RhcnRQYWdlICsgdGhpcy5tYXhTaXplIC0gMSwgdG90YWxQYWdlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgcGFnZSBudW1iZXIgbGlua3NcbiAgICAgICAgZm9yICh2YXIgbnVtYmVyID0gc3RhcnRQYWdlOyBudW1iZXIgPD0gZW5kUGFnZTsgbnVtYmVyKyspIHtcbiAgICAgICAgICAgIGxldCBwYWdlID0gdGhpcy5tYWtlUGFnZShudW1iZXIsIG51bWJlci50b1N0cmluZygpLCBudW1iZXIgPT09IGN1cnJlbnRQYWdlKTtcbiAgICAgICAgICAgIHBhZ2VzLnB1c2gocGFnZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgbGlua3MgdG8gbW92ZSBiZXR3ZWVuIHBhZ2Ugc2V0c1xuICAgICAgICBpZiAoaXNNYXhTaXplZCAmJiAhdGhpcy5yb3RhdGUpIHtcbiAgICAgICAgICAgIGlmIChzdGFydFBhZ2UgPiAxKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByZXZpb3VzUGFnZVNldCA9IHRoaXMubWFrZVBhZ2Uoc3RhcnRQYWdlIC0gMSwgJy4uLicsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBwYWdlcy51bnNoaWZ0KHByZXZpb3VzUGFnZVNldCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlbmRQYWdlIDwgdG90YWxQYWdlcykge1xuICAgICAgICAgICAgICAgIGxldCBuZXh0UGFnZVNldCA9IHRoaXMubWFrZVBhZ2UoZW5kUGFnZSArIDEsICcuLi4nLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgcGFnZXMucHVzaChuZXh0UGFnZVNldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFnZXM7XG4gICAgfVxuXG4gICAgLy8gYmFzZSBjbGFzc1xuICAgIHByaXZhdGUgY2FsY3VsYXRlVG90YWxQYWdlcygpOiBudW1iZXIge1xuICAgICAgICBsZXQgdG90YWxQYWdlcyA9IHRoaXMuaXRlbXNQZXJQYWdlIDwgMSA/IDEgOiBNYXRoLmNlaWwodGhpcy50b3RhbEl0ZW1zIC8gdGhpcy5pdGVtc1BlclBhZ2UpO1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgodG90YWxQYWdlcyB8fCAwLCAxKTtcbiAgICB9XG5cbiAgICBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHtcbiAgICB9O1xuICAgIG9uVG91Y2hlZCA9ICgpID0+IHtcbiAgICB9O1xuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IGFueSkgPT4ge30pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB7fSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cbn1cbiJdfQ==
