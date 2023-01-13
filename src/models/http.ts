export interface BadRequestFieldError {
  [key: string]: string[];
}

export interface HttpError {
  unauthorized: boolean;
  badRequest: boolean;
  notFound: boolean;
  clientError: boolean;
  serverError: boolean;
  message: string;
  title?: string;
  fieldErrors?: BadRequestFieldError;
}

export interface HttpResponse<T> {
  status: number;
  ok: boolean;
  body?: T;
  pagination?: Pagination;
  error?: HttpError;
}

export interface BaseRequestQueryParam {
  page?: number;
  size?: number;
  sort?: 'asc' | 'desc';
  [key: string]: any;
}

export interface Pagination {
  paging: any;
  total: number;
}
