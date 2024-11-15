export class CreateErrorLogDto {
  readonly message: Record<string, any>;
  readonly header: Record<string, any>;
  readonly stack?: string;
  readonly statusCode?: number;
  readonly method?: string;
  readonly url?: string;
  readonly request: Record<string, any>;
  readonly response: Record<string, any>;
}
