import { Component, inject, OnInit } from '@angular/core';
import { SummaryCardComponent } from '../../components/summary-card/summary-card.component';
import { DashboardService } from '../../service/dashboard.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SummaryCardComponent, CurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  //propiedades

  totalTithes = 0;
  totalOfferings = 0;
  countMembers = 0;
  countMinistries = 0;

  private dashboardService = inject(DashboardService);

  ngOnInit(): void {
    this.getTitheSummary();
    this.getOfferingsSummary();
    this.getMembersCount();
    this.getMinistriesCount();
  }

  getTitheSummary() {
    this.dashboardService.getTitheSummary().subscribe({
      next: (summary) => {
        this.totalTithes = summary.totalTithes;
        console.log('Resumen de diezmos:', summary);
      },
      error: (error) => {
        console.error('Error al cargar diezmos:', error);
      },
    });
  }


  getOfferingsSummary() {
    this.dashboardService.getOfferingsSummary().subscribe({
      next: (summary) => {
        console.log('Resumen de ofrendas:', summary);
        this.totalOfferings = summary.totalAmount;
      },
      error: (error) => {
        console.log('Error al cargar la ofrenda:',error)
      }
    })

  }

  getMembersCount(): void{
    this.dashboardService.getMemberSumary().subscribe({
      next: (count) => {

        console.log('cantidad de miembros', count)
        this.countMembers = count.totalElements;

      },
      error: (error) => {
        console.log('No se pudieron cargar los Integrantes : ',error)
      }
    })
  }


  getMinistriesCount(): void{
    this.dashboardService.getMinisteriesSumary().subscribe({
      next: (count) => {
        this.countMinistries = count.length;
        console.log('Total de ministerios: ',count)
      },
      error: (error) => {
        console.log('No se pudieron cargar los ministerios')
      }
    })
  }
}
