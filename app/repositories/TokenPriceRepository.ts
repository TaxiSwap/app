import { connectToDatabase } from "../services/mongodb";
import { ITokenPrice } from "../models/ITokenPrice";

export class TokenPriceRepository {
  async save(tokenPrice: ITokenPrice) {
    const db = await connectToDatabase();
    const collection = db.collection<ITokenPrice>("tokenPrices");
    return await collection.insertOne(tokenPrice);
  }
}
