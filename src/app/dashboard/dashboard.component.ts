import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totalPackages: any;
  totalItems: any;
  toggleProBanner(event: any) {
    event.preventDefault();
    // document.querySelector('body').classList.toggle('removeProbanner');
  }

  constructor(private router: Router, private commonService: CommonService) {}

  ngOnInit() {
    if (!sessionStorage.getItem('email')) {
      this.router.navigate(['/user-pages/login']);
    }
    this.commonService
      .postData('package/list', {
        page: 1,
        itemPerPage: 10,
      })
      .subscribe(
        (res: any) => {
          this.totalPackages = res.data.length;
        },
        (err) => {
          console.log(err);
        }
      );

    this.commonService
      .postData('items/list', {
        page: 1,
        itemPerPage: 10,
      })
      .subscribe(
        (res: any) => {
          this.totalItems = res.data.length;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  date: Date = new Date();

  visitSaleChartData = [
    {
      label: 'CHN',
      data: [20, 40, 15, 35, 25, 50, 30, 20],
      borderWidth: 1,
      fill: false,
    },
    {
      label: 'USA',
      data: [40, 30, 20, 10, 50, 15, 35, 40],
      borderWidth: 1,
      fill: false,
    },
    {
      label: 'UK',
      data: [70, 10, 30, 40, 25, 50, 15, 30],
      borderWidth: 1,
      fill: false,
    },
  ];

  visitSaleChartLabels = ['2013', '2014', '2014', '2015', '2016', '2017'];

  visitSaleChartOptions = {
    responsive: true,
    legend: false,
    scales: {
      yAxes: [
        {
          ticks: {
            display: false,
            min: 0,
            stepSize: 20,
            max: 80,
          },
          gridLines: {
            drawBorder: false,
            color: 'rgba(235,237,242,1)',
            zeroLineColor: 'rgba(235,237,242,1)',
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false,
            color: 'rgba(0,0,0,1)',
            zeroLineColor: 'rgba(235,237,242,1)',
          },
          ticks: {
            padding: 20,
            fontColor: '#9c9fa6',
            autoSkip: true,
          },
          categoryPercentage: 0.4,
          barPercentage: 0.4,
        },
      ],
    },
  };

  visitSaleChartColors = [
    {
      backgroundColor: [
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
      ],
      borderColor: [
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
      ],
    },
    {
      backgroundColor: [
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
      ],
      borderColor: [
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
      ],
    },
    {
      backgroundColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
      ],
      borderColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
      ],
    },
  ];

  trafficChartData = [
    {
      data: [30, 30, 40],
    },
  ];

  trafficChartLabels = ['Search Engines', 'Direct Click', 'Bookmarks Click'];

  trafficChartOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    legend: false,
  };

  trafficChartColors = [
    {
      backgroundColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(132, 217, 210, 1)',
      ],
      borderColor: [
        'rgba(177, 148, 250, .2)',
        'rgba(254, 112, 150, .2)',
        'rgba(132, 217, 210, .2)',
      ],
    },
  ];
}
