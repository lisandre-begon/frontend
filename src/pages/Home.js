import React from 'react';
import gsap from 'gsap';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.scss'; 


const Home = () => {
    React.useEffect(() => {
      let sections = document.querySelectorAll(".section"),
        images = document.querySelectorAll(".background"),
        headings = document.querySelectorAll(".section-title"),
        outerWrappers = document.querySelectorAll(".wrapper-outer"),
        innerWrappers = document.querySelectorAll(".wrapper-inner"),
        currentIndex = -1,
        wrap = (index, max) => (index + max) % max,
        animating;
  
      gsap.set(outerWrappers, { yPercent: 100 });
      gsap.set(innerWrappers, { yPercent: -100 });
  
      function gotoSection(index, direction) {
        index = wrap(index, sections.length);
        animating = true;
  
        let fromTop = direction === -1;
        let dFactor = fromTop ? -1 : 1;
        let tl = gsap.timeline({ defaults: { duration: 1.25, ease: "power1.inOut" }, onComplete: () => (animating = false) });
  
        if (currentIndex >= 0) {
          gsap.set(sections[currentIndex], { zIndex: 0 });
          tl.to(images[currentIndex], { yPercent: -15 * dFactor })
            .set(sections[currentIndex], { autoAlpha: 0 });
        }
  
        gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
        tl.fromTo([outerWrappers[index], innerWrappers[index]], { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) }, { yPercent: 0 }, 0)
          .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
          .fromTo(headings[index], { autoAlpha: 0, yPercent: 150 * dFactor }, {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: "power2",
            stagger: { each: 0.02, from: "random" },
          }, 0.2);
  
        currentIndex = index;
      }
  
      function navigateSectionById(id) {
        let index = Array.from(sections).findIndex(section => section.id === id);
  
        if (index !== -1 && index !== currentIndex) {
          gotoSection(index, index > currentIndex ? 1 : -1);
        }
      }
  
      let lastTap = 0;
      document.addEventListener("touchend", function (event) {
        let currentTime = new Date().getTime();
        let tapLength = currentTime - lastTap;
        if (tapLength < 500 && tapLength > 0) {
          gotoSection(currentIndex + 1, 1);
          event.preventDefault();
        }
        lastTap = currentTime;
      });
  
      window.addEventListener("wheel", (event) => {
        if (event.deltaY < 0 && !animating) {
          gotoSection(currentIndex - 1, -1);
        } else if (event.deltaY > 0 && !animating) {
          gotoSection(currentIndex + 1, 1);
        }
      });
  
      document.querySelectorAll("nav a").forEach(a => {
        a.addEventListener("click", e => {
          e.preventDefault();
          navigateSectionById(e.currentTarget.getAttribute("href").slice(1));
        });
      });
  
      gotoSection(0, 1);
    }, []);
  
    return (
      <div className='home-page'>
        <div className="app-container">
          <header className="header">
            <nav>
              <a href="#first">Recipe </a>
              <a href="#second">Profil </a>
              <a href="#third">Mistery </a>
              <a href="#fourth">Login/Logout</a>
            </nav>
          </header>
          <Section id="first" title="Recipe" className="first" bgUrl={"https://cdn.apartmenttherapy.info/image/fetch/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/https%3A%2F%2Fs3.amazonaws.com%2Fpixtruder%2Foriginal_images%2Ff5cffedb779ce8ea3991f8020b5616d39ef6c0ee"} />
          <Section id="second" title="Profil" className="second" bgUrl="https://images.ctfassets.net/pdf29us7flmy/R2CvQwSAB5dXyOzRIPQFI/3c0fa14cc647c5f48647330c88022230/GettyImages-143922758_optimized.jpg" />
          <Section id="third" className="third" bgUrl="https://i.ytimg.com/vi/WxF5tJE-ub0/maxresdefault.jpg" />
          <Section id="fourth" title="Login/Logout" className="fourth" bgUrl="https://w.wallhaven.cc/full/eo/wallhaven-eo658o.png" />
        </div>
      </div>
    );
  };
const Section = ({ id, title, className, bgUrl}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (id === 'first') {
      navigate('/recipes');
    }else if (id === 'second') {
      navigate('/profil');
    }else if (id === 'third') {
      navigate('/mistery');
    }else if (id === 'fourth') {
      navigate('/login');
    }
  }
  return (
    <div className="home-page" id={id} onClick={handleClick}>
      <section id={id} className={`section ${className}`}>
        <div className="wrapper-outer">
          <div className="wrapper-inner">
            <div className="background" style={{ backgroundImage: `url(${bgUrl})` }}>
              <h2 className="section-title">{title}</h2>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}; const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Home />);
export default Home;

