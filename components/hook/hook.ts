
// Function to get token from localStorage
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const getUserId = (token: string | null): string | null => {
  try {
    if (!token) return null;
    // Decodificar el token JWT
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    const payload = JSON.parse(decodedPayload);
    // Extraer el ID
    const userId = payload.id;
    return userId;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const useRouteData = (): string | null => {
  const token = getToken();
  return token;
};

