import * as jwt from 'jsonwebtoken';

const SECRET_KEY = 'jwt_secrt';
const expiresIn = '100days';

// Create a token from a payload
export function createToken(payload: any) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn, algorithm: 'HS256' });
}

// Verify the token
export function verifyToken(token: string) {
  return jwt.verify(token, SECRET_KEY);
}
