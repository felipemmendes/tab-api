import { Request, Response } from 'express';

import ShowUserRestaurant from '../../services/ShowUserRestaurant';
import ListUserRestaurants from '../../services/ListUserRestaurants';
import CreateUserRestaurant from '../../services/CreateUserRestaurant';
import UpdateUserRestaurant from '../../services/UpdateUserRestaurant';

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

    const showUserRestaurant = new ShowUserRestaurant();

    const restaurant = await showUserRestaurant.execute({
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

  public async update(req: Request, res: Response): Promise<Response> {
    const { userId } = req.user;
    const { restaurantId } = req.params;
    const { restaurantOptions } = req.body;

    const updateUserRestaurants = new UpdateUserRestaurant();

    await updateUserRestaurants.execute({
      userId,
      restaurantId,
      restaurantOptions,
    });

    return res.sendStatus(200);
  }
}

export default RestaurantController;
