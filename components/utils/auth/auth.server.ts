import { NextApiResponse, NextApiRequest } from 'next';
import { setCookie } from 'nookies';
import axios, { AxiosError } from 'axios';

export type Role = 'ADMIN' | 'USER';

type Auth = {
  user: string;
  password: string;
};

export type Student = {
  id: number;
  user: string;
  password: string;
  name: string;
  role: Role;
  active: boolean;
  token: string;
};

export const secret = 'SECRET';
if (!secret) throw new Error('SESSION_SECRET is not set');

export async function loginUser({ user, password }: Auth, req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.post<Student>('http://localhost:8000/api/v1/student/login', {
      user,
      password,
    });
    const users = response.data;
    const newLogin = JSON.stringify(users);
    switch (users.role) {
      case 'ADMIN':
      case 'USER':
        await createUserSession(newLogin, '/home', res);
        break;
      default:
        throw new Error('Ingreso Incorrecto');
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError;
      if (axiosError.response?.status === 401) {
        throw new Error('Credenciales inválidas');
      } else {
        throw new Error('Error de conexión');
      }
    }
  }
}

async function createUserSession(userId: string, redirectTo: string, res: NextApiResponse) {
  setCookie({ res }, 'userId', userId, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
  res.redirect(redirectTo);
}

export async function requireUserId(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.cookies.userId;
  if (!userId || typeof userId !== 'string') {
    const redirectTo = new URL('/auth/login', `http://${req.headers.host}`).toString();
    throw new Error(`Redirigiendo a la página de inicio de sesión: ${redirectTo}`);
  }
  return userId;
}

export async function requireUserRole(req: NextApiRequest, roles: Role[], redirectTo: string = '/') {
  const user = await getUserToken(req);
  if (!user || !roles.includes(user.role)) {
    const redirectToUrl = new URL(redirectTo, `http://${req.headers.host}`).toString();
    throw new Error(`Redirigiendo a la página principal: ${redirectToUrl}`);
  }
  return user;
}

function getUserSession(req: NextApiRequest) {
  const cookie = req.headers.cookie;
  return cookie ? JSON.parse(cookie.split(';').find(c => c.trim().startsWith('userId='))?.split('=')[1] || '') : null;
}

async function getUserToken(req: NextApiRequest) {
  const userId = getUserSession(req);
  if (!userId) return null;
  const newUser: {
    id: number;
    token: string;
    role: Role;
    corporationId: string;
  } = JSON.parse(userId);
  return newUser;
}

export async function getUser(req: NextApiRequest) {
  try {
    const user = await getUserToken(req);
    if (!user) return null;
    return user.token;
  } catch {
    throw new Error('Error al obtener el usuario');
  }
}

export async function logout(req: NextApiRequest, res: NextApiResponse, redirectTo: string = '/auth/logout') {
  setCookie({ res }, 'userId', '', {
    maxAge: 0,
    path: '/',
  });
  const redirectToUrl = new URL(redirectTo, `http://${req.headers.host}`).toString();
  res.redirect(redirectToUrl);
}
