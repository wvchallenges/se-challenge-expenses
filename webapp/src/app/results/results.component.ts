import { Component, OnInit } from '@angular/core';
import { Services } from '../services';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  providers: [Services]

})

export class ResultsComponent implements OnInit {

  displayedColumns = ['date',
                      'category',
                      'employee_name',
                      'employee_address',
                      'expense_description',
                      'pre_tax_amount',
                      'tax_name',
                      'tax_amount'];
  tableData: any;
  constructor(
    private services: Services
  ) { }

  ngOnInit() {
    this.services.getUploadedData().subscribe(
      (success) => this.tableData = success,
      (error) => console.log(error));
  }
}
