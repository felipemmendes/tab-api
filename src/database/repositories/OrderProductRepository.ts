import { EntityRepository, Repository } from 'typeorm';
import OrderProduct from '../models/OrderProduct';
import RestaurantProduct from '../models/RestaurantProduct';

interface CreateMany {
  newVisitId: string;
  order: {
    product_name: string;
    product_value: number;
    product_quantity: number;
  }[];
  products: RestaurantProduct[];
}

interface CustomUpdate {
  order_id: string;
  product_id?: string;
  product_value: number;
  product_quantity: number;
}

@EntityRepository(OrderProduct)
class OrderProductRepository extends Repository<OrderProduct> {
  public async createMany({
    newVisitId,
    order,
    products,
  }: CreateMany): Promise<OrderProduct[]> {
    const orderProducts = order.map(o => {
      return this.create({
        product_id: products.find(p => p.name === o.product_name)!.id,
        product_value: o.product_value,
        product_quantity: o.product_quantity,
        restaurant_visit_id: newVisitId,
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
export default OrderProductRepository;
