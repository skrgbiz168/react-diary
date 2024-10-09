import React from 'react';
import './App.css';
import './service/firebase';
import { AuthProvider } from './providers/AuthProvider';
import Header from './components/Header';
import Dashboard from "./components/Dashbord"

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <Dashboard />
      </div>
    </AuthProvider>
  );
}

export default App;
