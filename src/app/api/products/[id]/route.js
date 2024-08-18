import { NextResponse } from 'next/server';
import prisma from '../../../util/prisma';
export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);
    const {
      name,
      description,
      price,
      stock,
      subcategoryId,
      colors,
      sizes,
      images,
      discount,
      isTopRated = false  // Default to false if not provided
    } = await request.json();

    // Update the product details
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        subcategoryId: subcategoryId ? parseInt(subcategoryId) : null,
        colors: colors ? JSON.stringify(colors) : null,
        sizes: sizes ? JSON.stringify(sizes) : null,
        discount: discount ? parseFloat(discount) : null,
        isTopRated: isTopRated,  // Ensure isTopRated is set to the provided value or false by default
        updatedAt: new Date(),
      },
    });

    // Update images
    if (images && images.length > 0) {
      // Delete existing images
      await prisma.image.deleteMany({
        where: { productId: id },
      });

      // Add new images
      await prisma.image.createMany({
        data: images
          .filter((base64) => base64) // Filter out null or undefined values
          .map((base64) => ({
            url: base64,
            productId: id,
          })),
      });
    }

    return NextResponse.json({
      status: 200,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      {
        message: 'Failed to update product',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}





export async function GET(request, { params }) {
  const { id } = params;
  try {
    // Fetch the product by ID
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        images: true,
      },
    });

    if (!product) {
      return NextResponse.json({
        message: 'Product not found',
        status: false,
      }, { status: 404 });
    }

    // Fetch related products based on subcategoryId
    const relatedProducts = await prisma.product.findMany({
      where: {
        subcategoryId: product.subcategoryId,
        id: {
          not: parseInt(id), // Exclude the current product
        },
      },
      include: {
        images: true,
      },
      take: 4, // Limit the number of related products
    });

    return NextResponse.json({
      status: 200,
      message: 'Product fetched successfully',
      data: {
        product,
        relatedProducts,
      },
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      {
        message: 'Failed to fetch product',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);

    // First, delete related order items
    await prisma.$executeRaw`DELETE FROM OrderItem WHERE productId = ${id}`;

    // Then delete related images
    await prisma.$executeRaw`DELETE FROM Image WHERE productId = ${id}`;

    // Now delete the product
    const deletedProduct = await prisma.$executeRaw`DELETE FROM Product WHERE id = ${id}`;

    return NextResponse.json({ message: 'Product and related data deleted successfully', deletedProduct });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      {
        message: 'Failed to delete product',
        status: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}


// export const config = {
//   api: {
//     bodyParser: true,
//   },
// };

// export async function PUT(request, { params }) {
//   try {
//     const id = parseInt(params.id);
//     const { name, description, price, stock, subcategoryId, colors, sizes, images } = await request.json();

//     const updatedProduct = await prisma.product.update({
//       where: { id: id },
//       data: {
//         name,
//         description,
//         price: parseFloat(price),
//         stock: parseInt(stock),
//         subcategoryId: subcategoryId ? parseInt(subcategoryId) : null,
//         colors: colors ? JSON.parse(colors) : null,
//         sizes: sizes ? JSON.parse(sizes) : null,
//         updatedAt: new Date(),
//       },
//     });

//     if (images && images.length > 0) {
//       await prisma.image.createMany({
//         data: images.map((imageBase64) => ({
//           url: imageBase64,
//           productId: id,
//         })),
//       });
//     }

//     return NextResponse.json(updatedProduct);
//   } catch (error) {
//     console.error('Error updating product:', error);
//     return NextResponse.json(
//       {
//         message: 'Failed to update product',
//         status: false,
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }



// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');
//     const name = searchParams.get('search');

//     if (id) {
//       // Fetch the product with its images and subcategory by ID
//       const product = await prisma.product.findUnique({
//         where: { id: parseInt(id) },
//         include: {
//           images: true,
//           subcategory: true,
//         },
//       });

//       if (!product) {
//         return NextResponse.json(
//           { message: 'Product not found', status: false },
//           { status: 404 }
//         );
//       }

//       // Fetch related products based on the same subcategory
//       const relatedProducts = await prisma.product.findMany({
//         where: {
//           subcategoryId: product.subcategoryId,
//           id: { not: parseInt(id) },
//         },
//         include: {
//           images: true,
//         },
//       });

//       return NextResponse.json({ product, relatedProducts });
//     } else if (name) {
//       // Fetch products that match the name search query
//       const products = await prisma.product.findMany({
//         where: {
//           name: {
//             contains: name,
//             mode: 'insensitive', // Case insensitive search
//           },
//         },
//         include: {
//           images: true,
//           subcategory: true,
//         },
//       });

//       return NextResponse.json(products);
//     } else {
//       // Fetch all products if no filter is applied
//       const products = await prisma.product.findMany({
//         include: {
//           images: true,
//           subcategory: true,
//         },
//       });

//       return NextResponse.json(products);
//     }
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     return NextResponse.json(
//       {
//         message: 'Failed to fetch products',
//         status: false,
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }



// export async function GET(request) {
//   const url = new URL(request.url);
//   const searchQuery = url.searchParams.get('search');

//   try {
//     const products = await prisma.product.findMany({
//       where: {
//         name: {
//           contains: searchQuery,
//           mode: 'insensitive', // Case-insensitive search
//         },
//       },
//       include: {
//         images: true,
//       },
//     });

//     return NextResponse.json(products);
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     return NextResponse.json(
//       {
//         message: 'Failed to fetch products',
//         status: false,
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }




// // export async function PUT(request, { params }) {
// //   try {
// //     const id = parseInt(params.id);
// //     const { name, description, price, stock, subcategoryId, colors, sizes, images } = await request.json();
// //     const updatedProduct = await prisma.product.update({
// //       where: { id: id },
// //       data: {
// //         name,
// //         description,
// //         price: parseFloat(price),
// //         stock: parseInt(stock),
// //         subcategoryId: subcategoryId ? parseInt(subcategoryId) : null,
// //         colors: colors ? JSON.parse(colors) : null,
// //         sizes: sizes ? JSON.parse(sizes) : null,
// //         updatedAt: new Date(),
// //       },
// //     });

// //     // Update images
// //     if (images && images.length > 0) {
// //       // Delete existing images
// //       await prisma.image.deleteMany({
// //         where: { productId: id },
// //       });

// //       // Add new images
// //       await prisma.image.createMany({
// //         data: images.map(url => ({
// //           url,
// //           productId: id,
// //         })),
// //       });
// //     }

// //     return NextResponse.json(updatedProduct);
// //   } catch (error) {
// //     console.error('Error updating product:', error);
// //     return NextResponse.json(
// //       {
// //         message: 'Failed to update product',
// //         status: false,
// //         error: error.message,
// //       },
// //       { status: 500 }
// //     );
// //   }
// // }


// // export async function PUT(request, { params }) {
// //   try {
// //     const id = parseInt(params.id);
// //     const { name, description, price, stock, subcategoryId, colors, sizes, images } = await request.json();

// //     const updatedProduct = await prisma.product.update({
// //       where: { id: id },
// //       data: {
// //         name,
// //         description,
// //         price: parseFloat(price),
// //         stock: parseInt(stock),
// //         subcategoryId: subcategoryId ? parseInt(subcategoryId) : null,
// //         colors: colors ? JSON.parse(colors) : null,
// //         sizes: sizes ? JSON.parse(sizes) : null,
// //         updatedAt: new Date(),
// //       },
// //     });

// //     // Add new images without deleting existing ones
// //     if (images && images.length > 0) {
// //       const imageUrls = await Promise.all(images.map(async (image) => {
// //         if (typeof image === 'string') {
// //           return image;
// //         } else if (image.base64) {
// //           const response = await fetch('https://data.tascpa.ca/uploadImage.php', {
// //             method: 'POST',
// //             headers: {
// //               'Content-Type': 'application/json',
// //             },
// //             body: JSON.stringify({ image: image.base64 }),
// //           });
// //           const result = await response.json();
// //           if (response.ok) {
// //             return result.image_url;
// //           } else {
// //             throw new Error(result.error || 'Failed to upload image');
// //           }
// //         }
// //         return null;
// //       }));

// //       const validImageUrls = imageUrls.filter(url => url !== null);

// //       await prisma.image.createMany({
// //         data: validImageUrls.map(url => ({
// //           url,
// //           productId: id,
// //         })),
// //       });
// //       console.log(`Added new images for product ID: ${id}`);
// //     }

// //     return NextResponse.json(updatedProduct);
// //   } catch (error) {
// //     console.error('Error updating product:', error);
// //     return NextResponse.json(
// //       {
// //         message: 'Failed to update product',
// //         status: false,
// //         error: error.message,
// //       },
// //       { status: 500 }
// //     );
// //   }
// // }



// export async function DELETE(request, { params }) {
//   try {
//     const id = parseInt(params.id);

//     // Delete related images first using a raw query
//     await prisma.$executeRaw`DELETE FROM Image WHERE productId = ${id}`;

//     // Now delete the product using a raw query
//     const deletedProduct = await prisma.$executeRaw`DELETE FROM Product WHERE id = ${id}`;

//     return NextResponse.json({ message: 'Product and related images deleted successfully', deletedProduct });
//   } catch (error) {
//     console.error('Error deleting product:', error);
//     return NextResponse.json(
//       {
//         message: 'Failed to delete product',
//         status: false,
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }