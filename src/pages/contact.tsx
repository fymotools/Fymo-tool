// src/pages/contact.tsx
import Head from 'next/head';
import { Mail, Phone, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const emailAddress = 'fymotools@gmail.com';
  const whatsappNumber = '923027129449';

  return (
    <>
      <Head>
        <title>Contact Us - Fymo Tools</title>
        <meta name="description" content="Get in touch with Fymo Tools for support, feedback, or any inquiries." />
      </Head>
      <div className="max-w-3xl mx-auto py-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-textDark mb-6">Contact Us</h1>
        <p className="text-textLight text-lg mb-8">
          We'd love to hear from you! Whether you have feedback, a suggestion for a new tool, or need assistance, feel free to reach out.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-soft flex flex-col items-center justify-center">
            <Mail size={48} className="text-primary mb-4" />
            <h3 className="text-2xl font-semibold text-textDark mb-2">Email Us</h3>
            <p className="text-textLight text-base mb-4">
              For general inquiries or support.
            </p>
            <a
              href={`mailto:${emailAddress}`}
              className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-secondary transition-colors font-medium flex items-center"
            >
              <Mail size={20} className="mr-2" /> {emailAddress}
            </a>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-soft flex flex-col items-center justify-center">
            <MessageCircle size={48} className="text-green-500 mb-4" />
            <h3 className="text-2xl font-semibold text-textDark mb-2">WhatsApp</h3>
            <p className="text-textLight text-base mb-4">
              Chat with us directly on WhatsApp.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center"
            >
              <MessageCircle size={20} className="mr-2" /> +{whatsappNumber}
            </a>
          </div>
        </div>

        <p className="text-textLight text-lg">
          We aim to respond to all inquiries within 24-48 hours.
        </p>
      </div>
    </>
  );
};

export default Contact;
