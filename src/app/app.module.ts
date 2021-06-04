import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ShapesService } from './services/shapes.service';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { PlayerAreaComponent } from './components/player-area/player-area.component';
import { InformationComponent } from './components/information/information.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HeaderComponent,
    ButtonsComponent,
    PlayerAreaComponent,
    InformationComponent,
    NavigationComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [ShapesService],
  bootstrap: [AppComponent],
})
export class AppModule { }
