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
import Order from './Order';
import Restaurant from './Restaurant';

@Entity('visits')
class Visit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column('integer')
  score: number;

  @Column()
  comments: string;

  @OneToMany(() => Order, order => order.visit, {
    eager: true,
  })
  order: Order[];

  @Column('decimal', {
    precision: 6,
    scale: 2,
  })
  total: number;

  @Column()
  restaurant_id: string;

  @ManyToOne(() => Restaurant, restaurant => restaurant.visits)
  @JoinColumn({ name: 'restaurant_id', referencedColumnName: 'id' })
  restaurant: Restaurant;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Visit;
