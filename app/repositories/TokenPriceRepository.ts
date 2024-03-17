import { ServerScope, DocumentScope } from "nano";
import nano from "nano";

interface TokenPriceDocument {
  _id: string;
  type: string;
  tokenId: string;
  price: number;
  provider: string;
}

class TokenPriceRepository {
  private db: DocumentScope<TokenPriceDocument>;
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

    this.db = this.nanoInstance.use<TokenPriceDocument>(COUCHDB_DBNAME);
  }

  async saveTokenPrice(
    tokenId: string,
    price: number,
    provider: string
  ): Promise<void> {
    const doc: TokenPriceDocument = {
      _id: new Date().toISOString(),
      type: "tokenPrice",
      tokenId,
      price,
      provider,
    };
    await this.db.insert(doc);
  }
}

export default TokenPriceRepository;
