import { EntityRepository, Repository } from 'typeorm';
import CustomError from '../../errors/CustomError';
import RestaurantVisit from '../models/RestaurantVisit';

interface CustomUpdate {
  visitId: string;
  visitOptions: {
    comments: string;
    score: number;
    date: Date;
  };
}

interface UpdateTotal {
  visitId: string;
}

@EntityRepository(RestaurantVisit)
class RestaurantVisitRepository extends Repository<RestaurantVisit> {
  public async customUpdate({
    visitId,
    visitOptions,
  }: CustomUpdate): Promise<void> {
    const { comments, score, date } = visitOptions;

    await this.update(
      {
        id: visitId,
      },
      {
        ...(comments && { comments }),
        ...(score && { score }),
        ...(date && { date }),
      },
    );
  }

  public async updateTotal({ visitId }: UpdateTotal): Promise<void> {
    const visitOrder = await this.findOne({
      where: {
        id: visitId,
      },
      relations: ['order'],
    });

    if (!visitOrder) {
      throw new CustomError({ message: 'Visit not found', statusCode: 404 });
    }

    const orderTotal = visitOrder.order.reduce((acc, curr) => {
      return acc + curr.product_quantity * curr.product_value;
    }, 0);

    await this.update({ id: visitId }, { order_total: orderTotal });
  }
}
export default RestaurantVisitRepository;
