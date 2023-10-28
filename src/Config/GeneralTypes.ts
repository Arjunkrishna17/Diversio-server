export interface paymentInfoTypes {
  amount: number;
  currency: string;
  metadata: { userId: string; orderId: string };
}
