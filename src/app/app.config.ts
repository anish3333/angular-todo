import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment.development';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: environment.apiKey,
        authDomain: environment.authDomain,
        projectId: environment.projectId,
        storageBucket: environment.storageBucket,
        messagingSenderId: environment.messagingSenderId,
        appId: environment.appId,
        measurementId: environment.measurementId,
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
