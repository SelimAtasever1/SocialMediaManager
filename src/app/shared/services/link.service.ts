import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LinkModel } from '../models/link-model';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private editLinkSubject = new BehaviorSubject<LinkModel | null>(null);
  editLink$ = this.editLinkSubject.asObservable();

  private apiUrl = 'http://localhost:3000/links';
  private dataSourceSubject = new BehaviorSubject<LinkModel[]>([]);
  dataSource$ = this.dataSourceSubject.asObservable();

  constructor(private http: HttpClient) { 
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.GetUsersProfiles().subscribe(profiles => {
      this.dataSourceSubject.next(profiles);
    });
  }

  GetUsersProfiles(): Observable<LinkModel[]> {
    return this.http.get<LinkModel[]>(this.apiUrl).pipe(
      tap(profiles => this.dataSourceSubject.next(profiles))  
    );
  }

  triggerEditLink(link: LinkModel) {
    this.editLinkSubject.next(link);
  }

  UpdateRecord(id: string, updatedLink: LinkModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedLink).pipe(
      tap(() => this.loadInitialData()) 
    );
  }

  DeleteRecord(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadInitialData())  
    );
  }

  CreateNewRecord(link: LinkModel): Observable<LinkModel> {
    return this.http.post<LinkModel>(this.apiUrl, link).pipe(
      tap(() => this.loadInitialData()) 
    );
  }
}
