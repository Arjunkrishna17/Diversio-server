export interface orderTypes {
  userId: string;
  products: { productId: string; quantity: number }[];
  totalAmount: number;
  Address: object;
  paymentType: string;
  paymentStatus: string;
}
