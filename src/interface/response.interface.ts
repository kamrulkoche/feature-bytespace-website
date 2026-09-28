export interface WithPagination<T> {
  rows: T[];
  count: number;
  page: number;
  perPage: number;
  pages: number;
}

interface SuccessResponseIn<T> {
  status: number;
  success: true;
  message?: string;
  data: T;
}

export interface ErrorResponseInterface {
  status: number;
  success: false;
  message: string;
}

export type ResponseInterface<T> =
  | SuccessResponseIn<T>
  | ErrorResponseInterface;

export default ResponseInterface;
