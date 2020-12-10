import { EntityRepository, Repository } from 'typeorm';
import CustomError from '../../errors/CustomError';
import Visit from '../models/Visit';

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

@EntityRepository(Visit)
class VisitRepository extends Repository<Visit> {
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
    const visitOrder = await this.findOneOrFail({
      where: {
        id: visitId,
      },
      relations: ['order'],
    });

    const orderTotal = visitOrder.order.reduce((acc, curr) => {
      return acc + curr.product_quantity * curr.product_value;
    }, 0);

    await this.update({ id: visitId }, { total: orderTotal });
  }
}
export default VisitRepository;
