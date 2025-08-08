import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  @Get()
  async listProducts(@Request() req) {
    // Placeholder - lista simulada de produtos para demonstração
    const mockProducts = [
      {
        id: 1,
        name: 'iPhone 16',
        price: 7999.99,
        stock: 50,
        category: 'Smartphones',
        image: '/main/typescript/public/Img/Iphone16.webp',
      },
      {
        id: 2,
        name: 'iPhone 15',
        price: 6999.99,
        stock: 75,
        category: 'Smartphones',
        image: '/main/typescript/public/Img/Iphone15.webp',
      },
      {
        id: 3,
        name: 'iPhone 14',
        price: 5999.99,
        stock: 100,
        category: 'Smartphones',
        image: '/main/typescript/public/Img/iphone14.jpg',
      },
      {
        id: 4,
        name: 'iPhone 16 Pro',
        price: 9999.99,
        stock: 25,
        category: 'Smartphones',
        image: '/main/typescript/public/Img/16pro.avif',
      },
    ];

    return {
      message: 'Produtos listados com sucesso',
      products: mockProducts,
      user: {
        name: req.user.name,
        group: req.user.group,
      },
    };
  }
}
