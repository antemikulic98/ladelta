import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-jwt-key'
);

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  exp: number;
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export async function createToken(
  payload: Omit<TokenPayload, 'exp'>
): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .setIssuedAt()
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    // Validate that payload has the required properties
    if (
      payload &&
      typeof payload === 'object' &&
      'userId' in payload &&
      'email' in payload &&
      'role' in payload
    ) {
      return payload as TokenPayload;
    }
    
    console.error('Invalid token payload structure');
    return null;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export async function getTokenFromRequest(
  request: NextRequest
): Promise<string | null> {
  // Try to get token from Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Try to get token from cookies
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get('auth-token');

  return tokenCookie?.value || null;
}

export async function getCurrentUser(
  request: NextRequest
): Promise<TokenPayload | null> {
  const token = await getTokenFromRequest(request);
  if (!token) return null;

  return await verifyToken(token);
}
