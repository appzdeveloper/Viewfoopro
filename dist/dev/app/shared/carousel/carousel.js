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
var CarouselSlide = (function () {
    function CarouselSlide(el) {
        this._itemClass = true;
        this._el = el.nativeElement;
    }
    CarouselSlide.prototype.getElement = function () {
        return this._el;
    };
    CarouselSlide.prototype.activate = function () { this._activeClass = true; };
    CarouselSlide.prototype.deactivate = function () { this._activeClass = false; };
    CarouselSlide.prototype.prepareAnimation = function (isToRight) {
        isToRight ? this._nextClass = true : this._prevClass = true;
    };
    CarouselSlide.prototype.animate = function (isToRight) {
        isToRight ? this._leftClass = true : this._rightClass = true;
    };
    CarouselSlide.prototype.cleanAfterAnimation = function () {
        this._leftClass = this._rightClass = this._nextClass = this._prevClass = false;
    };
    CarouselSlide = __decorate([
        core_1.Directive({
            selector: 'carousel-slide',
            host: {
                '[class.item]': '_itemClass',
                '[class.active]': '_activeClass',
                '[class.left]': '_leftClass',
                '[class.right]': '_rightClass',
                '[class.prev]': '_prevClass',
                '[class.next]': '_nextClass',
                'role': 'listbox'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], CarouselSlide);
    return CarouselSlide;
}());
exports.CarouselSlide = CarouselSlide;
var CarouselCaption = (function () {
    function CarouselCaption() {
        this.carouselCaptionClass = true;
    }
    CarouselCaption = __decorate([
        core_1.Directive({
            selector: 'carousel-caption',
            host: {
                '[class.carousel-caption]': 'carouselCaptionClass'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], CarouselCaption);
    return CarouselCaption;
}());
exports.CarouselCaption = CarouselCaption;
var Carousel = (function () {
    function Carousel(query, el, _changeDetectionRef) {
        var _this = this;
        this._changeDetectionRef = _changeDetectionRef;
        this.pause = "hover";
        this.indexchange = new core_1.EventEmitter();
        this.slidestart = new core_1.EventEmitter();
        this.slideend = new core_1.EventEmitter();
        this._activeIndex = -1;
        this._interval = 5000;
        this._isChangingSlide = false;
        this._isToRight = true;
        this._noTransition = false;
        this._slides = [];
        this._timerId = null;
        this._transitionEnd = getTransitionEnd();
        this._wrap = true;
        this._el = el;
        this._startCycling();
        query.changes.subscribe(function (_) { return _this._registerSlides(query); });
    }
    Carousel.prototype._registerSlides = function (query) {
        var _this = this;
        var activeSlide = this._slides[this._activeIndex];
        this._slides = [];
        var activationDone = false;
        query.map(function (slide) {
            slide.deactivate();
            slide.cleanAfterAnimation();
            if (slide === activeSlide || (typeof activeSlide === "undefined" && _this._activeIndex == _this._slides.length)) {
                slide.activate();
                if (_this._activeIndex !== _this._slides.length) {
                    if (typeof _this._activeIndex != "string") {
                        _this.indexchange.next(_this._slides.length);
                    }
                    _this._activeIndex = _this._slides.length;
                }
                activationDone = true;
            }
            _this._slides.push(slide);
        });
        if (!activationDone && this._slides[0]) {
            this._slides[0].activate();
            this._activeIndex = 0;
            this.indexchange.next(this._activeIndex);
        }
        this._isChangingSlide = false;
        this._isToRight = null;
    };
    Object.defineProperty(Carousel.prototype, "wrap", {
        set: function (newValue) {
            this._wrap = typeof newValue === "string" ? newValue != "false" : newValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "noTransition", {
        set: function (newValue) {
            this._noTransition = typeof newValue === "string" ? newValue != "false" : newValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "interval", {
        set: function (newValue) {
            this._interval = typeof newValue === "string" ? parseInt(newValue) : newValue;
            this._stopCycling();
            this._startCycling();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "index", {
        set: function (newValue) {
            var _this = this;
            if (!this._isChangingSlide && newValue != this._activeIndex && newValue >= 0 && newValue <= this._slides.length - 1) {
                this._isChangingSlide = true;
                if (this._isToRight == null) {
                    this._isToRight = newValue > this._activeIndex;
                }
                this.slidestart.next(null);
                var currentSlide = this._slides[this._activeIndex];
                var nextSlide = this._slides[newValue];
                if (!this._noTransition && this._transitionEnd && currentSlide) {
                    nextSlide.prepareAnimation(this._isToRight);
                    setTimeout(function () {
                        currentSlide.animate(_this._isToRight);
                        nextSlide.animate(_this._isToRight);
                        var endAnimationCallback = function (event) {
                            currentSlide.getElement().removeEventListener(_this._transitionEnd, endAnimationCallback, false);
                            _this._finalizeTransition(currentSlide, nextSlide, newValue);
                        };
                        currentSlide.getElement().addEventListener(_this._transitionEnd, endAnimationCallback, false);
                    }, 30);
                }
                else {
                    this._finalizeTransition(currentSlide, nextSlide, newValue);
                }
            }
            else if (this._activeIndex == -1) {
                this._finalizeTransition(null, null, newValue);
            }
        },
        enumerable: true,
        configurable: true
    });
    Carousel.prototype._finalizeTransition = function (currentSlide, nextSlide, newValue) {
        if (currentSlide) {
            currentSlide.deactivate();
            currentSlide.cleanAfterAnimation();
        }
        if (nextSlide) {
            nextSlide.activate();
            nextSlide.cleanAfterAnimation();
        }
        this._activeIndex = newValue;
        this._isChangingSlide = false;
        this._isToRight = null;
        if (currentSlide || nextSlide) {
            this.slideend.next(null);
            this.indexchange.next(this._activeIndex);
        }
    };
    Carousel.prototype.navigateTo = function (newIndex) {
        this.index = newIndex;
    };
    Carousel.prototype.prev = function () {
        if (this.hasPrev()) {
            var prevIndex = this._activeIndex - 1 < 0 ? this._slides.length - 1 : this._activeIndex - 1;
            this._isToRight = false;
            this.index = prevIndex;
        }
    };
    Carousel.prototype.next = function () {
        if (this.hasNext()) {
            var nextIndex = (this._activeIndex + 1) % this._slides.length;
            this._isToRight = true;
            this.index = nextIndex;
        }
    };
    Carousel.prototype.hasPrev = function () {
        return this._slides.length > 1 && !(!this._wrap && this._activeIndex === 0);
    };
    Carousel.prototype.hasNext = function () {
        return this._slides.length > 1 && !(!this._wrap && this._activeIndex === (this._slides.length - 1));
    };
    Carousel.prototype.toggleAutomaticSliding = function () {
        if (this.pause === "hover") {
            if (this._timerId) {
                this._stopCycling();
            }
            else {
                this._startCycling();
            }
        }
    };
    Carousel.prototype._startCycling = function () {
        var _this = this;
        if (this._interval >= 0) {
            this._timerId = setInterval(function () {
                _this.next();
            }, this._interval > 600 ? this._interval : 600);
        }
    };
    Carousel.prototype._stopCycling = function () {
        if (this._timerId) {
            clearInterval(this._timerId);
        }
        this._timerId = null;
    };
    Carousel = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'carousel',
            properties: [
                'index',
                'wrap',
                'interval',
                'pause',
                'noTransition: no-transition'
            ],
            host: {
                '(mouseenter)': 'toggleAutomaticSliding()',
                '(mouseleave)': 'toggleAutomaticSliding()'
            },
            events: ['indexchange', 'slidestart', 'slideend'],
            templateUrl: 'carousel.html',
            directives: [common_1.NgFor, common_1.NgIf]
        }),
        __param(0, core_1.Query(CarouselSlide)), 
        __metadata('design:paramtypes', [core_1.QueryList, core_1.ElementRef, core_1.ChangeDetectorRef])
    ], Carousel);
    return Carousel;
}());
exports.Carousel = Carousel;
function getTransitionEnd() {
    var el = document.createElement('angular2-bootstrap');
    var transEndEventNames = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'oTransitionEnd otransitionend',
        transition: 'transitionend'
    };
    for (var name in transEndEventNames) {
        if (el.style[name] !== undefined) {
            return transEndEventNames[name];
        }
    }
    return null;
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY2Fyb3VzZWwvY2Fyb3VzZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLHFCQUNLLGVBQWUsQ0FBQyxDQUFBO0FBQ3JCLHVCQUEwQixpQkFBaUIsQ0FBQyxDQUFBO0FBYzVDO0lBU0ksdUJBQVksRUFBYztRQVBsQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBUS9CLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztJQUNoQyxDQUFDO0lBQ0Qsa0NBQVUsR0FBVjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7SUFDRCxnQ0FBUSxHQUFSLGNBQW1CLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM5QyxrQ0FBVSxHQUFWLGNBQXFCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNqRCx3Q0FBZ0IsR0FBaEIsVUFBaUIsU0FBa0I7UUFDL0IsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ2hFLENBQUM7SUFDRCwrQkFBTyxHQUFQLFVBQVEsU0FBa0I7UUFDdEIsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQ2pFLENBQUM7SUFDRCwyQ0FBbUIsR0FBbkI7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUNuRixDQUFDO0lBckNMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsSUFBSSxFQUFFO2dCQUNGLGNBQWMsRUFBRSxZQUFZO2dCQUM1QixnQkFBZ0IsRUFBRSxj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SSxDQUFDO0FBQ2hCLENBQUMiLCJmaWxlIjoiYXBwL3NoYXJlZC9jYXJvdXNlbC9jYXJvdXNlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBWaWV3LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIFF1ZXJ5LCBRdWVyeUxpc3QsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0b3JSZWZ9XHJcbmZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05nSWYsIE5nRm9yfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ2Nhcm91c2VsLXNsaWRlJyxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICAnW2NsYXNzLml0ZW1dJzogJ19pdGVtQ2xhc3MnLFxyXG4gICAgICAgICdbY2xhc3MuYWN0aXZlXSc6ICdfYWN0aXZlQ2xhc3MnLFxyXG4gICAgICAgICdbY2xhc3MubGVmdF0nOiAnX2xlZnRDbGFzcycsXHJcbiAgICAgICAgJ1tjbGFzcy5yaWdodF0nOiAnX3JpZ2h0Q2xhc3MnLFxyXG4gICAgICAgICdbY2xhc3MucHJldl0nOiAnX3ByZXZDbGFzcycsXHJcbiAgICAgICAgJ1tjbGFzcy5uZXh0XSc6ICdfbmV4dENsYXNzJyxcclxuICAgICAgICAncm9sZSc6ICdsaXN0Ym94J1xyXG4gICAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxTbGlkZSB7XHJcbiAgICBwcml2YXRlIF9lbDogSFRNTEVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIF9pdGVtQ2xhc3M6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHJpdmF0ZSBfYWN0aXZlQ2xhc3M6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9sZWZ0Q2xhc3M6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9yaWdodENsYXNzOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfcHJldkNsYXNzOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfbmV4dENsYXNzOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50UmVmKSB7XHJcbiAgICAgICAgdGhpcy5fZWwgPSBlbC5uYXRpdmVFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgZ2V0RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VsO1xyXG4gICAgfVxyXG4gICAgYWN0aXZhdGUoKTogdm9pZCB7IHRoaXMuX2FjdGl2ZUNsYXNzID0gdHJ1ZTsgfVxyXG4gICAgZGVhY3RpdmF0ZSgpOiB2b2lkIHsgdGhpcy5fYWN0aXZlQ2xhc3MgPSBmYWxzZTsgfVxyXG4gICAgcHJlcGFyZUFuaW1hdGlvbihpc1RvUmlnaHQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBpc1RvUmlnaHQgPyB0aGlzLl9uZXh0Q2xhc3MgPSB0cnVlIDogdGhpcy5fcHJldkNsYXNzID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGFuaW1hdGUoaXNUb1JpZ2h0OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgaXNUb1JpZ2h0ID8gdGhpcy5fbGVmdENsYXNzID0gdHJ1ZSA6IHRoaXMuX3JpZ2h0Q2xhc3MgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgY2xlYW5BZnRlckFuaW1hdGlvbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9sZWZ0Q2xhc3MgPSB0aGlzLl9yaWdodENsYXNzID0gdGhpcy5fbmV4dENsYXNzID0gdGhpcy5fcHJldkNsYXNzID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdjYXJvdXNlbC1jYXB0aW9uJyxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICAnW2NsYXNzLmNhcm91c2VsLWNhcHRpb25dJzogJ2Nhcm91c2VsQ2FwdGlvbkNsYXNzJ1xyXG4gICAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDYXB0aW9uIHtcclxuICAgIHByaXZhdGUgY2Fyb3VzZWxDYXB0aW9uQ2xhc3M6IGJvb2xlYW4gPSB0cnVlO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogJ2Nhcm91c2VsJyxcclxuICAgIHByb3BlcnRpZXM6IFtcclxuICAgICAgICAnaW5kZXgnLFxyXG4gICAgICAgICd3cmFwJyxcclxuICAgICAgICAnaW50ZXJ2YWwnLFxyXG4gICAgICAgICdwYXVzZScsXHJcbiAgICAgICAgJ25vVHJhbnNpdGlvbjogbm8tdHJhbnNpdGlvbidcclxuICAgIF0sXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJyhtb3VzZWVudGVyKSc6ICd0b2dnbGVBdXRvbWF0aWNTbGlkaW5nKCknLFxyXG4gICAgICAgICcobW91c2VsZWF2ZSknOiAndG9nZ2xlQXV0b21hdGljU2xpZGluZygpJ1xyXG4gICAgfSxcclxuICAgIGV2ZW50czogWydpbmRleGNoYW5nZScsICdzbGlkZXN0YXJ0JywgJ3NsaWRlZW5kJ10sXHJcbiAgICB0ZW1wbGF0ZVVybDogJ2Nhcm91c2VsLmh0bWwnLFxyXG4gICAgZGlyZWN0aXZlczogW05nRm9yLCBOZ0lmXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWwge1xyXG5cclxuICAgIHBhdXNlOiBzdHJpbmcgPSBcImhvdmVyXCI7XHJcblxyXG4gICAgcHJpdmF0ZSBpbmRleGNoYW5nZTogRXZlbnRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgcHJpdmF0ZSBzbGlkZXN0YXJ0OiBFdmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBwcml2YXRlIHNsaWRlZW5kOiBFdmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWY7XHJcbiAgICBwcml2YXRlIF9hY3RpdmVJbmRleDogbnVtYmVyID0gLTE7XHJcbiAgICBwcml2YXRlIF9pbnRlcnZhbDogbnVtYmVyID0gNTAwMDtcclxuICAgIHByaXZhdGUgX2lzQ2hhbmdpbmdTbGlkZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfaXNUb1JpZ2h0OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHByaXZhdGUgX25vVHJhbnNpdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfcXVlcnk6IFF1ZXJ5TGlzdDxDYXJvdXNlbFNsaWRlPjtcclxuICAgIHByaXZhdGUgX3NsaWRlczogQXJyYXk8Q2Fyb3VzZWxTbGlkZT4gPSBbXTtcclxuICAgIHByaXZhdGUgX3RpbWVySWQ6IG51bWJlciA9IG51bGw7XHJcbiAgICBwcml2YXRlIF90cmFuc2l0aW9uRW5kOiBzdHJpbmcgPSBnZXRUcmFuc2l0aW9uRW5kKCk7XHJcbiAgICBwcml2YXRlIF93cmFwOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggQFF1ZXJ5KENhcm91c2VsU2xpZGUpIHF1ZXJ5OiBRdWVyeUxpc3Q8Q2Fyb3VzZWxTbGlkZT4sIGVsOiBFbGVtZW50UmVmLCBcclxuICAgICAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICAgICAgdGhpcy5fZWwgPSBlbDtcclxuICAgICAgICB0aGlzLl9zdGFydEN5Y2xpbmcoKTtcclxuICAgICAgICAoPGFueT5xdWVyeS5jaGFuZ2VzKS5zdWJzY3JpYmUoXyA9PiB0aGlzLl9yZWdpc3RlclNsaWRlcyhxdWVyeSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3JlZ2lzdGVyU2xpZGVzKHF1ZXJ5OiBRdWVyeUxpc3Q8Q2Fyb3VzZWxTbGlkZT4pOiB2b2lkIHtcclxuICAgICAgICB2YXIgYWN0aXZlU2xpZGUgPSB0aGlzLl9zbGlkZXNbdGhpcy5fYWN0aXZlSW5kZXhdO1xyXG4gICAgICAgIHRoaXMuX3NsaWRlcyA9IFtdO1xyXG4gICAgICAgIHZhciBhY3RpdmF0aW9uRG9uZSA9IGZhbHNlO1xyXG4gICAgICAgIHF1ZXJ5Lm1hcCgoc2xpZGUpID0+IHtcclxuICAgICAgICAgICAgc2xpZGUuZGVhY3RpdmF0ZSgpO1xyXG4gICAgICAgICAgICBzbGlkZS5jbGVhbkFmdGVyQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgICAgIGlmIChzbGlkZSA9PT0gYWN0aXZlU2xpZGUgfHwgKHR5cGVvZiBhY3RpdmVTbGlkZSA9PT0gXCJ1bmRlZmluZWRcIiAmJiB0aGlzLl9hY3RpdmVJbmRleCA9PSB0aGlzLl9zbGlkZXMubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICAgICAgc2xpZGUuYWN0aXZhdGUoKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hY3RpdmVJbmRleCAhPT0gdGhpcy5fc2xpZGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fYWN0aXZlSW5kZXggIT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4Y2hhbmdlLm5leHQodGhpcy5fc2xpZGVzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUluZGV4ID0gdGhpcy5fc2xpZGVzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFjdGl2YXRpb25Eb25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9zbGlkZXMucHVzaChzbGlkZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFhY3RpdmF0aW9uRG9uZSAmJiB0aGlzLl9zbGlkZXNbMF0pIHtcclxuICAgICAgICAgICAgdGhpcy5fc2xpZGVzWzBdLmFjdGl2YXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUluZGV4ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5pbmRleGNoYW5nZS5uZXh0KHRoaXMuX2FjdGl2ZUluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5faXNDaGFuZ2luZ1NsaWRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5faXNUb1JpZ2h0ID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgd3JhcChuZXdWYWx1ZTogYm9vbGVhbiB8IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX3dyYXAgPSB0eXBlb2YgbmV3VmFsdWUgPT09IFwic3RyaW5nXCIgPyBuZXdWYWx1ZSAhPSBcImZhbHNlXCIgOiBuZXdWYWx1ZTtcclxuICAgIH1cclxuICAgIHNldCBub1RyYW5zaXRpb24obmV3VmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9ub1RyYW5zaXRpb24gPSB0eXBlb2YgbmV3VmFsdWUgPT09IFwic3RyaW5nXCIgPyBuZXdWYWx1ZSAhPSBcImZhbHNlXCIgOiBuZXdWYWx1ZTtcclxuICAgIH1cclxuICAgIHNldCBpbnRlcnZhbChuZXdWYWx1ZTogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSB0eXBlb2YgbmV3VmFsdWUgPT09IFwic3RyaW5nXCIgPyBwYXJzZUludChuZXdWYWx1ZSkgOiBuZXdWYWx1ZTtcclxuICAgICAgICB0aGlzLl9zdG9wQ3ljbGluZygpO1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0Q3ljbGluZygpO1xyXG4gICAgfVxyXG4gICAgc2V0IGluZGV4KG5ld1ZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAvL05hdmlnYXRpb24gYSBuZXcgaW5kZXhcclxuICAgICAgICBpZiAoIXRoaXMuX2lzQ2hhbmdpbmdTbGlkZSAmJiBuZXdWYWx1ZSAhPSB0aGlzLl9hY3RpdmVJbmRleCAmJiBuZXdWYWx1ZSA+PSAwICYmIG5ld1ZhbHVlIDw9IHRoaXMuX3NsaWRlcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzQ2hhbmdpbmdTbGlkZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc1RvUmlnaHQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNUb1JpZ2h0ID0gbmV3VmFsdWUgPiB0aGlzLl9hY3RpdmVJbmRleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNsaWRlc3RhcnQubmV4dChudWxsKTtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRTbGlkZSA9IHRoaXMuX3NsaWRlc1t0aGlzLl9hY3RpdmVJbmRleF07XHJcbiAgICAgICAgICAgIHZhciBuZXh0U2xpZGUgPSB0aGlzLl9zbGlkZXNbbmV3VmFsdWVdO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX25vVHJhbnNpdGlvbiAmJiB0aGlzLl90cmFuc2l0aW9uRW5kICYmIGN1cnJlbnRTbGlkZSkge1xyXG4gICAgICAgICAgICAgICAgbmV4dFNsaWRlLnByZXBhcmVBbmltYXRpb24odGhpcy5faXNUb1JpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZS5hbmltYXRlKHRoaXMuX2lzVG9SaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dFNsaWRlLmFuaW1hdGUodGhpcy5faXNUb1JpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZW5kQW5pbWF0aW9uQ2FsbGJhY2sgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsaWRlLmdldEVsZW1lbnQoKS5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuX3RyYW5zaXRpb25FbmQsIGVuZEFuaW1hdGlvbkNhbGxiYWNrLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpbmFsaXplVHJhbnNpdGlvbihjdXJyZW50U2xpZGUsIG5leHRTbGlkZSwgbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsaWRlLmdldEVsZW1lbnQoKS5hZGRFdmVudExpc3RlbmVyKHRoaXMuX3RyYW5zaXRpb25FbmQsIGVuZEFuaW1hdGlvbkNhbGxiYWNrLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9LCAzMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9maW5hbGl6ZVRyYW5zaXRpb24oY3VycmVudFNsaWRlLCBuZXh0U2xpZGUsIG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL0luaXRpYWwgdmFsdWVcclxuICAgICAgICBlbHNlIGlmICh0aGlzLl9hY3RpdmVJbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9maW5hbGl6ZVRyYW5zaXRpb24obnVsbCwgbnVsbCwgbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICAvL1RPRE86IHJlbW92ZTogRm9yY2UgY2hhbmdlIGRldGVjdGlvbiAoKyB0cmljayBmb3IgVFMgY29tcGlsZXIpXHJcbiAgICAgICAgICAgIC8vKDxhbnk+dGhpcy5fZWwpLnBhcmVudFZpZXcuX3ZpZXcuY2hhbmdlRGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfZmluYWxpemVUcmFuc2l0aW9uKGN1cnJlbnRTbGlkZTogQ2Fyb3VzZWxTbGlkZSwgbmV4dFNsaWRlOiBDYXJvdXNlbFNsaWRlLCBuZXdWYWx1ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRTbGlkZSkge1xyXG4gICAgICAgICAgICBjdXJyZW50U2xpZGUuZGVhY3RpdmF0ZSgpO1xyXG4gICAgICAgICAgICBjdXJyZW50U2xpZGUuY2xlYW5BZnRlckFuaW1hdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmV4dFNsaWRlKSB7XHJcbiAgICAgICAgICAgIG5leHRTbGlkZS5hY3RpdmF0ZSgpO1xyXG4gICAgICAgICAgICBuZXh0U2xpZGUuY2xlYW5BZnRlckFuaW1hdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9hY3RpdmVJbmRleCA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIHRoaXMuX2lzQ2hhbmdpbmdTbGlkZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2lzVG9SaWdodCA9IG51bGw7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRTbGlkZSB8fCBuZXh0U2xpZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZWVuZC5uZXh0KG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4Y2hhbmdlLm5leHQodGhpcy5fYWN0aXZlSW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmF2aWdhdGVUbyhuZXdJbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IG5ld0luZGV4O1xyXG4gICAgfVxyXG4gICAgcHJldigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5oYXNQcmV2KCkpIHtcclxuICAgICAgICAgICAgdmFyIHByZXZJbmRleCA9IHRoaXMuX2FjdGl2ZUluZGV4IC0gMSA8IDAgPyB0aGlzLl9zbGlkZXMubGVuZ3RoIC0gMSA6IHRoaXMuX2FjdGl2ZUluZGV4IC0gMTtcclxuICAgICAgICAgICAgdGhpcy5faXNUb1JpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSBwcmV2SW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbmV4dCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5oYXNOZXh0KCkpIHtcclxuICAgICAgICAgICAgdmFyIG5leHRJbmRleCA9ICh0aGlzLl9hY3RpdmVJbmRleCArIDEpICUgdGhpcy5fc2xpZGVzLmxlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5faXNUb1JpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5pbmRleCA9IG5leHRJbmRleDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBoYXNQcmV2KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zbGlkZXMubGVuZ3RoID4gMSAmJiAhKCF0aGlzLl93cmFwICYmIHRoaXMuX2FjdGl2ZUluZGV4ID09PSAwKTtcclxuICAgIH1cclxuICAgIGhhc05leHQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NsaWRlcy5sZW5ndGggPiAxICYmICEoIXRoaXMuX3dyYXAgJiYgdGhpcy5fYWN0aXZlSW5kZXggPT09ICh0aGlzLl9zbGlkZXMubGVuZ3RoIC0gMSkpO1xyXG4gICAgfVxyXG4gICAgdG9nZ2xlQXV0b21hdGljU2xpZGluZygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5wYXVzZSA9PT0gXCJob3ZlclwiKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl90aW1lcklkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdG9wQ3ljbGluZygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhcnRDeWNsaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfc3RhcnRDeWNsaW5nKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbnRlcnZhbCA+PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVySWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5leHQoKTtcclxuICAgICAgICAgICAgfSwgdGhpcy5faW50ZXJ2YWwgPiA2MDAgPyB0aGlzLl9pbnRlcnZhbCA6IDYwMCk7IC8vNjAwbXMgaXMgdGhlIHRyYW5zaXRpb24gZHVyYXRpb24gZGVmaW5lZCBpbiBCUyBjc3NcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9zdG9wQ3ljbGluZygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fdGltZXJJZCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3RpbWVySWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl90aW1lcklkID0gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuLy8gQ1NTIFRSQU5TSVRJT04gU1VQUE9SVCAoU2hvdXRvdXQ6IGh0dHA6Ly93d3cubW9kZXJuaXpyLmNvbS8pXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5mdW5jdGlvbiBnZXRUcmFuc2l0aW9uRW5kKCk6IHN0cmluZyB7XHJcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhbmd1bGFyMi1ib290c3RyYXAnKTtcclxuICAgIHZhciB0cmFuc0VuZEV2ZW50TmFtZXMgPSB7XHJcbiAgICAgICAgV2Via2l0VHJhbnNpdGlvbjogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxyXG4gICAgICAgIE1velRyYW5zaXRpb246ICd0cmFuc2l0aW9uZW5kJyxcclxuICAgICAgICBPVHJhbnNpdGlvbjogJ29UcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kJyxcclxuICAgICAgICB0cmFuc2l0aW9uOiAndHJhbnNpdGlvbmVuZCdcclxuICAgIH07XHJcbiAgICBmb3IgKHZhciBuYW1lIGluIHRyYW5zRW5kRXZlbnROYW1lcykge1xyXG4gICAgICAgIGlmIChlbC5zdHlsZVtuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cmFuc0VuZEV2ZW50TmFtZXNbbmFtZV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuIl19
