<template>
  <div class="support-page">
    <!-- 🌸 Support Hero Section -->
    <section class="support-hero">
      <div class="support-overlay"></div>
      <div class="support-content">
        <!-- 🌿 Left Text -->
        <div class="support-text">
          <h1>You Have Questions, We Have Answers</h1>
          <p>
            Discover floral experiences thoughtfully crafted to brighten hearts and celebrate life’s
            meaningful moments. Every bouquet tells a story, and we can’t wait to help you share
            yours.
          </p>

          <div class="support-info">
            <div>
              <h4>Location</h4>
              <p>1092 General Aquino Street, Sta. Teresita Angeles City</p>
            </div>
            <div>
              <h4>Social Media</h4>
              <p>Instagram<br />Facebook<br />TikTok</p>
            </div>
            <div>
              <h4>Email</h4>
              <p>floravia.ph@gmail.com</p>
            </div>
            <div>
              <h4>Contact</h4>
              <p>0908-211-7575</p>
            </div>
          </div>
        </div>

        <!-- 🌸 Email Form -->
        <div class="email-box">
          <h2>Email Us</h2>
          <form @submit.prevent="handleSubmit">
            <div class="name-row">
              <div class="form-group">
                <label for="firstName">First Name:</label>
                <input
                  v-model="form.firstName"
                  type="text"
                  id="firstName"
                  placeholder="First name"
                />
              </div>
              <div class="form-group">
                <label for="lastName">Last Name:</label>
                <input v-model="form.lastName" type="text" id="lastName" placeholder="Last name" />
              </div>
            </div>

            <div class="form-group">
              <label for="email">Email:</label>
              <input v-model="form.email" type="email" id="email" placeholder="Enter your email" />
            </div>

            <div class="form-group">
              <label for="message">Message:</label>
              <textarea
                v-model="form.message"
                id="message"
                placeholder="Type your message here..."
              ></textarea>
            </div>

            <button type="submit" class="send-btn">SEND</button>
          </form>
        </div>
      </div>
    </section>

    <!-- 🗺️ Map Section -->
    <section class="map-section">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.8563682598445!2d120.59074127590806!3d15.139776964658477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85e0fefd4b8b8e9%3A0x914a7985af3850a!2s1092%20General%20Aquino%20Street%2C%20Sta.%20Teresita%2C%20Angeles%20City!5e0!3m2!1sen!2sph!4v1697299376217!5m2!1sen!2sph"
        width="100%"
        height="520"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </section>

    <!-- 🌿 Featured Oval Section -->
    <section class="featured-header">
      <div class="featured-oval">
        <h2>Frequently Asked Questions</h2>
      </div>
    </section>

    <!-- 💬 Collapsible FAQ Section -->
    <section class="faq-section">
      <div class="faq-item" v-for="(faq, index) in faqs" :key="index" @click="toggleFAQ(index)">
        <div class="faq-question">
          <span class="faq-number">{{ (index + 1).toString().padStart(2, '0') }}</span>
          <h3>{{ faq.question }}</h3>
          <span class="arrow">{{ activeFAQ === index ? '−' : '+' }}</span>
        </div>
        <transition name="fade">
          <p v-if="activeFAQ === index" class="faq-answer">{{ faq.answer }}</p>
        </transition>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

/* ✅ Email Form Logic */
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  message: '',
})

const handleSubmit = () => {
  if (!form.value.firstName || !form.value.lastName || !form.value.email || !form.value.message) {
    alert('Please fill out all fields before submitting.')
    return
  }

  const confirmSend = confirm('Are you sure you want to send this message?')
  if (confirmSend) {
    alert('Your message has been sent successfully!')
    form.value = { firstName: '', lastName: '', email: '', message: '' }
  }
}

/* ✅ FAQ Logic */
const activeFAQ = ref(null)
const toggleFAQ = (index) => {
  activeFAQ.value = activeFAQ.value === index ? null : index
}

