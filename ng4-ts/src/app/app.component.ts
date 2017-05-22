import { Component }          from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  
  <nav class='navbar navbar-default'>
    <div class="container">
        <div class="navbar-header">
            <a class="navbar-brand" href="/">Angular 4.2.0 <small style="font-size: 10px">Front End Framework POC</small></a>
        </div>
    </div>
  </nav>
  <div class="container">
   <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="page-header">
                <h3>{{title}}</h3>
            </div>
        </div>
    </div>    
    <router-outlet></router-outlet>
   </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Welcome, Steve Rogers';
}
