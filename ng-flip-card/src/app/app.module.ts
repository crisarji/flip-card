import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from '@app/app.component';
import { envModules } from '@enviroments/environment';
import { AuthModule } from '@app/features/authentication';
import { AppRoutingModule } from '@app/app-routing.module';
import { LayoutModule } from '@app/features/core/layout/layout.module';
import { initialReducerMap, getInitialState, metaReducers } from '@app/features/global-state/app.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    LayoutModule,
    StoreModule.forRoot(initialReducerMap, {
      initialState: getInitialState,
      metaReducers,
      runtimeChecks: {
        // <-- Not healthy, but by the time being, there is an issue with ivy in ng9: https://github.com/ngrx/platform/issues/2404
        strictStateImmutability: false,
        strictActionImmutability: false,
        strictStateSerializability: false,
        strictActionSerializability: false,
        strictActionWithinNgZone: false,
        strictActionTypeUniqueness: false,
      },
    }),
    EffectsModule.forRoot([]),
    envModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
