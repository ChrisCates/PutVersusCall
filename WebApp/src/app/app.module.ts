// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Base Component
import { AppComponent } from './component/_root/app.component';

// Shared Services
import { ValidationService } from './service/validation.service';
import { SessionService } from './service/session.service';

// Shared components
import { HeaderComponent } from './component/_common/header/header.component';
import { FooterComponent } from './component/_common/footer/footer.component';
import { SearchBarComponent } from './component/_common/search-bar/search-bar.component';

// Index Components
import { IndexService } from './component/index/index.service';
import { IndexRouteComponent } from './component/index/index-route/index-route.component';
import { IndexFormComponent } from './component/index/index-form/index-form.component';
import { IndexSearchComponent } from './component/index/index-search/index-search.component';

// Search Components
import { SearchService } from './component/search/search.service';
import { SearchRouteComponent } from './component/search/search-route/search-route.component';

// Profile Components
import { ProfileService } from './component/profile/profile.service';
import { ProfileRouteComponent } from './component/profile/profile-route/profile-route.component';

// Ticker Components
import { TickerService } from './component/ticker/ticker.service';
import { TickerRouteComponent } from './component/ticker/ticker-route/ticker-route.component';
import { TickerOptionsComponent } from './component/ticker/ticker-options/ticker-options.component';
import { TickerHeaderComponent } from './component/ticker/ticker-header/ticker-header.component';
import { TickerStrikesComponent } from './component/ticker/ticker-strikes/ticker-strikes.component';
import { TickerChatComponent } from './component/ticker/ticker-chat/ticker-chat.component';
import { TickerSpreadComponent } from './component/ticker/ticker-spread/ticker-spread.component';
import { TickerSpreadPublishComponent } from './component/ticker/ticker-spread-publish/ticker-spread-publish.component';
import { TickerSpreadCreatedComponent } from './component/ticker/ticker-spread-created/ticker-spread-created.component';
import { TickerSpreadRecentComponent } from './component/ticker/ticker-spread-recent/ticker-spread-recent.component';

// Spread Components
import { SpreadService } from './component/spread/spread.service';
import { SpreadRouteComponent } from './component/spread/spread-route/spread-route.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexRouteComponent,
    HeaderComponent,
    FooterComponent,
    SearchBarComponent,
    IndexFormComponent,
    IndexSearchComponent,
    SearchRouteComponent,
    ProfileRouteComponent,
    TickerRouteComponent,
    TickerOptionsComponent,
    TickerHeaderComponent,
    TickerStrikesComponent,
    TickerChatComponent,
    TickerSpreadComponent,
    TickerSpreadPublishComponent,
    TickerSpreadCreatedComponent,
    TickerSpreadRecentComponent,
    SpreadRouteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { component: IndexRouteComponent, path: '' },
      { component: SearchRouteComponent, path: 'search' },
      { component: ProfileRouteComponent, path: 'profile' },
      { component: TickerRouteComponent, path: 'ticker/:symbol' },
      { component: SpreadRouteComponent, path: 'spread/:symbol/:spread_id' },
    ])
  ],
  providers: [
    IndexService,
    SearchService,
    ProfileService,
    TickerService,
    SpreadService,
    ValidationService,
    SessionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
