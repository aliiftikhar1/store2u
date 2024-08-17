import { NextResponse } from 'next/server';
import prisma from '../../util/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, password, phoneno, city, role, imageUrl } = data;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newCustomer = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phoneno,
        city,
        role,
        imageUrl,  // Make sure this is the URL returned from the image upload
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(newCustomer);
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json(
      {
        message: 'Failed to create customer',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}



export async function GET() {
  try {
    const users = await prisma.user.findMany();
    console.log('Fetched users:', users);  // Add logging here
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      {
        message: 'Failed to fetch users',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
