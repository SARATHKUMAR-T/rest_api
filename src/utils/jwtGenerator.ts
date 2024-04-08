import jwt from "jsonwebtoken";

export function tokenGenerator(val: any, secretKey: string): string {
  return jwt.sign({ val }, secretKey);
}

export function tokenDecoder(token: string, secretKey: string) {
  return jwt.verify(token, secretKey);
}
