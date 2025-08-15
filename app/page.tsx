import Header from './components/Header';
import Hero from './components/Hero';
import { CakeStudioWithFallback } from './components/LazyComponents';

export default function Home() {
  return (
    <div className='font-sans'>
      <Header />
      <main>
        <Hero />
        <CakeStudioWithFallback />
      </main>
    </div>
  );
}
