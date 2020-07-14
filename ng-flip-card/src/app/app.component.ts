import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title = 'Flip-Card game is running!';

  constructor(private router: Router) { }

  public ngOnInit(): void {
    this.router.navigate(['/instructions']);
  }
}
