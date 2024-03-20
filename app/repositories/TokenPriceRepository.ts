import { connectToDatabase } from "../services/mongodb";
import { ITokenPrice } from "../models/ITokenPrice";

export class TokenPriceRepository {
  async save(tokenPrice: ITokenPrice) {
    const db = await connectToDatabase();
    const collection = db.collection<ITokenPrice>("tokenPrices");
    return await collection.insertOne(tokenPrice);
  }

  async getAllTokenPrices(page: number, limit: number, tokenId: string) {
    const db = await connectToDatabase();
    const query = { tokenId }; 
    const collection = db.collection("tokenPrices");

    const totalCount = await collection.countDocuments(query);
    const tokenPrices = await collection
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return { data: tokenPrices, totalCount };
  }
}
