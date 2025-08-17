import Header from "../Components/Layout/Header"
import Footer from "../Components/Layout/Footer"
// import Image from "next/image"
import { Input } from "../Components/UI/Input"
import { Button } from "../Components/UI/Button"
import { Textarea } from "../Components/UI/Textarea"

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
                Pellentesque arcu facilisis nunc mi proin. Dignissim mattis in lectus tincidunt tincidunt ultricies.
                Diam convallis morbi pellentesque adipiscing
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
                    <p className="text-gray-600">+257 388-6895</p>
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
                    <p className="text-gray-600">kramulous@sbcglobal.net</p>
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
                    <p className="text-gray-600">Mon - Fri: 10AM - 10PM</p>
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
                    <p className="text-gray-600">19 North Road Piscataway, NY 08854</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-6">Contact Info</h3>
              <p className="text-gray-600 mb-6">Nibh dis faucibus proin locus tristique</p>

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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48371.66637238489!2d-73.85549418402536!3d40.75891874834012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c260af260fe8b7%3A0x8b7d1b258d6ddf33!2sForest%20Hills%2C%20Queens%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1712851600000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Clients/Partners Section */}
          <div className="mt-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-50">
              <img src="/placeholder.svg?height=40&width=120" alt="Zoom" width={120} height={40} />
              <img src="/placeholder.svg?height=40&width=120" alt="Tinder" width={120} height={40} />
              <img src="/placeholder.svg?height=40&width=120" alt="Dribbble" width={120} height={40} />
              <img src="/placeholder.svg?height=40&width=120" alt="Asana" width={120} height={40} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
