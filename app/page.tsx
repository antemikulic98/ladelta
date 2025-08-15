import Header from './components/Header';
import Hero from './components/Hero';
import CakeStudio from './components/CakeStudio';

export default function Home() {
  return (
    <div className='font-sans'>
      <Header />
      <main>
        <Hero />
        <CakeStudio />
      </main>
    </div>
  );
}
