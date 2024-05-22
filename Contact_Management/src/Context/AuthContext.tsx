import React, { createContext, useState, useContext, ReactNode } from 'react';
import { auth, db } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const clearError = () => setError(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/home');
      return true;
    } catch (err) {
      console.error('Error logging in:', err);
      setError('Invalid email or password!');
      return false;
    }
  };

  const signup = async (email: string, password: string): Promise<boolean> => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      if (user) {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');

        await addDoc(collection(db, 'users'), { email, password });

        router.push('/home');
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error('Error signing up:', err);
      setError('Failed to create an account. Please try again.');
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, signup, logout, error, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};
