import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { NavbarService } from './../navbar/navbar.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0, display: 'none' })),
      transition('shown => hidden', animate(0)),
      transition('hidden => shown', animate('500ms'))
    ])
  ]
})
export class JobsComponent implements OnInit, AfterViewInit, OnDestroy {

  jobListVisibility = 'shown';
  detailViewVisibility = 'hidden';

  jobsFullTime = [
    { title: 'Frontend Entwickler' , subtitle: 'Angular | TypeScript | HTML', route: 'frontend' },
    { title: 'Backend Entwickler' , subtitle: 'Ruby | Docker | SQL | REST', route: 'backend' },
    { title: 'Netzwerktechniker' , subtitle: 'IP | Routing | Security | Linux', route: 'netzwerktechniker' }
  ];

  internships = [
  ];
  // { title: 'Softwareentwicklung / Netzwerktechnik' , subtitle: 'Angular | TypeScript | HTML | Ruby | Docker | SQL', route: 'internship' }


  gering = [
    { title: 'Sekretärin für Administration' , subtitle: '8h Woche', route: 'sekretärin' }
  ];

  private routerSubscription: Subscription;

  constructor(
    meta: Meta, title: Title, private router: Router,
    private navbarService: NavbarService
  ) {
    title.setTitle('EasySolutions - Jobs');
    this.navbarService.activePage = 'jobs';

    this.routerSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const detailIsActive = event.url.split('/').length > 3;
        this.jobListVisibility = detailIsActive ? 'hidden' : 'shown';
        this.detailViewVisibility = detailIsActive ? 'shown' : 'hidden';
      }
    })
  }

  ngOnInit() {}


  ngAfterViewInit(): void {
    this.navbarService.scrollToTop();
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  navigateToJob(job: any) {
    this.router.navigateByUrl(`/unternehmen/jobs/${job.route}`);
  }

}
