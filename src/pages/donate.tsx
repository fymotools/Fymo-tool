// src/pages/donate.tsx
import Head from 'next/head';
import { Heart, CreditCard, Banknote } from 'lucide-react';

const Donate: React.FC = () => {
  const jazzCashNumber = '923027129449';
  const easyPaisaNumber = '923448292001';

  return (
    <>
      <Head>
        <title>Donate to Fymo Tools</title>
        <meta name="description" content="Support Fymo Tools to help us keep providing free and useful online utilities." />
      </Head>
      <div className="max-w-3xl mx-auto py-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-textDark mb-6">Support Fymo Tools</h1>
        <p className="text-textLight text-lg mb-8">
          Fymo Tools is a free resource built with passion to help you with your daily tasks. If you find our tools useful, please consider making a small donation to help us cover operational costs and continue developing new features. Every contribution, no matter how small, makes a big difference!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-soft flex flex-col items-center justify-center">
            <Banknote size={48} className="text-green-600 mb-4" />
            <h3 className="text-2xl font-semibold text-textDark mb-2">JazzCash</h3>
            <p className="text-textLight text-base mb-4">
              Send your support via JazzCash to:
            </p>
            <p className="text-xl font-bold text-primary mb-2">{923027129449}</p>
            <p className="text-sm text-textLight">(Account Holder: Emmanueil Masih)</p> {/* Emmanueil Masih */}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-soft flex flex-col items-center justify-center">
            <CreditCard size={48} className="text-purple-600 mb-4" />
            <h3 className="text-2xl font-semibold text-textDark mb-2">Easypaisa</h3>
            <p className="text-textLight text-base mb-4">
              Support us through Easypaisa to:
            </p>
            <p className="text-xl font-bold text-primary mb-2">{923448292001}</p>
            <p className="text-sm text-textLight">(Account Holder: Emmanueil Masih)</p> {/* Emmanueil Masih */}
          </div>
        </div>

        <p className="text-textLight text-lg flex items-center justify-center">
          Thank you for your generosity! <Heart size={24} className="text-red-500 ml-2" />
        </p>
      </div>
    </>
  );
};

export default Donate;
