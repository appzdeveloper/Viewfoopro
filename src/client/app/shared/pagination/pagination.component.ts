import {Component, OnInit, Input, Output, ElementRef,
EventEmitter, Self, SkipSelf, Renderer, OnChanges, SimpleChange, ChangeDetectorRef}
from '@angular/core';
import {NgFor, NgIf, ControlValueAccessor, NgModel} from '@angular/common';
import {IAttribute} from './IAttribute';

export interface IPaginationConfig extends IAttribute {
    maxSize: number;
    itemsPerPage: number;
    boundaryLinks: boolean;
    directionLinks: boolean;
    firstText: string;
    previousText: string;
    nextText: string;
    lastText: string;

    rotate: boolean;
    isCarousel: boolean;
}
export interface IPageChangedEvent {
    itemsPerPage: number;
    page: number;
}

const paginationConfig: IPaginationConfig = {
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
//<ul class="pagination" [ngClass]="classMap">\n\
//    <li>Hello</li>
//    <li class="pagination-first page-item"
//        *ngIf="boundaryLinks"
//        [class.disabled]="noPrevious()||disabled">
//      <a class="page-link" href (click)="selectPage(1, $event)" [innerHTML]="getText('first')"></a>
//    </li>
//
//    <li class="pagination-prev page-item"
//        *ngIf="directionLinks"
//        [class.disabled]="noPrevious()||disabled">
//      <a class="page-link" href (click)="selectPage(page - 1, $event)" [innerHTML]="getText('previous')"></a>
//      </li>
//
//    <li *ngFor="let pg of pages"
//        [class.active]="pg.active"
//        [class.disabled]="disabled&&!pg.active"
//        class="pagination-page page-item">
//      <a class="page-link" href (click)="selectPage(pg.number, $event)" [innerHTML]="pg.text"></a>
//    </li>
//
//    <li class="pagination-next page-item"
//        *ngIf="directionLinks"
//        [class.disabled]="noNext()">
//      <a class="page-link" href (click)="selectPage(page + 1, $event)" [innerHTML]="getText('next')"></a></li>
//
//    <li class="pagination-last page-item"
//        *ngIf="boundaryLinks"
//        [class.disabled]="noNext()">
//      <a class="page-link" href (click)="selectPage(totalPages, $event)" [innerHTML]="getText('last')"></a></li>
//  </ul>
const PAGINATION_TEMPLATE = ``;

@Component({
    moduleId: module.id,
    selector: 'pagination',//[ngModel]
    //template: PAGINATION_TEMPLATE,
    templateUrl:'pagination.component.html',
    directives: [NgFor, NgIf]
})
export class PaginationComponent implements OnChanges, ControlValueAccessor, OnInit, IPaginationConfig, IAttribute {

    //--------
    @Input() public totalItems: number;
    //@Input() public gotoLastPage: boolean;
    //--------

    @Input() public maxSize: number;

    @Input() public boundaryLinks: boolean;
    @Input() public directionLinks: boolean;
    @Input() public firstText: string;
    @Input() public previousText: string;
    @Input() public nextText: string;
    @Input() public lastText: string;
    @Input() public isCarousel: boolean = false;

    @Input() public isPublicViewfoo: boolean = false;

    @Input() private disabled: boolean;
    @Input() public rotate: boolean;
    @Output() private numPages: EventEmitter<number> = new EventEmitter();
    @Output() private pageChanged: EventEmitter<IPageChangedEvent> = new EventEmitter();

    @Input() public get itemsPerPage() {
        return this._itemsPerPage;
    }

    public set itemsPerPage(v: number) {
        this._itemsPerPage = v;
        this.totalPages = this.calculateTotalPages();
    }

    @Input() private get gotoLastPage(): boolean {
        return this._gotoLastPage;
    }

    public set currentPage(v: number) {
        this._currentPage = v;
        this.selectPage(v, null);
    }

    @Input() private get currentPage(): boolean {
        return this._currentPage;
    }

    private set gotoLastPage(v: boolean) {
        this._gotoLastPage = v;
        //console.log("set gotoLastPage = "+v);
    }

    @Input() private get totalItems(): number {
        return this._totalItems;
    }

    private set totalItems(v: number) {
        this._totalItems = v;
        this.totalPages = this.calculateTotalPages();
    }

    public config: any;
    private classMap: string;

    private _itemsPerPage: number;
    private _totalItems: number;
    private _totalPages: number;

    private inited: boolean = false;

    private get totalPages() {
        return this._totalPages;
    }

    private set totalPages(v: number) {
        this._totalPages = v;
        this.numPages.emit(v);
        if (this.inited) {
            this.selectPage(this.page);
        }
        if(this.gotoLastPage) {
            //console.log("set totalPages gotoLastPage is true");
            this.selectPage(v);
            //this.gotoLastPage = false;
        }
    }

    public set page(value) {
        const _previous = this._page;
        this._page = (value > this.totalPages) ? this.totalPages : (value || 1);

        if (_previous === this._page || typeof _previous === 'undefined') {
            return;
        }

        this.pageChanged.emit({
            page: this._page,
            itemsPerPage: this.itemsPerPage
        });
    }

    private get page() {
        return this._page;
    }

    // ??
    private _page: number;
    private pages: Array<any>;

    constructor( @SkipSelf() public cd: NgModel, public renderer: Renderer,
        public elementRef: ElementRef, private _changeDetectionRef : ChangeDetectorRef) {
        //@Self() public cd:NgModel
        cd.valueAccessor = this;
        this.config = this.config || paginationConfig;

    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
//        let log: string[] = [];
        var self = this;
        for (let propName in changes) {
            //console.log("ngOnChanges "+propName);
            if(propName == "totalItems") {
                //this.inited = true;
                //this.page =
            }
//            let changedProp = changes[propName];
//            let from = JSON.stringify(changedProp.previousValue);
//            let to = JSON.stringify(changedProp.currentValue);
//            log.push(`${propName} changed from ${from} to ${to}`);
        }
//        this.changeLog.push(log.join(', '));
        //console.log("ngOnChanges");
    }

    ngOnInit() {
        //--------
        this.page = 1;
        //--------
        this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';
        // watch for maxSize
        this.maxSize = typeof this.maxSize !== 'undefined' ? this.maxSize : paginationConfig.maxSize;
        this.rotate = typeof this.rotate !== 'undefined' ? this.rotate : paginationConfig.rotate;
        this.isCarousel = typeof this.isCarousel !== 'undefined' ? this.isCarousel : paginationConfig.isCarousel;
        this.boundaryLinks = typeof this.boundaryLinks !== 'undefined' ? this.boundaryLinks : paginationConfig.boundaryLinks;
        this.directionLinks = typeof this.directionLinks !== 'undefined' ? this.directionLinks : paginationConfig.directionLinks;

        // base class
        this.itemsPerPage = typeof this.itemsPerPage !== 'undefined' ? this.itemsPerPage : paginationConfig.itemsPerPage;
        this.totalPages = this.calculateTotalPages();
        // this class
        this.pages = this.getPages(this.page, this.totalPages);
        //this.page = this.cd.value;
        //this.page = 1;
        this.inited = true;

//console.log("pagination.component");
        //console.log("this.totalItems = " + this.totalItems);
        //console.log("itemsPerPage = " + this.itemsPerPage + " page = " + this.page + " totalPages = " + this.totalPages);

    }

    writeValue(value: number) {
        this.page = value;
        this.pages = this.getPages(this.page, this.totalPages);
    }

    private selectPage(page: number, event?: MouseEvent) {
        if (event) {
            event.preventDefault();
        }

        if (!this.disabled) {
            if (event && event.target) {
                let target: any = event.target;
                target.blur();
            }
            this.writeValue(page);
            this.cd.viewToModelUpdate(this.page);
        }
    }

    private getText(key: string): string {
        return (<IAttribute>this)[key + 'Text'] || paginationConfig[key + 'Text'];
    }

    private noPrevious(): boolean {
        return this.page === 1;
    }

    private noNext(): boolean {
        return this.page === this.totalPages;
    }

    // Create page object used in template
    private makePage(number: number, text: string, isActive: boolean): { number: number, text: string, active: boolean } {
        return {
            number: number,
            text: text,
            active: isActive
        };
    }

    private getPages(currentPage: number, totalPages: number): Array<any> {
        let pages: any[] = [];

        // Default page limits
        let startPage = 1;
        let endPage = totalPages;
        let isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;

        // recompute if maxSize
        if (isMaxSized) {
            if (this.rotate) {
                // Current page is displayed in the middle of the visible ones
                startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
                endPage = startPage + this.maxSize - 1;

                // Adjust if limit is exceeded
                if (endPage > totalPages) {
                    endPage = totalPages;
                    startPage = endPage - this.maxSize + 1;
                }
            } else {
                // Visible pages are paginated with maxSize
                startPage = ((Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize) + 1;

                // Adjust last page if limit is exceeded
                endPage = Math.min(startPage + this.maxSize - 1, totalPages);
            }
        }

        // Add page number links
        for (var number = startPage; number <= endPage; number++) {
            let page = this.makePage(number, number.toString(), number === currentPage);
            pages.push(page);
        }

        // Add links to move between page sets
        if (isMaxSized && !this.rotate) {
            if (startPage > 1) {
                let previousPageSet = this.makePage(startPage - 1, '...', false);
                pages.unshift(previousPageSet);
            }

            if (endPage < totalPages) {
                let nextPageSet = this.makePage(endPage + 1, '...', false);
                pages.push(nextPageSet);
            }
        }

        return pages;
    }

    // base class
    private calculateTotalPages(): number {
        let totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    }

    onChange = (_: any) => {
    };
    onTouched = () => {
    };

    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }
}
