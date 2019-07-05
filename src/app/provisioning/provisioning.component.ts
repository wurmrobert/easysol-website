import { NavbarService } from './../navbar/navbar.service';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-provisioning',
  templateUrl: './provisioning.component.html',
  styleUrls: ['./provisioning.component.scss']
})
export class ProvisioningComponent implements OnInit, AfterViewInit {


  images_provisioning = [
    { src: 'assets/provisioning/screenshots/Dashboard.png', caption: 'Dashboard' },
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
    { src: 'assets/provisioning/screenshots/Monitoring2.png', caption: 'Downstream Monitoring' },
    { src: 'assets/provisioning/screenshots/Monitoring3.png', caption: 'Downstream Monitoring' },

    { src: 'assets/provisioning/screenshots/Monitoring1.png', caption: 'Upstream Monitoring' },
    { src: 'assets/provisioning/screenshots/Monitoring5.png', caption: 'Error Monitoring' },
    { src: 'assets/provisioning/screenshots/Monitoring6.png', caption: 'Upstream Monitoring' },
    { src: 'assets/provisioning/screenshots/Monitoring7.png', caption: 'Status Monitoring' }

  ];

  showProvisioningVideoTabs = false;
  showManagementVideoTabs = false;
  homeImgLoaded = false;

  @ViewChild('provVideoContent')
  provVideoContent: ElementRef;

  @ViewChild('managVideoContent')
  managVideoContent: ElementRef;

  constructor(
    meta: Meta, title: Title,
    private navbarService: NavbarService
    ) {
    title.setTitle('EasySolutions - ACS TR-069 Provisionierung');
    this.navbarService.activePage = 'provisioning';
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.navbarService.scrollToTop();
  }

  onLoadHomeEnded() {
    setTimeout(() => {
      this.homeImgLoaded = true;
    }, 500);
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

}
