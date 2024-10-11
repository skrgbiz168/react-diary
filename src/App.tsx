import './App.css';
import './service/firebase';
import { AuthProvider } from './providers/AuthProvider';
import Footer from './components/Footer';
import Header from './components/Header';
import Dashboard from "./components/Dashbord"

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <Dashboard />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
