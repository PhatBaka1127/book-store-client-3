export class User {
  constructor(
    public id: number,
    public email: string,
    public role: number,
    public status: number | null,
    public accessToken: string,
    public refreshToken: string,
    public expireAt: Date
  ) {}

  isActive(): boolean {
    return this.status === 1;
  }

  isTokenValid(): boolean {
    return new Date() < this.expireAt;
  }
}