// src/pages/privacy-policy.tsx
import Head from 'next/head';

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy - Fymo Tools</title>
        <meta name="description" content="Read our privacy policy to understand how Fymo Tools collects, uses, and protects your information." />
      </Head>
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-textDark mb-6 text-center">Privacy Policy</h1>
        <p className="text-textLight text-lg mb-4">
          At Fymo Tools, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose information about you when you visit our website.
        </p>
        <h2 className="text-2xl font-semibold text-textDark mb-3 mt-6">Information We Collect</h2>
        <p className="text-textLight text-lg mb-4">
          We do not collect any personally identifiable information from our users. All tools on Fymo Tools operate client-side (in your browser), meaning your data is processed locally and never sent to our servers.
        </p>
        <p className="text-textLight text-lg mb-4">
          However, we may use third-party services like Google Analytics to understand website traffic and user behavior. This data is aggregated and anonymous and helps us improve our services.
        </p>
        <h2 className="text-2xl font-semibold text-textDark mb-3 mt-6">Cookies</h2>
        <p className="text-textLight text-lg mb-4">
          Our website may use cookies to enhance your experience, such as remembering your language preference or for analytical purposes. You can choose to disable cookies through your browser settings.
        </p>
        <h2 className="text-2xl font-semibold text-textDark mb-3 mt-6">Third-Party Links</h2>
        <p className="text-textLight text-lg mb-4">
          Fymo Tools may contain links to other websites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to read the privacy policies of any linked websites you visit.
        </p>
        <h2 className="text-2xl font-semibold text-textDark mb-3 mt-6">Changes to This Policy</h2>
        <p className="text-textLight text-lg mb-4">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
        <p className="text-textLight text-lg">
          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:fymotools@gmail.com" className="text-primary hover:underline">fymotools@gmail.com</a>.
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicy;
