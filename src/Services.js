import * as faker from "faker";
import Util from "./Util";
import { v4 as uuidv4 } from "uuid";

export default class FoodService {
  static fetchFoods = async ({ minCalorie = 0, maxCalorie = 1000 }) => {
    if (minCalorie <= 0 || maxCalorie >= 1000 || minCalorie > maxCalorie)
      throw new Error("No Foods found");
    const foods = [];
    await Util.sleep(2);

    for (let i = 0; i < 10; i++) {
      const food = {
        id: uuidv4(),
        date: faker.date.between("2015-01-01", "2023-01-05"),
        name: faker.commerce.productName(),
        calorie: Number(faker.commerce.price(minCalorie, maxCalorie)),
        price: Number(faker.commerce.price(minCalorie, maxCalorie)),
      };
      foods.push(food);
      await Util.sleep(200.01);
    }
    return foods;
  };
}
