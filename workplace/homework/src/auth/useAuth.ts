import { useState} from 'react';
import type { User } from '../models/user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const stored = sessionStorage.getItem('authUser');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (user: User) => {
    sessionStorage.setItem('authUser', JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    sessionStorage.removeItem('authUser');
    setUser(null);
  };

  return { user, login, logout };
}
