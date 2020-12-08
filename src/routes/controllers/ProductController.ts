import { Request, Response } from 'express';

import ListRestaurantProducts from '../../services/ListRestaurantProducts';
import ShowRestaurantProduct from '../../services/ShowRestaurantProduct';

class ProductController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { userId } = req.user;
    const { restaurantId } = req.params;

    const listRestaurantProducts = new ListRestaurantProducts();

    const products = await listRestaurantProducts.execute({
      userId,
      restaurantId,
    });

    return res.json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { userId } = req.user;
    const { restaurantId, productId } = req.params;

    const showRestaurantProduct = new ShowRestaurantProduct();

    const product = await showRestaurantProduct.execute({
      userId,
      restaurantId,
      productId,
    });

    return res.json(product);
  }
}

export default ProductController;
