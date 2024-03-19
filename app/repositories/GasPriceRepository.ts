import { ServerScope, DocumentScope } from "nano";
import nano from "nano";

interface GasPriceDocument {
  _id: string;
  type: string;
  chainId: string;
  price: bigint;
}

class TokenPriceRepository {
  private db: DocumentScope<GasPriceDocument>;
  private nanoInstance: ServerScope;

  constructor() {
    const COUCHDB_URL = process.env.COUCHDB_URL ?? "http://localhost:5984";
    const COUCHDB_USER = process.env.COUCHDB_USER ?? "defaultUser";
    const COUCHDB_PASSWORD = process.env.COUCHDB_PASSWORD ?? "defaultPassword";
    const COUCHDB_DBNAME = process.env.COUCHDB_DBNAME ?? "defaultDBName";

    this.nanoInstance = nano({
      url: COUCHDB_URL,
      requestDefaults: {
        auth: {
          username: COUCHDB_USER,
          password: COUCHDB_PASSWORD,
        },
      },
    });

    this.db = this.nanoInstance.use<GasPriceDocument>(COUCHDB_DBNAME);
  }

  async saveGasPrice(
    chainId: string,
    price: bigint,
  ): Promise<void> {
    const doc: GasPriceDocument = {
      _id: new Date().toISOString(),
      type: "gasPrice",
      chainId,
      price,
    };
    await this.db.insert(doc);
  }
}

export default TokenPriceRepository;
