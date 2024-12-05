import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Stats from './Stats';
import PopularCourses from './PopularCourses';
import CourseCategories from './CourseCategories';
import Testimonials from './Testimonials';
import Newsletter from './Newsletter';
import Footer from './Footer';


function LandingPage() {
    return (
        <div className="min-h-screen bg-blue-100">
            <Header />
            <main>
                <Hero />
                <Stats id="courses" />
                <CourseCategories />
                <PopularCourses id="popularCourses" />
                <Testimonials />
                <Newsletter />
            </main>
            <Footer id="footer" />
        </div>
    );
}

export default LandingPage;
