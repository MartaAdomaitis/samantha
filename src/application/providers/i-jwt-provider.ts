export interface IJwtProvider {
  create(value: string): Promise<string>;
  verify(value: string): Promise<void>;
}
