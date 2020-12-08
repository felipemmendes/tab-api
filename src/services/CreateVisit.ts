import { getRepository, In } from 'typeorm';

import Product from '../database/models/Product';
import OrderProduct from '../database/models/OrderProduct';
import Restaurant from '../database/models/Restaurant';
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
    const productRepository = getRepository(Product);
    const orderProductRepository = getRepository(OrderProduct);
    const restaurantRepository = getRepository(Restaurant);
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

    const existentProducts = await productRepository.find({
      where: {
        name: In(orderProductsNames),
      },
    });

    const existentProductsNames = existentProducts.map(product => product.name);

    const productsToCreate = orderProductsNames
      .filter(product => !existentProductsNames.includes(product))
      .filter((value, index, self) => self.indexOf(value) === index)
      .map(product =>
        productRepository.create({
          name: product,
        }),
      );

    const createdProducts = await productRepository.save(productsToCreate);

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
