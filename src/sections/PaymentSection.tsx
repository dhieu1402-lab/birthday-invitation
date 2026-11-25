import React from 'react';
import { QRPayment } from '../components/QRPayment';

export const PaymentSection: React.FC = () => {
  return (
    <section id="gift" className="relative w-full py-6 sm:py-8">
      <QRPayment />
    </section>
  );
};
