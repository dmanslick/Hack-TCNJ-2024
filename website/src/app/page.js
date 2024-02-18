import React from 'react'
import './style.css'

export default function page() {
    return (
        <>
            <header class="header">
                <a href="#" class="logo">Midfade</a>

                <nav class="navbar">
                    <a href="/" class="active">Home</a>
                    <a href="/about">About</a>
                    <a href="/site">Feed</a>
                    <a href="/api/auth/login">Login</a>
                </nav>
            </header>

            <section class="home">
                <div class="home-content">
                    <h1>Midfade</h1>
                    <h3>Check Out Your Fade</h3>
                    <p>Obsessed with fades? Us too! We're Fade Fanatics, a diverse community of barbers, stylists, and fade enthusiasts dedicated to the art of the perfect fade. Tired of hit-or-miss haircuts? Enter the fade you've been rocking lately and let our expert judges rate your blend, crispness, and overall swagger.</p>
                    <div class="btn-box">
                        <a href="#">Get Lit</a>


                    </div>
                </div>

                <div class="home-sci">


                </div>

                <span class="home-imgHover">

                </span>
            </section>
        </>
    )
}
