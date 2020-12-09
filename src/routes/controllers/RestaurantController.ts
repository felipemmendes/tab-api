import { Request, Response } from 'express';

import CreateRestaurant from '../../services/CreateRestaurant';
import ListRestaurants from '../../services/ListRestaurants';
import ShowRestaurant from '../../services/ShowRestaurant';
import UpdateRestaurant from '../../services/UpdateRestaurant';
import DeleteRestaurant from '../../services/DeleteRestaurant';

class RestaurantController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { userId } = req.user;
    const { restaurantOptions } = req.body;

    const createRestaurants = new CreateRestaurant();

    const restaurant = await createRestaurants.execute({
      userId,
      restaurantOptions,
    });

    return res.json(restaurant);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { userId } = req.user;

    const listRestaurants = new ListRestaurants();

    const restaurants = await listRestaurants.execute({ userId });

    return res.json(restaurants);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { restaurantId } = req.restaurant;

    const showRestaurant = new ShowRestaurant();

    const restaurant = await showRestaurant.execute({ restaurantId });

    return res.json(restaurant);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { restaurantId, restaurantDetailId } = req.restaurant;
    const { restaurantOptions } = req.body;

    const updateRestaurants = new UpdateRestaurant();

    await updateRestaurants.execute({
      restaurantId,
      restaurantDetailId,
      restaurantOptions,
    });

    return res.sendStatus(200);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { restaurantId } = req.restaurant;

    const deleteRestaurant = new DeleteRestaurant();

    await deleteRestaurant.execute({ restaurantId });

    return res.sendStatus(200);
  }
}

export default RestaurantController;
