import { useEffect, useState } from 'react';
import { supabase } from './supabase';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => authListener?.subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Nexus 🚀</h1>
      {!user ? (
        <button onClick={handleLogin} className="bg-white text-black px-4 py-2 rounded">
          Sign in with Google
        </button>
      ) : (
        <>
          <p className="text-lg">Welcome, {user.email}</p>
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default App;
