import { Toaster } from 'sonner';
import { RequestProvider } from './context/RequestContext';
import AppRouter from './routes/AppRouter';

function App() { 

  return (
    <>
    <RequestProvider>

      <AppRouter />
      <Toaster position="top-center" richColors closeButton />
    </RequestProvider>

    </>
  )
}

export default App
