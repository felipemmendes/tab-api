import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import OrderProduct from './OrderProduct';
import Restaurant from './Restaurant';

@Entity('products')
class RestaurantProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.product)
  orders: OrderProduct[];

  @Column()
  restaurant_id: string;

  @ManyToOne(() => Restaurant, restaurant => restaurant.restaurant_products)
  @JoinColumn({ name: 'restaurant_id', referencedColumnName: 'id' })
  restaurant: Restaurant;
}

export default RestaurantProduct;
