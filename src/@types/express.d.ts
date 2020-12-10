declare namespace Express {
  export interface Request {
    user: {
      userId: string;
    };
    restaurant: {
      restaurantId: string;
      orderId?: string;
      visitId?: string;
      productId?: string;
    };
  }
}
