import { Request, Response } from 'express';

import CreateProduct from '../../services/productServices/CreateProduct';
import DeleteProduct from '../../services/productServices/DeleteProduct';
import ListProducts from '../../services/productServices/ListProducts';
import ShowProduct from '../../services/productServices/ShowProduct';
import UpdateProduct from '../../services/productServices/UpdateProduct';

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
    const { productId } = req.params;

    const showProduct = new ShowProduct();

    const product = await showProduct.execute({
      productId,
    });

    return res.json(product);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { restaurantId } = req.restaurant;
    const { productId } = req.params;
    const { new_product_name } = req.body;

    const updateProduct = new UpdateProduct();

    await updateProduct.execute({
      restaurantId,
      productId,
      newName: new_product_name,
    });

    return res.sendStatus(200);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { restaurantId } = req.restaurant;
    const { productId } = req.params;

    const deleteProduct = new DeleteProduct();

    await deleteProduct.execute({ restaurantId, productId });

    return res.sendStatus(200);
  }
}

export default ProductController;
