import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  imports: [CommonModule, RouterModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css'
})
export class IntroComponent  {

  //INJECTS
  constructor(
    private _router: Router
  ){}

  ngOnInit() {
    this.redireccionInit()
  }

  redireccionInit() {
    setTimeout(() => {
      this._router.navigateByUrl('/login')
    }, 1700);
  }

}