const faqs = [
  {
    question: 'How do I place an order on Floravia?',
    answer:
      'To order, simply browse our Garden page, choose your preferred bouquet, and click “Buy” or “Add to Cart.” Once you’re ready, head to your Basket to review your selections and proceed to checkout.',
  },
  {
    question: 'Do you offer same-day delivery?',
    answer:
      'Yes, we can accommodate same-day deliveries depending on availability. Please contact us through our mobile number so we can discuss your request and arrange it personally.',
  },
  {
    question: 'Can I make special requests or customize my bouquet?',
    answer:
      'Of course! You can message us directly through chat for additional requests such as flower substitutions, personalized notes, or color themes.',
  },
  {
    question: 'Do I need an account to place an order?',
    answer:
      'Yes, you’ll need to create an account to complete your purchase. This helps us track your orders, update you on delivery progress, and provide a smoother experience.',
  },
  {
    question: 'How can I contact Floravia for assistance?',
    answer:
      'You can reach us anytime through our mobile number, email, or official social media pages. Our team will be happy to assist you with any inquiries or concerns.',
  },
  {
    question: 'How can I track my order status?',
    answer:
      'You can view your order progress on your Profile Page — under Pending, To Ship, To Receive, Completed, or Cancelled tabs.',
  },
]
</script>

<style scoped>
.support-page {
  font-family: 'Outfit', sans-serif;
  background-color: #f5f0ec;
  overflow-x: hidden; /* ✅ no horizontal overflow */
}

/* 🌸 Hero Section */
.support-hero {
  position: relative;
  background-image: url('@/assets/supportbg.png');
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 90%;
  display: flex;
  justify-content: center;
  padding: 4rem 1.5rem;
  box-sizing: border-box;
  overflow: hidden;
}

.support-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 45%;
  height: 100%;
  background-color: rgba(245, 240, 236, 0.7);
  backdrop-filter: blur(6px);
  z-index: 1;
}

.support-content {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 1100px;
  width: 100%;
  gap: 2rem;
  z-index: 2;
  flex-wrap: wrap;
}

.support-text {
  flex: 1;
  max-width: 440px;
  color: #333;
  z-index: 2;
}

.support-text h1 {
  font-family: 'Caprasimo', cursive;
  font-size: 2.6rem;
  color: #5b6239;
  margin-bottom: 1rem;
}

.support-text p {
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.support-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

/* ✉️ Email Box */
.email-box {
  background-color: #f5f0ec;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  flex: 1;
  min-width: 320px;
  max-width: 420px;
  z-index: 2;
}

.email-box h2 {
  font-family: 'Caprasimo', cursive;
  color: #5b6239;
  margin-bottom: 1.2rem;
}

.name-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  flex: 1;
}

label {
  color: #9a9d68;
  font-weight: 600;
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
}

input,
textarea {
  border: 1.5px solid #a8b9c3;
  border-radius: 8px;
  padding: 0.6rem;
  font-family: 'Outfit', sans-serif;
  width: 100%;
  box-sizing: border-box;
}

textarea {
  height: 100px;
}

.send-btn {
  background-color: #5b6239;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 2rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
  width: 100%;
}

.send-btn:hover {
  background-color: #b8a0b8;
}

/* 🗺️ Map Section */
.map-section iframe {
  width: 100%;
  height: 520px;
  border: none;
  display: block;
}

/* 🌿 Featured Oval */
.featured-header {
  background-color: #a8b9c3;
  width: 100%;
  padding: 60px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.featured-oval {
  background-color: #f5f0ec;
  width: 100%;
  max-width: 1000px;
  border: 4px solid #f8d2bb;
  display: flex;
  justify-content: center;
  align-items: center;
}

.featured-oval h2 {
  color: #f8d2bb;
  font-family: 'Caprasimo', cursive;
  font-size: 42px;
  text-align: center;
}

/* 💬 FAQ */
.faq-section {
  background-color: #f5f0ec;
  padding: 4rem 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.faq-item {
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #a8b9c3;
  padding-bottom: 1rem;
  cursor: pointer;
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.faq-number {
  color: #9a9d68;
  font-weight: 700;
  margin-right: 10px;
}

.faq-question h3 {
  color: #9a9d68;
  font-weight: 600;
  flex: 1;
}

.arrow {
  font-size: 1.8rem;
  font-weight: bold;
  color: #b8a0b8;
  transition: transform 0.3s ease;
}

/* FAQ Answer Animation */
.faq-answer {
  color: #555;
  margin-top: 0.8rem;
  line-height: 1.5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 📱 Responsive */
@media (max-width: 1024px) {
  .support-content {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .support-overlay {
    width: 100%;
  }

  .support-text,
  .email-box {
    max-width: 90%;
  }
}
</style>