import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INote, INoteBody } from '../models/note.model';
import { environment } from '../../environments/environment';

type JsonResponse<T> = { status: 'success' | 'fail'; data: T };

@Injectable()
export class NoteService {
  constructor(private http: HttpClient) {}

  getNote(id: string) {
    return this.http.get<JsonResponse<{ note: INote }>>(
      `${environment.api}/${id}`
    );
  }

  createNote(body: INoteBody) {
    return this.http.post<JsonResponse<{ note: INote }>>(
      `${environment.api}`,
      body
    );
  }

  updateNote(body: INoteBody, id: string) {
    return this.http.patch<JsonResponse<{ note: INote }>>(
      `${environment.api}/${id}`,
      body
    );
  }
}
