import { DisplayDetector, DisplayType } from './../display-detector.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { NavbarService } from './navbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';

declare var UIkit: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  languages = ['de', 'en'];

  tabs = [
    {
      title: 'home.title',
      id: 'home',
      active: ['home'],
      icon: 'assets/icons/home.svg',
      icon_active: 'assets/icons/home_active.svg', url: ''
    },
    {
      title: 'services.title',
      id: 'services',
      active: ['services', 'provisioning'],
      icon: 'assets/icons/services.svg',
      icon_active: 'assets/icons/services_active.svg',
      url: '',
      sub: [
        {
          title: 'services.isp.title',
          url: 'services/isp-services'
        },
        {
          title: 'services.dev.title',
          url: 'services/software-entwicklung'
        },
        {
          title: 'services.consulting.title',
          url: 'services/consulting'
        }
      ]
    },
    {
      title: 'about_us.title',
      id: 'about-us',
      active: ['about-us'],
      icon: 'assets/icons/aboutus.svg',
      icon_active: 'assets/icons/aboutus_active.svg',
      url: '',
      sub: [
        {
          title: 'jobs.title',
          url: 'unternehmen/jobs'
        }
      ]
    },
    {
      title: 'events.title',
      id: 'events',
      active: ['events'],
      icon: 'assets/icons/events.svg',
      icon_active: 'assets/icons/events_active.svg',
      url: ''
    },
    {
      title: '_general.partners',
      id: 'partner',
      active: ['partner'],
      icon: 'assets/icons/partners.svg',
      icon_active: 'assets/icons/partners_active.svg',
      url: ''
    },
    {
      title: 'contact.title',
      id: 'contact',
      active: ['contact'],
      icon: 'assets/icons/kontakt.svg',
      icon_active: 'assets/icons/kontakt_active.svg',
      url: ''
    },

  ];

  activeSection = 'home';
  mobileMenuOpen = false;
  displayType = DisplayType;

  private readonly subscriptions = new Array<Subscription>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public navbarService: NavbarService,
    public translate: TranslateService,
    public displayDetector: DisplayDetector
  ) {
    this.subscriptions.push(
      this.navbarService.onActiveElementChanged.subscribe(
        e => this.onActiveSectionChanged(e)
      )
    );

    this.subscriptions.push(
      this.navbarService.onPageChanged.subscribe(
        p => this.onPageChanged(p)
      )
    );

    const lang = navigator.language;
    if (lang && lang.split('-') && lang.split('-').length > 0) {
      this.translate.use(lang.split('-')[0].toLowerCase());
    } else {
      this.translate.use(this.translate.defaultLang);
    }
  }

  ngOnInit() {
    this.subscriptions.push(this.route.fragment.subscribe((hash: string) => {
      this.navbarService.scrollToHash(hash, true);
    }));
  }

  ngOnDestroy() {
    for (const s of this.subscriptions) {
      s.unsubscribe();
    }
  }

  onNavigationItemClicked(event: MouseEvent, tab) {
    this.mobileMenuOpen = false;
    let animation = false;
    if (!tab.sub || (event.srcElement as any).className === 'tab-icon' || (event.srcElement as any).className === 'tab-a') {
      animation = this.router.url.split('/').length <= 2;
      if (this.displayDetector.getDeviceType() === DisplayType.Phone && tab.id === 'services') {
        this.router.navigate(['services/isp-services']); // on mobile always to provisioning page
      } else {
        this.router.navigate([tab.url], { fragment: tab.id });
      }
      if (window.location.hash === `#${tab.id}`) {
        this.navbarService.scrollToHash(tab.id, false);
      }
    }
  }

  onSubClicked(dropdown) {
    dropdown.classList.remove('uk-open');
    UIkit.drop(dropdown).hide();
  }


  setLanguage(lang: string) {
    this.translate.use(lang);
  }

  onBurgerMenuBtnClicked() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  private onActiveSectionChanged(e: ElementRef) {
    if (e && e.nativeElement) {
      const sectionId = e.nativeElement.id;
      for (const tab of this.tabs) {
        if (tab.active.indexOf(sectionId) !== -1) {
          this.activeSection = tab.id;
          return;
        }
      }
    } else {
      this.activeSection = null;
    }
  }

  private onPageChanged(page: string) {
    switch (page) {
      case 'home':
        this.activeSection = page;
        break;
      case 'provisioning':
        this.activeSection = 'services';
        break;
      case 'sofware-development':
        this.activeSection = 'services';
        break;
      case 'consulting':
        this.activeSection = 'services';
        break;
      case 'jobs':
        this.activeSection = 'about-us';
        break;
      default:
        this.activeSection = null;
        break;
    }

  }

}
