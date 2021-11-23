import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AreaComunComponent } from './pages/area-comun/area-comun.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CmsRoutingModule } from './cms-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { PersonalComponent } from './pages/personal/personal.component';
import { PropietarioComponent } from './pages/propietario/propietario.component';
import { ServicioComponent } from './pages/servicio/servicio.component';
import { UnidadInmobiliariaComponent } from './pages/unidad-inmobiliaria/unidad-inmobiliaria.component';
import { MantenimientoComponent } from './pages/mantenimiento/mantenimiento.component';
import { CargaDocComponent } from './components/carga-doc/carga-doc.component';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';
import { AguaComponent } from './pages/agua/agua.component';
import { AsignarPropietarioUiComponent } from './pages/asignar-propietario-ui/asignar-propietario-ui.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SharedModule } from '../shared/shared.module';
import { ProyectoComponent } from './pages/proyecto/proyecto.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    LayoutComponent,
    NavComponent,
    DashboardComponent,
    AreaComunComponent,
    HeaderComponent,
    PersonalComponent,
    PropietarioComponent,
    ServicioComponent,
    UnidadInmobiliariaComponent,
    MantenimientoComponent,
    CargaDocComponent,
    ProveedorComponent,
    AguaComponent,
    AsignarPropietarioUiComponent,
    LoadingComponent,
    ProyectoComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    CmsRoutingModule,
    SharedModule
  ]
})
export class CmsModule { }
