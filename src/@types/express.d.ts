declare namespace Express {
  export interface Request {
    user: {
      userId: string;
    };
    restaurant: {
      restaurant: import('../database/models/Restaurant').default;
    };
  }
}
