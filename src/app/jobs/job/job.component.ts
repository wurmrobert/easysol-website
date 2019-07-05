import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';


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
      switch (job) {
        case 'frontend':
          this.title.setTitle('EasySolutions - Jobs - Frontend Entwickler');
          this.pdfSrc = 'Jobausschreibung_FrontendEntwickler.pdf';
          break;

        case 'backend':
          this.title.setTitle('EasySolutions - Jobs - Backend Entwickler');
          this.pdfSrc = 'Jobausschreibung_BackendEntwickler.pdf';
          break;

        // case 'internship':
        //   this.title.setTitle('EasySolutions - Jobs - Praktikum');
        //   this.pdfSrc = 'Jobausschreibung_Praktikum.pdf';
        //   break;

        case 'netzwerktechniker':
          this.title.setTitle('EasySolutions - Jobs - Netzwerktechniker');
          this.pdfSrc = 'Jobausschreibung_Netzwerktechniker.pdf';
          break;

        case 'sekretärin':
          this.title.setTitle('EasySolutions - Jobs - Sekretärin für Administration geringfügig');
          this.pdfSrc = 'Jobausschreibung_Administration.pdf';
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

  loadCompleted() {
    this.pdfVisibility = 'shown';
    this.spinnerVisibility = 'hidden';
  }

  onLoadError() {
    console.log('onLoadError');
    this.noAvaliable = true;
    this.loadCompleted();
  }

  navigateToJobs() {
    this.router.navigateByUrl('/unternehmen/jobs');
  }
}
