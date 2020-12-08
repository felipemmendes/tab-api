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
import RestaurantVisit from './RestaurantVisit';

@Entity('restaurants')
class Restaurant {
  @Column()
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @PrimaryColumn()
  name_slug: string;

  @PrimaryColumn()
  user_id: string;

  @ManyToOne(() => User, user => user.restaurants)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  detail_id: string;

  @OneToOne(() => RestaurantDetail, { eager: true })
  @JoinColumn({ name: 'detail_id' })
  detail: RestaurantDetail;

  @OneToMany(() => RestaurantVisit, visit => visit.restaurant, { eager: true })
  restaurant_visits: RestaurantVisit[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Restaurant;
