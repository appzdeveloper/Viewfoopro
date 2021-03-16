import {Component} from '@angular/core';
import {Carousel, CarouselSlide, CarouselCaption} from '../shared/carousel/carousel';
import {NgIf} from '@angular/common';
import { NgForm }    from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'demo-carousel',
    templateUrl: 'demo-carousel.html',
    directives: [NgIf, Carousel, CarouselSlide, CarouselCaption]
})
export class DemoCarousel {

    model = {};

    slideIndex;
    slideWrap;
    slideInterval;
    slidePause;
    slideNoTransition;
    extraSlides;
    constructor() {
        this.slideIndex = 1;
        this.slideWrap = true;
        this.slideInterval = 5000;
        this.slidePause = "hover";
        this.slideNoTransition = false;
        this.extraSlides = false;
    }
    onIndexFieldChange(event) {
        this.slideIndex = event.target.value;
    }
    onIndexChange(newValue) {
        this.slideIndex = newValue;
    }
    onIntervalFieldChange(event) {
        this.slideInterval = event.target.value;
    }
    onWrapCheckboxChange(event) {
        this.slideWrap = event.target.checked;
    }
    onPauseCheckboxChange(event) {
        this.slidePause = event.target.checked ? "hover" : "";
    }
    onAnimationCheckboxChange(event) {
        this.slideNoTransition = !event.target.checked;
    }
    onExtraCheckboxChange(event) {
        this.extraSlides = event.target.checked;
    }
    onSlideStart() {
        //console.log("Start sliding");
    }
    onSlideEnd() {
        //console.log("End sliding");
    }
}
