export class CreateErrorLogDto {
  readonly message: string;
  readonly stack?: string;
  readonly statusCode?: number;
  readonly method?: string;
  readonly url?: string;
}
