export interface IJwtProvider {
  create(value: string): Promise<string>;
}
