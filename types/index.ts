export type UserStatus = "pending" | "member" | "founder" | "admin";

export type UserProfile = {
  id: string;
  email: string;
  fullName: string;
  whatsapp: string | null;
  status: UserStatus;
  membershipActive: boolean;
  creditBalance: number;
  referralCode: string;
  infinitepayCustomerId: string | null;
  infinitepayOrderNsu: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OrderStatus = "pending" | "paid" | "failed" | "cancelled";
export type OrderType = "membership" | "product";

export type Order = {
  id: string;
  userId: string | null;
  type: OrderType;
  status: OrderStatus;
  amount: number;
  paidAmount: number | null;
  orderNsu: string;
  transactionNsu: string | null;
  infinitepaySlug: string | null;
  receiptUrl: string | null;
  captureMethod: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: "tricot" | "alfaiataria" | "blusas" | "camisas" | "looks" | "vestidos";
  gender: "masculino" | "feminino" | "unissex";
  colors: string[];
  sizes: Array<"P" | "M" | "G" | "GG">;
  images: string[];
  imageAlts?: string[];
  description: string;
  details?: string[];
  subcategory?: string;
  collection?: string;
  status?: "active" | "inactive";
  featured?: boolean;
  paymentLink?: string;
  pixCopyPaste?: string;
  privateDrop: boolean;
};
