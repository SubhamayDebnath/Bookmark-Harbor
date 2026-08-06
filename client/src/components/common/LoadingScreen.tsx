import { LoaderCircle } from 'lucide-react';

function LoadingScreen() {
  return (
    <section className="bg-background/50 fixed inset-0 z-9999 flex flex-col items-center justify-center backdrop-blur">
      <LoaderCircle className="text-primary size-10 animate-spin" />
    </section>
  );
}

export default LoadingScreen;
