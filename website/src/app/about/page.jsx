import React from 'react'
import '../About.css'

export default function page() {
    return (
        <section id="wrapper">
            <header class="header">
                <a href="#" class="logo">Midfade</a>

                <nav class="navbar">
                    <a href="/">Home</a>
                    <a href="/about" style={{ color: '#19b3f1' }}>About</a>
                    <a href="/site">Feed</a>
                    <a href="/api/auth/login">Login</a>
                </nav>
            </header>
            <div class="About">

            </div>
            <div class="Logos">
                <img src="Our Team.jpg" alt="MidTechLogo" />
            </div>
            <div class="aparagraph">
                <h1>Midfade Tech</h1>
                <p>

                    In the vibrant landscape of tech startups, Midfade Tech emerges as a beacon for both innovation and inclusion.
                    This groundbreaking company isn't chasing the next trendy gadget, but instead, tackling a social issue close to many hearts: childhood bullying.
                    Their focus? Perfecting the mid-fade haircut, traditionally a marker of individuality and style, often targeted by bullies for its slightest imperfection.

                    Midfade Tech employs cutting-edge AI technology to create a personalized "Midfade Master" app.
                    Using facial recognition and advanced algorithms, the app analyzes a person's unique facial features and hair type, suggesting the ideal mid-fade line for them.
                    But this isn't just about aesthetics; it's about empowerment.
                    By ensuring a confident, personalized fade, Midfade Tech aims to build resilience and decrease the chances of targeted bullying.

                    Their impact goes beyond individual users.
                    Imagine schools adopting the Midfade Master app, fostering a culture of acceptance where self-expression is celebrated, and differences are embraced.
                    Picture barbers equipped with the technology, transforming their shops into safe spaces for open communication and personalized care.

                </p>

            </div>

        </section>
    )
}
