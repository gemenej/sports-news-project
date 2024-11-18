import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrl: './sources.component.scss'
})
export class SourcesComponent implements OnInit, OnDestroy, AfterViewInit {
  type: string = 'source';
  typeValue: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {
    this.type = 'source';
    this.typeValue = this.route.snapshot.paramMap.get('source') || '';
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    //this.route.paramMap.subscribe().unsubscribe();
  }

  ngAfterViewInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.type = 'source';
      this.typeValue = params.get('source') || '';
    });
  }

}
