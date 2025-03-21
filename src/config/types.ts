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
