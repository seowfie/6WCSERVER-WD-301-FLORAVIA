<template>
  <main>
    <!-- Hero Section -->
    <section class="hero" id="home">
      <div class="hero-left">
        <h1>Bringing Nature’s Elegance to Your Doorstep.</h1>
        <button>Shop Now</button>
      </div>
      <div class="hero-right"></div>
    </section>

    <!-- Story Section -->
    <section class="story">
      <div class="story-left"></div>
      <div class="story-right">
        <h2>Our Blooming Story</h2>
        <p>
          Welcome to Floravia, your go-to online flower shop for every occasion.
          We believe flowers have the power to brighten any moment, from heartfelt
          celebrations to simple everyday gestures. Our goal is to make it easy
          for anyone to browse, customize, and order blooms with just a few clicks.
        </p>
      </div>
    </section>

    <!-- Message Section -->
    <section class="message">
      <p>
        Whether you’re sending a surprise bouquet or decorating your space, Floravia helps
        you share love and color, one petal at a time.
      </p>
    </section>

    <!-- Service Section -->
    <section class="service" id="garden">
      <div class="service-left">
        <h2>Service</h2>
        <p>
          Welcome to Floravia, your go-to online flower shop for every occasion.
          We believe flowers have the power to brighten any moment, from heartfelt
          celebrations to simple everyday gestures. Our goal is to make it easy
          for anyone to browse, customize, and order blooms with just a few clicks.
        </p>
      </div>
      <div class="service-right"></div>
    </section>

    <!-- Gallery Section -->
    <section class="gallery" id="gallery">
      <h2>Gallery</h2>
      <div class="carousel">
        <button @click="prevImage">‹</button>
        <img :src="images[current]" alt="Bouquet" />
        <button @click="nextImage">›</button>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      images: [
        require('../assets/gallery1.jpg'),
        require('../assets/gallery2.jpg'),
        require('../assets/gallery3.jpg')
      ],
      current: 0
    }
  },
  methods: {
    nextImage() {
      this.current = (this.current + 1) % this.images.length
    },
    prevImage() {
      this.current = (this.current - 1 + this.images.length) % this.images.length
    }
  }
}
</script>

<style>
/* Hero */
.hero {
  display: flex;
  background: #fff;
}
.hero-left {
  flex: 1;
  background: url('../assets/hero1.jpg') center/cover no-repeat;
  color: white;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.hero-left h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}
.hero-left button {
  background-color: #e2d5ca;
  color: #4c3a3a;
  font-size: 1.2rem;
  border: none;
  padding: 0.8rem 2rem;
  cursor: pointer;
}
.hero-right {
  flex: 1;
  background: url('../assets/hero2.jpg') center/cover no-repeat;
}

/* Story */
.story {
  display: flex;
  background-color: #d3bed6;
}
.story-left {
  flex: 1;
  background: url('../assets/story.jpg') center/cover no-repeat;
}
.story-right {
  flex: 1;
  padding: 4rem;
  color: white;
}
.story-right h2 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
}

/* Message */
.message {
  background-color: #f6cbb2;
  padding: 2rem;
  text-align: center;
  font-size: 1.2rem;
  font-style: italic;
  color: #4c3a3a;
}

/* Service */
.service {
  display: flex;
  background-color: #a9ac8c;
  color: white;
}
.service-left {
  flex: 1;
  padding: 4rem;
}
.service-right {
  flex: 1;
  background: url('../assets/service.jpg') center/cover no-repeat;
}

/* Gallery */
.gallery {
  text-align: center;
  background-color: #a7b4b8;
  padding: 3rem 0;
}
.gallery h2 {
  font-size: 2rem;
  color: white;
  margin-bottom: 2rem;
}
.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
}
.carousel img {
  width: 400px;
  height: auto;
  border-radius: 12px;
}
.carousel button {
  background: none;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  padding: 1rem;
}
</style>
