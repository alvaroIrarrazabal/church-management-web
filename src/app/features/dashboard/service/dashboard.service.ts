import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TitheSummary } from '../models/tithe-summary';
import { environment } from '../../../../environments/environments';
import { OfferingSummary } from '../models/offering-summary';
import { MemberResponse } from '../../members/models/member-response';
import { PageResponse } from '../../../core/models/page-response';
import { MinistryResponse } from '../../ministries/models/ministry-response';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);

  getTitheSummary(): Observable<TitheSummary> {
    return this.http.get<TitheSummary>(
      `${environment.apiUrl}/api/tithes/summary`,
    );
  }

  getOfferingsSummary(): Observable<OfferingSummary> {
    return this.http.get<OfferingSummary>(
      `${environment.apiUrl}/api/offerings/summary`,
    );
  }

  getMemberSumary(): Observable<PageResponse<MemberResponse>> {
    return this.http.get<PageResponse<MemberResponse>>(
      `${environment.apiUrl}/api/members?page=0&size=1`,
    );
  }

  getMinisteriesSumary(): Observable<MinistryResponse[]> {
    return this.http.get<MinistryResponse[]>(
      `${environment.apiUrl}/api/ministries`,
    );
  }
}
