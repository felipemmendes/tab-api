import { getRepository, In } from 'typeorm';

import OrderProduct from '../database/models/OrderProduct';
import Restaurant from '../database/models/Restaurant';
import RestaurantProduct from '../database/models/RestaurantProduct';
import RestaurantVisit from '../database/models/RestaurantVisit';
import CustomError from '../errors/CustomError';

interface Request {
  userId: string;
  restaurantId: string;
  visitOptions: {
    order: {
      product: string;
      value: number;
    }[];
    score: number;
    comments: string;
    date: Date;
  };
}

class CreateVisit {
  public async execute({
    userId,
    restaurantId,
    visitOptions: { order, score, comments, date },
  }: Request): Promise<RestaurantVisit> {
    const orderProductRepository = getRepository(OrderProduct);
    const restaurantRepository = getRepository(Restaurant);
    const restaurantProductRepository = getRepository(RestaurantProduct);
    const restaurantVisitRepository = getRepository(RestaurantVisit);

    const restaurantExists = await restaurantRepository.findOne({
      where: {
        id: restaurantId,
        user_id: userId,
      },
    });

    if (!restaurantExists) {
      throw new CustomError({
        message: 'Restaurant does not exist',
        statusCode: 404,
      });
    }

    const restaurantVisit = restaurantVisitRepository.create({
      restaurant_id: restaurantId,
      comments,
      score,
      date,
    });

    await restaurantVisitRepository.save(restaurantVisit);

    const orderProductsNames = order.map(o => o.product);

    const existentProducts = await restaurantProductRepository.find({
      where: {
        name: In(orderProductsNames),
        restaurant_id: restaurantId,
      },
    });

    const existentProductsNames = existentProducts.map(product => product.name);

    const productsToCreate = orderProductsNames
      .filter(product => !existentProductsNames.includes(product))
      .filter((value, index, self) => self.indexOf(value) === index)
      .map(product =>
        restaurantProductRepository.create({
          name: product,
          restaurant_id: restaurantId,
        }),
      );

    const createdProducts = await restaurantProductRepository.save(
      productsToCreate,
    );

    const allOrderProducts = [...existentProducts, ...createdProducts];

    const orderProducts = order.map(o => {
      return orderProductRepository.create({
        product_id: allOrderProducts.find(p => p.name === o.product)!.id,
        value: o.value,
        restaurant_visit_id: restaurantVisit.id,
      });
    });

    await orderProductRepository.save(orderProducts);

    return restaurantVisit;
  }
}

export default CreateVisit;
