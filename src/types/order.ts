
export interface Customer {
  name: string;
  email: string;
  phone: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: string;
}

export interface Order {
  id?: string;
  customer: Customer;
  items: OrderItem[];
  total: number;
  totalWithIva: number;
  orderDate: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}
