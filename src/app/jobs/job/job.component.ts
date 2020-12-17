import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

declare let ga: any;

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0, display: 'none' })),
      transition('shown => hidden', animate(0)),
      transition('hidden => shown', animate('500ms'))
    ])
  ]
})
export class JobComponent implements OnInit, OnDestroy {

  pdfVisibility = 'hidden';
  spinnerVisibility = 'shown';

  pdfSrc: string;
  noAvaliable = false;

  private routerParamsSubscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private title: Title) {
    title.setTitle('EasySolutions - Jobs');
  }


  ngOnInit() {
    this.routerParamsSubscription = this.route.params.subscribe(params => {
      let job = params['job'];

      try {
        if (ga) {
          ga('send', 'event', {
            'eventCategory': 'Category',
            'eventAction': 'Action',
            'eventValue': ('View: ' + job)
          });
        }
      } catch (ex) {
        console.error('google analytics: ', ex);
      }

      switch (job) {
        // case 'frontend':
        //   this.title.setTitle('EasySolutions - Jobs - Frontend Entwickler');
        //   this.pdfSrc = 'Jobausschreibung_FrontendEntwickler.pdf';
        //   break;

        // case 'backend':
        //   this.title.setTitle('EasySolutions - Jobs - Backend Entwickler');
        //   this.pdfSrc = 'Jobausschreibung_BackendEntwickler.pdf';
        //   break;

        // case 'internship':
        //   this.title.setTitle('EasySolutions - Jobs - Praktikum');
        //   this.pdfSrc = 'Jobausschreibung_Praktikum.pdf';
        //   break;

        // case 'netzwerktechniker':
        //   this.title.setTitle('EasySolutions - Jobs - Netzwerktechniker');
        //   this.pdfSrc = 'Jobausschreibung_Netzwerktechniker.pdf';
        //   break;

        // case 'sekretärin':
        //   this.title.setTitle('EasySolutions - Jobs - Sekretärin für Administration geringfügig');
        //   this.pdfSrc = 'Jobausschreibung_Administration.pdf';
        //   break;

        case 'fullstack':
          this.title.setTitle('EasySolutions - Jobs - Full Stack Developer');
          this.pdfSrc = 'Jobausschreibung_FullStackDeveloper.pdf';
          break;

        case 'network-engineer':
          this.title.setTitle('EasySolutions - Jobs - Systems Engineer Network');
          this.pdfSrc = 'Jobausschreibung_SystemsEngineerNetwork.pdf';
          break;

        default:
          this.onLoadError();
          break;
      }
    });

  }

  ngOnDestroy() {
    this.routerParamsSubscription.unsubscribe();
  }

  loadCompleted(e?: any) {
    console.log('loadCompleted...', e);
    this.pdfVisibility = 'shown';
    this.spinnerVisibility = 'hidden';
  }

  onLoadError(e?: any) {
    console.log('onLoadError: ', e);
    this.noAvaliable = true;
    this.loadCompleted();
  }

  navigateToJobs() {
    this.router.navigateByUrl('/unternehmen/jobs');
  }
}
