import { Injectable, EventEmitter, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  public readonly onActiveElementChanged = new EventEmitter<ElementRef>();
  public readonly onPageChanged = new EventEmitter<string>();

  private _activeElement: ElementRef;
  private _activePage: string;

  get activeElement(): ElementRef {
    return this._activeElement;
  }

  set activeElement(element: ElementRef) {
    this._activeElement = element;
    this.onActiveElementChanged.emit(element);
  }


  get activePage(): string {
    return this._activePage;
  }

  set activePage(page: string) {
    this._activePage = page;
    this.onPageChanged.emit(page);
  }



  scrollToHash(hash: string, animation?: boolean) {
    if (hash) {
      const cmp = document.getElementById(hash);
      if (cmp) {
        // cmp.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const top = cmp.offsetTop - 100;

        if (animation) {
          window.scrollTo({top: top, behavior: 'smooth'});
        } else {
          window.scrollTo({top: top});
        }
      }
    } else {
      window.scrollTo(0, 0);
    }
  }


  scrollToTop() {
    // window.scrollTo(0, 0);
    window.scrollTo({top: 0});
  }

}
