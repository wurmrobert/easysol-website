import { DisplayDetector, DisplayType } from './../display-detector.service';
import { NavbarService } from './../navbar/navbar.service';
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  showHeaderText = true;
  currentHeaderIndex = 0;
  headlineTypeSpeed = 0;

  headerTexts = [
    'home.headline1',
    'home.headline2',
    'home.headline4',
    'home.headline3'
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
      link: 'https://www.cabletech.at'
    },
    {
      title: 'events.2.title',
      subtitle: 'events.2.subtitle',
      img: '/assets/events/breko.png',
      link: 'https://brekoverband.de/fiberdays19'
    },
    {
      title: 'events.3.title',
      subtitle: 'events.3.subtitle',
      img: '/assets/events/anga.png',
      link: 'http://www.angacom.de/'
    },
    {
      title: 'events.4.title',
      subtitle: 'events.4.subtitle',
      img: '/assets/events/CableDays.jpg',
      link: 'https://www.wko.at/site/cable-days/start.html'
    },
    {
      title: 'events.5.title',
      subtitle: 'events.5.subtitle',
      img: '/assets/events/SuisseDigital.png',
      link: 'https://www.suissedigital.ch'
    }
  ]

  displayType = DisplayType;
  homeImgLoaded = false;


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
        if (hash.length > 1)  {
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

  private startHeadlineShow() {
    // this.currentHeaderIndex = 1;

    setInterval(() => {
      this.showHeaderText = false;
      if (this.currentHeaderIndex >= this.headerTexts.length - 1) {
        this.currentHeaderIndex = 0;
      } else {
        this.currentHeaderIndex ++;
      }
      setTimeout(() => {
        this.showHeaderText = true;
      }, 100);
      // console.log('headerTexts: ', this.headerTexts[this.currentHeaderIndex]);
    }, 6000);
  }
}
