import { Injectable } from '@nestjs/common';
import { Order } from 'src/orders/entities/order.entity';
import { Cart } from 'src/carts/entities/cart.entity';

@Injectable()
export class OrderMailerService {
  async setOrderDetails(order: Order, cart: Cart[]) {
    const email = order.user.email;

    const orderDate = order.createdAt.toLocaleDateString('fr');
    const orderTime = order.createdAt.toLocaleTimeString('fr', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const withdrawDate = order.withdrawDate.split('-').reverse().join('/');
    const withdrawTime = order.withdrawMorning
      ? 'de 10h à 14h'
      : 'de 14h à 19h';

    const amount = (order.amount / 100).toLocaleString('fr', {
      style: 'currency',
      currency: 'EUR',
    });

    const cartDetails = cart.map((cart) => [
      cart.quantity,
      cart.product.name,
      (cart.subTotal / 100).toLocaleString('fr', {
        style: 'currency',
        currency: 'EUR',
      }),
    ]);

    return {
      email,
      orderDate,
      orderTime,
      amount,
      withdrawDate,
      withdrawTime,
      cartDetails,
    };
  }
}
