import { Component } from '@angular/core';
import { BasesComponent } from './components/bases/bases.component';
import { JazzerService } from './jazzer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isloading: Boolean = false;
  title = 'Jazzer-UI';

  constructor(private jazzerService: JazzerService) {
    this.jazzerService.loader
      .subscribe(arg => this.isloading = arg);
    
  }
}
