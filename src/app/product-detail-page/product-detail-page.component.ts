import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss']
})
export class ProductDetailPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  directToPlpPage() {
    this.router.navigate(['/plp'], );
  }

}
