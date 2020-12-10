import { EntityRepository, Repository } from 'typeorm';
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

interface UpdateManyTotal {
  visitsId: string[];
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
    const visit = await this.findOneOrFail({
      where: {
        id: visitId,
      },
      relations: ['order'],
    });

    const orderTotal = visit.order.reduce((acc, curr) => {
      return acc + curr.product_quantity * curr.product_value;
    }, 0);

    await this.update({ id: visitId }, { total: orderTotal });
  }

  public async updateManyTotal({ visitsId }: UpdateManyTotal): Promise<void> {
    const visits = await this.createQueryBuilder('v')
      .select(['v.id', 'v.total'])
      .leftJoinAndSelect('v.order', 'o')
      .where('v.id IN (:...visitsId)', { visitsId })
      .getMany();

    const updatedVisits = visits.map(v => {
      return {
        id: v.id,
        total: v.order.reduce((acc, curr) => {
          return acc + curr.product_quantity * curr.product_value;
        }, 0),
      };
    });

    await this.save(updatedVisits);
  }
}
export default VisitRepository;
