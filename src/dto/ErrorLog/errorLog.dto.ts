export class CreateErrorLogDto {
  readonly message: Record<string, any>;
  readonly stack?: string;
  readonly statusCode?: number;
  readonly method?: string;
  readonly url?: string;
}
