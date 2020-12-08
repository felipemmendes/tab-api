import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Product from './Product';
import RestaurantVisit from './RestaurantVisit';

@Entity('order_products')
class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  product_id: string;

  @ManyToOne(() => Product, product => product.orders, {
    eager: true,
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column('decimal', {
    precision: 6,
    scale: 2,
  })
  value: number;

  @Column()
  restaurant_visit_id: string;

  @ManyToOne(() => RestaurantVisit, visit => visit.order)
  @JoinColumn({ name: 'restaurant_visit_id' })
  restaurant_visit: RestaurantVisit;
}

export default OrderProduct;
