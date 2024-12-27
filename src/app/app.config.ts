import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: "AIzaSyCn6ddOCIFIOsUKxZio6ZrBHXNIy3BgsLM",
        authDomain: "test-angular-e9287.firebaseapp.com",
        projectId: "test-angular-e9287",
        storageBucket: "test-angular-e9287.firebasestorage.app",
        messagingSenderId: "60418525722",
        appId: "1:60418525722:web:fa72c05c514d980c23dfa3",
        measurementId: "G-K1Y5NWCFZV"
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
