import { DisplayDetector, DisplayType } from './../display-detector.service';
import { NavbarService } from './../navbar/navbar.service';
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { News } from '../news/News';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  showHeaderText = true;
  currentHeaderIndex = 0;
  headlineTypeSpeed = 65; // 0;

  // headerTexts = [
  //   'home.headline1',
  //   'home.headline2',
  //   'home.headline4',
  //   'home.headline3'
  // ];
  headerTexts = [
    'ACS - TR069 - SNMP - USP - TFTP',
    'FTTX - DOCSIS - GPON',
    'DHCP - RADIUS - IP',
    'PROVISIONING - MONITORING'
  ];

  skills = {
    Unsere: [
      {
        title: 'about_us.our_team.robert_wurm.skills1',
        value: 100
      },
      {
        title: 'about_us.our_team.robert_wurm.skills2',
        value: 100
      },
      {
        title: 'about_us.our_team.robert_wurm.skills3',
        value: 100
      },
      {
        title: 'about_us.our_team.robert_wurm.skills4',
        value: 100
      },
      {
        title: 'about_us.our_team.robert_wurm.skills5',
        value: 100
      }
    ],
    Mathias: [
      {
        title: 'about_us.our_team.mathias_aichinger.skills1',
        value: 100
      },
      {
        title: 'about_us.our_team.mathias_aichinger.skills2',
        value: 90
      },
      {
        title: 'about_us.our_team.mathias_aichinger.skills3',
        value: 40
      },
      {
        title: 'about_us.our_team.mathias_aichinger.skills4',
        value: 90
      },
      {
        title: 'about_us.our_team.mathias_aichinger.skills5',
        value: 90
      }
    ],
    Roberts: [
      {
        title: 'about_us.our_team.robert_wurm.skills1',
        value: 90
      },
      {
        title: 'about_us.our_team.robert_wurm.skills2',
        value: 90
      },
      {
        title: 'about_us.our_team.robert_wurm.skills3',
        value: 90
      },
      {
        title: 'about_us.our_team.robert_wurm.skills4',
        value: 40
      },
      {
        title: 'about_us.our_team.robert_wurm.skills5',
        value: 100
      }
    ],
    Christians: [
      {
        title: 'about_us.our_team.christian_aichinger.skills1',
        value: 60
      },
      {
        title: 'about_us.our_team.christian_aichinger.skills2',
        value: 100
      },
      {
        title: 'about_us.our_team.christian_aichinger.skills3',
        value: 30
      },
      {
        title: 'about_us.our_team.christian_aichinger.skills4',
        value: 90
      },
      {
        title: 'about_us.our_team.christian_aichinger.skills5',
        value: 100
      }
    ]
  }

  currentSkill = {
    name: 'Unsere',
    value: this.skills.Unsere,
    isPerson: false
  }

  events = [
    {
      title: 'events.1.title',
      subtitle: 'events.1.subtitle',
      img: '/assets/events/cabletech.jpg',
      link: 'https://www.cabletech.at',
      canceled: true
    },
    {
      title: 'events.2.title',
      subtitle: 'events.2.subtitle',
      img: '/assets/events/breko.png',
      link: 'https://brekoverband.de/fiberdays19',
      canceled: true
    },
    {
      title: 'events.3.title',
      subtitle: 'events.3.subtitle',
      img: '/assets/events/anga.png',
      link: 'http://www.angacom.de/',
      canceled: true
    },
    {
      title: 'events.5.title',
      subtitle: 'events.5.subtitle',
      img: '/assets/events/frk.png',
      link: 'https://www.breitbandkongress-frk.de/'
    },
    {
      title: 'events.4.title',
      subtitle: 'events.4.subtitle',
      img: '/assets/events/CableDays.jpg',
      link: 'https://www.wko.at/site/cable-days/start.html',
      canceled: true
    },
    {
      title: 'events.6.title',
      subtitle: 'events.6.subtitle',
      img: '/assets/events/SuisseDigital.png',
      link: 'https://www.suissedigital.ch'
    }
  ]


  images_provisioning = [
    // { src: 'assets/provisioning/screenshots/Dashboard.png', caption: 'Dashboard' },
    { src: 'assets/home/v3/dashboard-overview-browser.png', caption: 'Dashboard' },

    { src: 'assets/provisioning/screenshots/Provisioning.png', caption: 'Services' },
    { src: 'assets/provisioning/screenshots/Provisioning2.png', caption: 'Services' },
    { src: 'assets/provisioning/screenshots/ACS-Tasks2.png', caption: 'ACS-Tasks' },
    { src: 'assets/provisioning/screenshots/ACS-Tasks.png', caption: 'ACS-Workflows' },
    { src: 'assets/provisioning/screenshots/ACS-Templating.png', caption: 'ACS-Templating' },
    { src: 'assets/provisioning/screenshots/ACS-Workflows.png', caption: 'ACS-Workflows' },
    { src: 'assets/provisioning/screenshots/Bootfiles.png', caption: 'Bootfiles' },
    { src: 'assets/provisioning/screenshots/CPE-Management.png', caption: 'CPE-Management' }
  ];


  images_customer = [
    { src: 'assets/provisioning/screenshots/Locations.png', caption: 'Locations' },
    { src: 'assets/provisioning/screenshots/API Docs.png', caption: 'API' },
    { src: 'assets/provisioning/screenshots/Globale Services.png', caption: 'Global Services' },
    { src: 'assets/provisioning/screenshots/Infrastructure.png', caption: 'Infrastruktur' },
    { src: 'assets/provisioning/screenshots/Dashboard Editor.png', caption: 'Dashboard Editor' },


  ];

  images_ip = [
    { src: 'assets/provisioning/screenshots/IP-Management.png', caption: 'IP-Management' },
    { src: 'assets/provisioning/screenshots/Assign IP.png', caption: 'Assign IP' },
    { src: 'assets/provisioning/screenshots/IP-Ranges.png', caption: 'IP-Ranges' }
  ];

  images_monitoring = [
    { src: 'assets/provisioning/screenshots/Monitoring3.png', caption: 'Downstream Monitoring' },
    { src: 'assets/provisioning/screenshots/Monitoring2.png', caption: 'Downstream Monitoring' },

    { src: 'assets/provisioning/screenshots/Monitoring1.png', caption: 'Upstream Monitoring' },
    { src: 'assets/provisioning/screenshots/Monitoring5.png', caption: 'Error Monitoring' },
    { src: 'assets/provisioning/screenshots/Monitoring6.png', caption: 'Upstream Monitoring' },
    { src: 'assets/provisioning/screenshots/Monitoring7.png', caption: 'Status Monitoring' }

  ];

  news_posts = News.getNews();

  onNewsDotClicked(post) {
    if (post.imgIndex >= post.imgs.length - 1) {
      post.imgIndex = 0;
    } else {
      post.imgIndex++;
    }
  }

  displayType = DisplayType;
  homeImgLoaded = false;


  showProvisioningVideoTabs = false;
  showManagementVideoTabs = false;

  @ViewChild('provVideoContent', { static: false })
  provVideoContent: ElementRef;

  @ViewChild('managVideoContent', { static: false })
  managVideoContent: ElementRef;

  constructor(
    private router: Router,
    private navbarService: NavbarService,
    public displayDetector: DisplayDetector
  ) {
    this.navbarService.activePage = 'home';
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (window.location.hash) {
        const hash = window.location.hash.split('#');
        if (hash.length > 1) {
          this.navbarService.scrollToHash(hash[1], true);
        }
      }
    }, 300);


    setTimeout(() => {
      this.headlineTypeSpeed = 65;
    }, 1000);
  }

  get mobileMode(): boolean {
    return this.displayDetector.getDeviceType() === this.displayType.Phone;
  }

  showSkillsFor(person: string) {
    if (this.displayDetector.getDeviceType() === DisplayType.Phone) {
      return;
    }
    this.currentSkill.name = person;
    this.currentSkill.value = this.skills[person];
    this.currentSkill.isPerson = this.currentSkill.name !== 'Unsere';
  }


  onTeamSectionClicked(e: MouseEvent) {
    if ((e.srcElement as any).tagName !== 'IMG') {
      this.showSkillsFor('Unsere');
    }
  }


  onRequestDemoClicked() {
    const mailText = 'mailto:office@easysol.com?subject=EasyProvisioning Demo&body='; // add the links to body
    window.location.href = mailText;
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  openInNewTab(url: string) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  onLoadHomeStarted() {
    console.log('onLoadHomeStarted');
  }

  onLoadHomeEnded() {
    setTimeout(() => {
      this.homeImgLoaded = true;
    }, 500);

    setTimeout(() => {
      this.startHeadlineShow();
    }, 1000);
  }

  showProvVideoTab() {
    this.showProvisioningVideoTabs = true;
    setTimeout(() => {
      this.provVideoContent.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }

  showManagementVideoTab() {
    this.showManagementVideoTabs = true;
    setTimeout(() => {
      this.managVideoContent.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }

  private startHeadlineShow() {
    // this.currentHeaderIndex = 1;

    setInterval(() => {
      this.showHeaderText = false;
      if (this.currentHeaderIndex >= this.headerTexts.length - 1) {
        this.currentHeaderIndex = 0;
      } else {
        this.currentHeaderIndex++;
      }
      setTimeout(() => {
        this.showHeaderText = true;
      }, 100);
      // console.log('headerTexts: ', this.headerTexts[this.currentHeaderIndex]);
    }, 6000);
  }
}
