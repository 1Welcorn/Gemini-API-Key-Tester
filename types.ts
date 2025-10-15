
export enum TestStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface ApiResult {
  status: TestStatus;
  message: string | null;
}
