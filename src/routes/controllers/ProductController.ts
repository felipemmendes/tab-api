import { Request, Response } from 'express';

import CreateRestaurantProduct from '../../services/CreateRestaurantProduct';
import ListRestaurantProducts from '../../services/ListRestaurantProducts';
import ShowRestaurantProduct from '../../services/ShowRestaurantProduct';

class ProductController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { restaurantId } = req.restaurant;
    const { product_name } = req.body;

    const createRestaurantProduct = new CreateRestaurantProduct();

    const product = await createRestaurantProduct.execute({
      restaurantId,
      product_name,
    });

    return res.json(product);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { restaurantId } = req.restaurant;

    const listRestaurantProducts = new ListRestaurantProducts();

    const products = await listRestaurantProducts.execute({
      restaurantId,
    });

    return res.json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { restaurantId } = req.restaurant;
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
