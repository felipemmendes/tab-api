import { Request, Response } from 'express';

import CreateProduct from '../../services/CreateProduct';
import ListProducts from '../../services/ListProducts';
import ShowProduct from '../../services/ShowProduct';

class ProductController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { restaurantId } = req.restaurant;
    const { product_name } = req.body;

    const createProduct = new CreateProduct();

    const product = await createProduct.execute({
      restaurantId,
      product_name,
    });

    return res.json(product);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { restaurantId } = req.restaurant;

    const listProducts = new ListProducts();

    const products = await listProducts.execute({
      restaurantId,
    });

    return res.json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { restaurantId } = req.restaurant;
    const { productId } = req.params;

    const showProduct = new ShowProduct();

    const product = await showProduct.execute({
      restaurantId,
      productId,
    });

    return res.json(product);
  }
}

export default ProductController;
