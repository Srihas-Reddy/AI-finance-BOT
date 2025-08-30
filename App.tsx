
import React, { useState, useEffect } from 'react';
import { User } from './types';
import AuthPage from './pages/AuthPage';
import MainApp from './MainApp';

// For simulation purposes, we use localStorage as a mock database.
// In a real application, this would be a secure backend API.
const getMockUsers = (): User[] => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

const saveMockUsers = (users: User[]) => {
  localStorage.setItem('users', JSON.stringify(users));
};

// Mock "session" management
const getSessionUser = (): User | null => {
  const user = sessionStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

const setSessionUser = (user: User | null) => {
  if (user) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    sessionStorage.removeItem('currentUser');
  }
};


const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(getSessionUser());
  
  // This effect simulates checking for a valid session when the app loads.
  useEffect(() => {
    const user = getSessionUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogin = (email: string, pass: string): { success: boolean, error?: string } => {
    const users = getMockUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    // In a real app, we'd compare hashed passwords.
    if (user && user.password === pass) {
      setCurrentUser(user);
      setSessionUser(user);
      return { success: true };
    }
    return { success: false, error: "Invalid email or password." };
  };

  const handleSignup = (fullName: string, email: string, pass: string): { success: boolean, error?: string } => {
    const users = getMockUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "An account with this email already exists." };
    }

    const newUser: User = {
      id: new Date().toISOString(),
      fullName,
      email,
      password: pass, // In a real app, this would be a salted hash.
    };
    
    const updatedUsers = [...users, newUser];
    saveMockUsers(updatedUsers);
    
    setCurrentUser(newUser);
    setSessionUser(newUser);
    return { success: true };
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSessionUser(null);
  };

  if (!currentUser) {
    return <AuthPage onLogin={handleLogin} onSignup={handleSignup} />;
  }

  return <MainApp currentUser={currentUser} onLogout={handleLogout} />;
};

export default App;
