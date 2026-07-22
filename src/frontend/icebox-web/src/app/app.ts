import { Component } from '@angular/core';
import { MainScreenComponent } from './features/fridges/components/main-screen/main-screen.component';

@Component({
  selector: 'app-root',
  imports: [MainScreenComponent],
  template: `<app-main-screen />`
})
export class App {}