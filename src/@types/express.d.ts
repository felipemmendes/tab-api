declare namespace Express {
  export interface Request {
    user: {
      userId: string;
    };
    restaurant: {
      restaurantId: string;
      restaurantDetailId: string;
    };
  }
}
