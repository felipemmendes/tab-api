import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './User';
import RestaurantDetail from './RestaurantDetail';
import Visit from './Visit';
import Product from './Product';

@Entity('restaurants')
class Restaurant {
  @Column()
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @PrimaryColumn()
  slug: string;

  @PrimaryColumn()
  user_id: string;

  @ManyToOne(() => User, user => user.restaurants)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  detail_id: string;

  @OneToOne(() => RestaurantDetail, { cascade: true })
  @JoinColumn({ name: 'detail_id' })
  detail: RestaurantDetail;

  @OneToMany(() => Visit, visit => visit.restaurant)
  visits: Visit[];

  @OneToMany(() => Product, products => products.restaurant)
  products: Product[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Restaurant;
