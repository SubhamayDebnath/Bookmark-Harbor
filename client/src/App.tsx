import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoadingScreen from '@/components/common/LoadingScreen';
import AppRoutes from '@/routes/AppRoutes';

function App() {
  const { getCurrentUser } = useAuth();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      await getCurrentUser();
      setInitialized(true);
    };
    init();
  }, [getCurrentUser]);

  if (!initialized) {
    return <LoadingScreen />;
  }
  return <AppRoutes />;
}

export default App;
