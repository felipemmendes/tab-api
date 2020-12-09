import { EntityRepository, Repository } from 'typeorm';
import Order from '../models/Order';
import Product from '../models/Product';

interface CreateMany {
  newVisitId: string;
  order: {
    product_name: string;
    product_value: number;
    product_quantity: number;
  }[];
  products: Product[];
}

interface CustomUpdate {
  order_id: string;
  product_id?: string;
  product_value: number;
  product_quantity: number;
}

@EntityRepository(Order)
class OrderRepository extends Repository<Order> {
  public async createMany({
    newVisitId,
    order,
    products,
  }: CreateMany): Promise<Order[]> {
    const orderProducts = order.map(o => {
      return this.create({
        product_id: products.find(p => p.name === o.product_name)!.id,
        product_value: o.product_value,
        product_quantity: o.product_quantity,
        visit_id: newVisitId,
      });
    });

    await this.save(orderProducts);

    return orderProducts;
  }

  public async customUpdate({
    order_id,
    product_id,
    product_quantity,
    product_value,
  }: CustomUpdate): Promise<void> {
    await this.update(
      {
        id: order_id,
      },
      {
        ...(product_id && { product_id }),
        ...(product_quantity && { product_quantity }),
        ...(product_value && { product_value }),
      },
    );
  }
}
export default OrderRepository;
