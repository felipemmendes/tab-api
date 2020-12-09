import { Request, Response } from 'express';

import CreateUserRestaurant from '../../services/CreateUserRestaurant';
import ListUserRestaurants from '../../services/ListUserRestaurants';
import ShowUserRestaurant from '../../services/ShowUserRestaurant';
import UpdateUserRestaurant from '../../services/UpdateUserRestaurant';

class RestaurantController {
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

  public async index(req: Request, res: Response): Promise<Response> {
    const { userId } = req.user;

    const listUserRestaurants = new ListUserRestaurants();

    const restaurants = await listUserRestaurants.execute({ userId });

    return res.json(restaurants);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { restaurantId } = req.restaurant;

    const showUserRestaurant = new ShowUserRestaurant();

    const restaurant = await showUserRestaurant.execute({ restaurantId });

    return res.json(restaurant);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { restaurantId, restaurantDetailId } = req.restaurant;
    const { restaurantOptions } = req.body;

    const updateUserRestaurants = new UpdateUserRestaurant();

    await updateUserRestaurants.execute({
      restaurantId,
      restaurantDetailId,
      restaurantOptions,
    });

    return res.sendStatus(200);
  }
}

export default RestaurantController;
