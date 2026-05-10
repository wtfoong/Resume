import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Portfolio from '../components/Portfolio';
import Footer from '../components/Footer';

const ResumePage = () => {
  return (
    <>
      <Nav />
      <Hero />
      <main style={{ maxWidth: '860px', margin: '0 auto', padding: '0 3rem' }}>
        <Experience />
        <Education />
        <Skills />
      </main>
      <Portfolio />
      <Footer />
    </>
  );
};

export default ResumePage;
