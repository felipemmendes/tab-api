import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../models/Product';

interface CreateMany {
  restaurantId: string;
  order: {
    product_name: string;
    product_value: number;
    product_quantity: number;
  }[];
}

interface CreateOne {
  restaurantId: string;
  product_name: string;
}

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
  public async findOneOrCreate({
    restaurantId,
    product_name,
  }: CreateOne): Promise<Product> {
    const exists = await this.findOne({
      where: {
        name: product_name,
        restaurant_id: restaurantId,
      },
    });

    if (exists) {
      return exists;
    }

    const product = this.create({
      name: product_name,
      restaurant_id: restaurantId,
    });

    await this.save(product);

    return product;
  }

  public async findManyOrCreate({
    restaurantId,
    order,
  }: CreateMany): Promise<Product[]> {
    const orderProductsNames = order.map(o => o.product_name);

    const existentProducts = await this.find({
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
        this.create({
          name: product,
          restaurant_id: restaurantId,
        }),
      );

    const createdProducts = await this.save(productsToCreate);

    const allOrderProducts = [...existentProducts, ...createdProducts];

    return allOrderProducts;
  }
}
export default ProductRepository;
