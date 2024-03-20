import { connectToDatabase } from "../services/mongodb";
import { IGasPrice } from "../models/IGasPrice";

export class GasPriceRepository {
  async save(gasPrice: IGasPrice) {
    const db = await connectToDatabase();
    const collection = db.collection<IGasPrice>("gasPrices");
    return await collection.insertOne(gasPrice);
  }

  async getAllGasPrices(page: number, limit: number, chainId?: string) {
    const db = await connectToDatabase();
    const query = chainId ? { chainId } : {};
    const options = {
      skip: (page - 1) * limit,
      limit: limit,
    };
    const collection = db.collection("gasPrices");
    const totalCount = await collection.countDocuments(query);
    const gasPrices = await collection.find(query, options).toArray();
    return { data: gasPrices, totalCount };
  }
}
