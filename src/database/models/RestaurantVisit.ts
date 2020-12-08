import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import OrderProduct from './OrderProduct';
import Restaurant from './Restaurant';

@Entity('restaurant_visits')
class RestaurantVisit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column('integer')
  score: number;

  @Column()
  comments: string;

  @OneToMany(
    () => OrderProduct,
    orderProduct => orderProduct.restaurant_visit,
    {
      eager: true,
    },
  )
  order: OrderProduct[];

  @Column('decimal', {
    precision: 6,
    scale: 2,
  })
  order_total: number;

  @Column()
  restaurant_id: string;

  @ManyToOne(() => Restaurant, restaurant => restaurant.restaurant_visits)
  @JoinColumn({ name: 'restaurant_id', referencedColumnName: 'id' })
  restaurant: Restaurant;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default RestaurantVisit;
