import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import OrderProduct from './OrderProduct';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.product)
  orders: OrderProduct[];
}

export default Product;
