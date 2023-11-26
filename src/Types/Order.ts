import { productTypes } from "./Products";

export interface orderDetails {
  cartId: string;
  product: productTypes;
  quantity: number;
  userId: string;
  cartAmount: number;
  paymentType?: string | null;
  paymentStatus?: null;
  expiresAt: Date;
}
