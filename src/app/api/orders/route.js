import { NextResponse } from 'next/server';
import prisma from '../../util/prisma';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export async function GET() {
  try {
    // Fetch orders along with order items and products
    const orders = await prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                images: {
                  take: 1 // Take only the first image
                }
              }
            }
          },
        },
      },
    });

    // Fetch user information for each order
    const ordersWithUserDetails = await Promise.all(
      orders.map(async (order) => {
        const user = await prisma.user.findUnique({
          where: { id: order.userId },
          select: { id: true, name: true },
        });
        return {
          ...order,
          user,
        };
      })
    );

    return NextResponse.json(ordersWithUserDetails);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    console.log('Received request for placing order');

    const authToken = request.headers.get('Authorization')?.split(' ')[1];
    console.log('Auth token:', authToken);

    if (!authToken) {
      console.log('No auth token provided');
      return NextResponse.json({ message: 'Unauthorized', status: false }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(authToken, SECRET_KEY);
      console.log('Decoded token:', decoded);
    } catch (error) {
      console.log('Token verification failed:', error);
      return NextResponse.json({ message: 'Unauthorized', status: false }, { status: 401 });
    }

    const { shippingAddress, paymentMethod, items, total, discount = 0, tax, netTotal, couponCode = null } = await request.json();

    if (!decoded.id || !items || items.length === 0 || !total) {
      console.log('Invalid order data');
      return NextResponse.json({ message: 'Invalid order data', status: false }, { status: 400 });
    }

    // Create the order
    const createdOrder = await prisma.order.create({
      data: {
        userId: decoded.id,
        total,
        discount,
        tax,
        netTotal,
        status: 'PENDING',
        recipientName: shippingAddress.recipientName,
        streetAddress: shippingAddress.streetAddress,
        apartmentSuite: shippingAddress.apartmentSuite,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zip: shippingAddress.zip,
        country: shippingAddress.country,
        phoneNumber: shippingAddress.phoneNumber,
        email: shippingAddress.email,
        paymentMethod,
        paymentInfo: paymentMethod === 'Credit Card' ? JSON.stringify(paymentInfo) : null,
        couponCode,
        orderItems: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity || 1,
            price: item.price,
            selectedColor: item.selectedColor || null,  // Store selected color directly
            selectedSize: item.selectedSize || null,    // Store selected size directly
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });

    console.log('Order placed successfully:', createdOrder);
    return NextResponse.json({ message: 'Order placed successfully', data: createdOrder, status: true }, { status: 200 });
  } catch (error) {
    console.error('Error placing order:', error);
    return NextResponse.json({ message: 'Failed to place order', error: error.message, status: false }, { status: 500 });
  }
}


// Uncomment and update the PUT and DELETE methods as needed

// export async function PUT(request) {
//   try {
//     const { id, total, status, orderItems, shippingAddress, paymentMethod, paymentInfo } = await request.json();

//     const updatedOrder = await prisma.order.update({
//       where: {
//         id: parseInt(id),
//       },
//       data: {
//         status,
//         paymentMethod,
//         paymentInfo: paymentMethod === 'Credit Card' ? JSON.stringify(paymentInfo) : null,
//         updatedAt: new Date(),
//       },
//     });

//     return NextResponse.json(updatedOrder);
//   } catch (error) {
//     console.error('Error updating order:', error);
//     return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
//   }
// }

// export async function DELETE(request) {
//   try {
//     const { id } = await request.json();
//     const deletedOrder = await prisma.order.delete({
//       where: {
//         id: parseInt(id),
//       },
//     });

//     return NextResponse.json(deletedOrder);
//   } catch (error) {
//     console.error('Error deleting order:', error);
//     return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
//   }
// }
