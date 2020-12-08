import { Request, Response } from 'express';

import ListUserRestaurant from '../../services/ListUserRestaurant';
import ListUserRestaurants from '../../services/ListUserRestaurants';
import CreateUserRestaurant from '../../services/CreateUserRestaurant';

class RestaurantController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { userId } = req.user;

    const listUserRestaurants = new ListUserRestaurants();

    const restaurants = await listUserRestaurants.execute({ userId });

    return res.json(restaurants);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { userId } = req.user;
    const { restaurantId } = req.params;

    const listUserRestaurant = new ListUserRestaurant();

    const restaurant = await listUserRestaurant.execute({
      userId,
      restaurantId,
    });

    return res.json(restaurant);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { userId } = req.user;
    const { restaurantOptions } = req.body;

    const createUserRestaurants = new CreateUserRestaurant();

    const restaurant = await createUserRestaurants.execute({
      userId,
      restaurantOptions,
    });

    return res.json(restaurant);
  }
}

export default RestaurantController;
