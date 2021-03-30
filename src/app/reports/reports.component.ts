import { Component, OnInit } from '@angular/core';
import { Service } from './../shared/service';
import { Report } from '../../app/interfaces/report.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  displayedColumns: string[] = ['estudiante', 'grado', 'desc_pension', 'monto', 'fecha_vencimiento', 'fecha_pago', 'payment_year'];
  dataSource: Report[] = [];

  constructor(private service: Service) { }

  ngOnInit(): void {
    this.getReport();
  }

  private async getReport() {
    const res = await this.service.get('/api/payments')
    this.dataSource = res;    
  }

}
