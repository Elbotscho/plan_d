import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VersichertenDatenComponent } from './pages/versichertendaten/versichertendaten.component';
import { FleetDetailComponent } from './pages/fleet-detail/fleet-detail.component';
import { PersonComponent } from './pages/person/person.component';
import { ShipsComponent } from './pages/ships/ships.component';
import { ShipsDetailComponent } from './pages/ships-detail/ships-detail.component';
import { PersonDetailComponent } from './pages/person-detail/person-detail.component';
import { NewFleetComponent } from './pages/new-fleet/new-fleet.component';
import { NewShipComponent } from './pages/new-ship/new-ship.component';
import { NewPersonComponent } from './pages/new-person/new-person.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'galactic-epmire',
        pathMatch:'full'
    },
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'login',
                component:LoginComponent
            },
            {
                path:'users',
                component:UsersComponent
            },
            {
                path:'galactic-epmire',
                component:DashboardComponent
            },
            {
                path:'fleets',
                component:VersichertenDatenComponent
            },
            {
                path:'fleet-detail/:id',
                component:FleetDetailComponent
            },
            {
                path:'person',
                component:PersonComponent
            },
            {
                path:'person-detail/:id',
                component:PersonDetailComponent
            },
            {
                path:'ships',
                component:ShipsComponent
            },
            {
                path:'ships-detail/:id',
                component:ShipsDetailComponent
            },
            {
                path:'new-fleet',
                component:NewFleetComponent
            },
            {
                path:'new-ship',
                component:NewShipComponent
            },
            {
                path:'new-person',
                component:NewPersonComponent
            }

        ]
    }
];
