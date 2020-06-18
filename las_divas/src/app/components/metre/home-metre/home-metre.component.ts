import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-metre',
  templateUrl: './home-metre.component.html',
  styleUrls: ['./home-metre.component.scss'],
})
export class HomeMetreComponent implements OnInit {

  redirect:string = 'home';

  constructor() { }

  ngOnInit() {}

}
