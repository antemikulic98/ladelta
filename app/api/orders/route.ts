import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    await dbConnect();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    // Build query
    const query: Record<string, unknown> = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { customerEmail: { $regex: search, $options: 'i' } },
        { orderNumber: { $regex: search, $options: 'i' } },
      ];
    }

    // Get total count for pagination
    const total = await Order.countDocuments(query);

    // Get orders with pagination
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json(
      {
        success: true,
        orders,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          count: orders.length,
          totalOrders: total,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const orderData = await request.json();

    // Validate required fields
    const requiredFields = [
      'customerName',
      'customerEmail',
      'customerPhone',
      'deliveryDate',
      'deliveryTime',
      'items',
    ];
    for (const field of requiredFields) {
      if (!orderData[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Calculate total amount
    const totalAmount = orderData.items.reduce((sum: number, item: { price: number; quantity: number }) => {
      return sum + item.price * item.quantity;
    }, 0);

    // Create new order
    const order = new Order({
      ...orderData,
      totalAmount,
    });

    await order.save();

    return NextResponse.json(
      {
        success: true,
        order,
        message: 'Order created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
