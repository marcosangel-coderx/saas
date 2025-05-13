import React, { useState } from 'react';
import { CreditCard, Package, Users, Building } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    features: [
      'Up to 5 team members',
      'Basic module access',
      'Email support',
      'Basic analytics'
    ]
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 49,
    features: [
      'Up to 20 team members',
      'Full module access',
      'Priority support',
      'Advanced analytics',
      'Custom branding'
    ],
    recommended: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    features: [
      'Unlimited team members',
      'Full module access',
      'Dedicated support',
      'Custom module development',
      'White labeling',
      'SSO integration'
    ]
  }
];

export const SubscriptionForm: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [paymentMethod, setPaymentMethod] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription update
    console.log('Subscription updated:', { selectedPlan, paymentMethod });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`relative ${
              selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''
            } ${plan.recommended ? 'border-blue-200' : ''}`}
          >
            {plan.recommended && (
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-sm rounded-bl-lg rounded-tr-lg">
                Recommended
              </div>
            )}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Package className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={selectedPlan === plan.id ? 'primary' : 'outline'}
                fullWidth
                className="mt-6"
                onClick={() => setSelectedPlan(plan.id)}
              >
                {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card title="Payment Method">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Card Number</label>
            <div className="mt-1 relative">
              <input
                type="text"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="1234 5678 9012 3456"
                value={paymentMethod.cardNumber}
                onChange={(e) => setPaymentMethod({ ...paymentMethod, cardNumber: e.target.value })}
              />
              <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="MM/YY"
                value={paymentMethod.expiryDate}
                onChange={(e) => setPaymentMethod({ ...paymentMethod, expiryDate: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">CVV</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="123"
                value={paymentMethod.cvv}
                onChange={(e) => setPaymentMethod({ ...paymentMethod, cvv: e.target.value })}
              />
            </div>
          </div>

          <Button type="submit" fullWidth>
            Update Subscription
          </Button>
        </form>
      </Card>
    </div>
  );
};