import { Request, Response } from 'express';

import ListRestaurantProducts from '../../services/ListRestaurantProducts';
import ShowRestaurantProduct from '../../services/ShowRestaurantProduct';

class ProductController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { id: restaurantId } = req.restaurant.restaurant;

    const listRestaurantProducts = new ListRestaurantProducts();

    const products = await listRestaurantProducts.execute({
      restaurantId,
    });

    return res.json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id: restaurantId } = req.restaurant.restaurant;
    const { productId } = req.params;

    const showRestaurantProduct = new ShowRestaurantProduct();

    const product = await showRestaurantProduct.execute({
      restaurantId,
      productId,
    });

    return res.json(product);
  }
}

export default ProductController;
