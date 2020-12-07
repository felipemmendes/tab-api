import { Router } from 'express';
import ListUserRestaurants from '../services/ListUserRestaurants';
import ListUserRestaurant from '../services/ListUserRestaurant';
import CreateUserRestaurants from '../services/CreateUserRestaurant';

const restaurantRouter = Router();

restaurantRouter.get('/', async (req, res) => {
  const { userId } = req.user;

  const listUserRestaurants = new ListUserRestaurants();

  const restaurants = await listUserRestaurants.execute({ userId });

  return res.json(restaurants);
});

restaurantRouter.get('/:restaurantSlug', async (req, res) => {
  const { userId } = req.user;
  const { restaurantSlug } = req.params;

  const listUserRestaurant = new ListUserRestaurant();

  const restaurant = await listUserRestaurant.execute({
    userId,
    restaurantSlug,
  });

  return res.json(restaurant);
});

restaurantRouter.post('/', async (req, res) => {
  const { userId } = req.user;
  const { restaurantOptions } = req.body;

  const createUserRestaurants = new CreateUserRestaurants();

  const restaurant = await createUserRestaurants.execute({
    userId,
    restaurantOptions,
  });

  return res.json(restaurant);
});

export default restaurantRouter;
