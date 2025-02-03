import { loadStripe } from '@stripe/stripe-js';

// Assurez-vous que cette clé publique est bien celle de votre compte
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default stripePromise;
