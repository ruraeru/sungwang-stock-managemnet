export type ProductType = {
  productName: string;
  unitPrice: string;
  quantity: string;
  totalPrice: string;
};

export type TJson = {
  transactionDetails: {
    supplier: {
      companyName: string;
      address: string;
      telephoneNumber: string;
    };
    customer: {
      companyName: string;
      address: string;
      telephoneNumber: string;
    };
    transactionDate: string;
    totalAmount: string;
    creditAmount: string;
  };
  items: ProductType[];
};
export interface IinitialState {
  output: TJson | null;
  prompt: string;
}

export interface IProduct {
  id: number;
  name: string;
  description?: string;
  category: string;
  unit: string;
  currentStock: number;
  priceHistory: PriceChange[];
  stockHistory: StockChange[];
}
interface PriceChange {
  id: number;
  productId: number;
  price: number;
  date: Date;
}
interface StockChange {
  id: number;
  productId: number;
  quantity: number;
  date: Date;
}
