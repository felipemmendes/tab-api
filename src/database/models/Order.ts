import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Product from './Product';
import Visit from './Visit';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  product_id: string;

  @ManyToOne(() => Product, product => product.orders)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column('decimal', {
    precision: 6,
    scale: 2,
  })
  product_value: number;

  @Column()
  product_quantity: number;

  @Column()
  visit_id: string;

  @ManyToOne(() => Visit, visit => visit.order)
  @JoinColumn({ name: 'visit_id' })
  visit: Visit;
}

export default Order;
