import Header from "../Components/Layout/Header"
import Footer from "../Components/Layout/Footer"
// import Image from "next/image"
import { Input } from "../Components/UI/Input"
import { Button } from "../Components/UI/Button"
import { Textarea } from "../Components/UI/Textarea"
import Zoom from "../assets/ContactUsLogos/zoom.svg";
import Tinder from "../assets/ContactUsLogos/tinder.svg";
import Asana from "../assets/ContactUsLogos/asana.svg";
import Dribble from "../assets/ContactUsLogos/dribble.svg";
export default function ContactUsPage() {
  return (
    <>
      <main>
        {/* Hero Section */}
        <div className="bg-black text-white py-12 text-center">
          <h1 className="text-4xl font-bold">Contact Us</h1>
        </div>

        {/* Contact Content */}
        <div className="container mx-auto py-16 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column - Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6">You Will Grow, You Will Succeed. We Promise That</h2>
              <p className="text-gray-600 mb-10">
                We are here to help you with your job search and recruitment needs. Get in touch with us anytime during our working hours.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="bg-green-50 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Call for inquiry</h3>
                    <p className="text-gray-600">+91 70175 40010</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-green-50 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Send us email</h3>
                    <p className="text-gray-600">keshav9927.work@gmail.com</p>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-4">
                  <div className="bg-green-50 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Opening hours</h3>
                    <p className="text-gray-600">Mon - Fri: 10AM - 6PM</p>
                  </div>
                </div>

                {/* Office */}
                <div className="flex items-start gap-4">
                  <div className="bg-green-50 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Office</h3>
                    <p className="text-gray-600"> IIIT Una,
                              Una, <br /> Himachal Pradesh</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-6">Contact Info</h3>
              <p className="text-gray-600 mb-6">Have questions or need support? Reach out to us, and our team will get back to you shortly.</p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                      First Name
                    </label>
                    <Input id="firstName" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                      Last Name
                    </label>
                    <Input id="lastName" placeholder="Your last name" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input id="email" type="email" placeholder="Your E-mail address" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Your message..." className="min-h-[120px]" />
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">Send Message</Button>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <div className="h-[400px] w-full rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d17270.05890681099!2d76.19966723184875!3d31.478716187920362!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391adb5aa39796f9%3A0x3d5e714694324768!2sIIIT%20Una%2C%20Academic%20Block!5e0!3m2!1sen!2sus!4v1755668376475!5m2!1sen!2sus" 
                width="100%" 
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>

          {/* Clients/Partners Section */}
          <div className="mt-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-50">
              <img src={`${Zoom}`} alt="Zoom" width={120} height={40} />
              <img src={`${Tinder}`} alt="Tinder" width={120} height={40} />
              <img src={`${Dribble}`} alt="Dribbble" width={120} height={40} />
              <img src={`${Asana}`} alt="Asana" width={120} height={40} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
