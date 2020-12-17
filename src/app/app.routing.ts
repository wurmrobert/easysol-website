import { HomeComponent } from './home/home.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'impressum', loadChildren: './impressum/impressum.module#ImpressumModule' },
    
    // { path: 'services/isp-services', loadChildren: './provisioning/provisioning.module#ProvisioningModule' },
    // { path: 'services/software-entwicklung', loadChildren: './sofware-development/software-development.module#SoftwareDevelopmentModule' },
    // { path: 'services/consulting', loadChildren: './consulting/consulting.module#ConsultingModule' },
    { path: 'services/isp-services', redirectTo: '' },
    { path: 'services/software-entwicklung', redirectTo: '' },
    { path: 'services/consulting', redirectTo: '' },

    { path: 'nutzungsbedingungen', loadChildren: './terms-of-use/terms-of-use.module#TermsOfUseModule' },
    { path: 'unternehmen/jobs', loadChildren: './jobs/jobs.module#JobsModule' },

];

export const routing = RouterModule.forRoot(appRoutes);
