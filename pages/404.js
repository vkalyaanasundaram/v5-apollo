import React from 'react';
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Header from "../components/Header"
export default function Page() {
  

  return (
    <>
      <Header
        // title={generalSettings?.title}
        // description={generalSettings?.description}
      />
      <main className="content content-page">
        <Hero title={`Oops! That page can’t be found.`} 
        />
        <div className="wrap">
          <div>
            <div>
              <p>
                The page you were looking for does not exist or is no longer
                available.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer  />
    </>
  );
}
