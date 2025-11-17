import { createContext, useContext, useState, ReactNode } from 'react';
import type { User, UserRole } from '../types/auth';

// Tipos locales para evitar problemas de importación
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuarios simulados para cada rol
const mockUsers: Record<string, { password: string; user: User }> = {
  'alcalde@gamc.com': {
    password: 'alcalde123',
    user: {
      id: '1',
      email: 'alcalde@gamc.com',
      name: 'Alcalde GAMC',
      role: 'ALCALDE_GAMC'
    }
  },
  'director@dgeyci.com': {
    password: 'director123',
    user: {
      id: '2',
      email: 'director@dgeyci.com',
      name: 'Director DGEYCI',
      role: 'DIRECTOR_DGEYCI'
    }
  },
  'admin@sistema.com': {
    password: 'admin123',
    user: {
      id: '3',
      email: 'admin@sistema.com',
      name: 'Administrador Sistema',
      role: 'ADMIN_SISTEMA'
    }
  },
  'usuario@tecnico.com': {
    password: 'usuario123',
    user: {
      id: '4',
      email: 'usuario@tecnico.com',
      name: 'Usuario Técnico',
      role: 'USUARIO'
    }
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Recuperar usuario del localStorage si existe
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Error al leer usuario del localStorage:', error);
      return null;
    }
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simular delay de autenticación
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userData = mockUsers[email.toLowerCase()];
    
    if (userData && userData.password === password) {
      setUser(userData.user);
      localStorage.setItem('user', JSON.stringify(userData.user));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}

