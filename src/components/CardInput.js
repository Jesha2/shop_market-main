import React from 'react';
import {CardElement} from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      'color': 'blue',
      'fontFamily': '"Helvetica Neue", Helvetica, sans-serif',
      'fontSmoothing': 'antialiased',
      'fontSize': '16px',
      '::placeholder': {
        color: 'green',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

export default function CardInput() {
  return (
    
    <CardElement options={CARD_ELEMENT_OPTIONS} >
card ellementhkjhjhjlhjkjhlkj
    </CardElement>
  );
}