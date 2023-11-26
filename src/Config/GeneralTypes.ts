export interface paymentInfoTypes {
  amount: number;
  currency: string;
  metadata: { userId: string; cartId: string };
}
