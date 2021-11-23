import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./components/layout/layout.component";
import { AguaComponent } from "./pages/agua/agua.component";
import { AreaComunComponent } from "./pages/area-comun/area-comun.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { MantenimientoComponent } from "./pages/mantenimiento/mantenimiento.component";
import { PersonalComponent } from "./pages/personal/personal.component";
import { PropietarioComponent } from "./pages/propietario/propietario.component";
import { ProveedorComponent } from "./pages/proveedor/proveedor.component";
import { ServicioComponent } from "./pages/servicio/servicio.component";
import { UnidadInmobiliariaComponent } from "./pages/unidad-inmobiliaria/unidad-inmobiliaria.component";

const routes: Routes = [
    {
        path: '',
        component : LayoutComponent,
        children: [
            {
                path: '',
                redirectTo : 'home',
                pathMatch : 'full'
            },
            {
                path : 'home',
                component : DashboardComponent
            },
            {
                path : 'unidad-inmobiliaria',
                component : UnidadInmobiliariaComponent
            },
            {
                path : 'areas-comunes',
                component : AreaComunComponent
            },
            {
                path : 'propietarios',
                component : PropietarioComponent
            },
            {
                path : 'servicios',
                component : ServicioComponent
            },
            {
                path : 'personales',
                component : PersonalComponent
            },
            {
                path : 'mantenimiento',
                component : MantenimientoComponent
            },
            {
                path : 'agua',
                component : AguaComponent
            },
            {
                path : 'proveedor',
                component : ProveedorComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class CmsRoutingModule { }
