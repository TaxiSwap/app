import { connectToDatabase } from "../services/mongodb";
import { IGasPrice } from "../models/IGasPrice";

export class GasPriceRepository {
  async save(gasPrice: IGasPrice) {
    const db = await connectToDatabase();
    const collection = db.collection<IGasPrice>("gasPrices");
    return await collection.insertOne(gasPrice);
  }
}
