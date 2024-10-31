export class CreateRequestResponseLogDto {
  readonly method: string;
  readonly url: string;
  readonly requestBody: any;
  readonly responseBody: any;
  readonly statusCode: number;
}
