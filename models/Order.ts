import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem {
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface IOrder extends Document {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryDate: Date;
  deliveryTime: string;
  deliveryAddress?: string;
  items: IOrderItem[];
  totalAmount: number;
  status: 'naruceno' | 'u_izradi' | 'napravljeno' | 'placeno';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  name: {
    type: String,
    required: [true, 'Item name is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be positive'],
  },
  notes: {
    type: String,
    default: '',
  },
});

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      unique: true,
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    customerEmail: {
      type: String,
      required: [true, 'Customer email is required'],
      lowercase: true,
      trim: true,
    },
    customerPhone: {
      type: String,
      required: [true, 'Customer phone is required'],
      trim: true,
    },
    deliveryDate: {
      type: Date,
      required: [true, 'Delivery date is required'],
    },
    deliveryTime: {
      type: String,
      required: [true, 'Delivery time is required'],
    },
    deliveryAddress: {
      type: String,
      trim: true,
    },
    items: [OrderItemSchema],
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: [0, 'Total amount must be positive'],
    },
    status: {
      type: String,
      enum: ['naruceno', 'u_izradi', 'napravljeno', 'placeno'],
      default: 'naruceno',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Generate order number before saving
OrderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    const count = await mongoose.models.Order.countDocuments();
    this.orderNumber = `LD${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

const Order =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
