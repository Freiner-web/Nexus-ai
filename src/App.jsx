import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import UploadVideo from './UploadVideo';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for login/logout changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // Google login
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  // Sign out
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="bg-black text-white min-h-screen p-6 font-sans">
      <h1 className="text-3xl font-bold text-center mb-6">Nexus AI</h1>

      {session ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Welcome, Creator!</h2>
          <button
            onClick={signOut}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded mb-6"
          >
            Sign Out
          </button>
          <UploadVideo />
        </div>
      ) : (
        <div className="text-center">
          <button
            onClick={signInWithGoogle}
            className="bg-white text-black px-4 py-2 rounded"
          >
            Login with Google
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
