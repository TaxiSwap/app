const nano = require("nano");

const couchdbUrl = process.env.COUCHDB_URL || "http://localhost:5984/";
const dbName = process.env.COUCHDB_DBNAME || "taxiswap";
const couchdbUser = process.env.COUCHDB_USER;
const couchdbPassword = process.env.COUCHDB_PASSWORD;

const nanoInstance = nano({
  url: couchdbUrl,
  requestDefaults: {
    auth: {
      username: couchdbUser,
      password: couchdbPassword,
    },
    jar: true,
  },
});

async function createDatabaseIfNeeded() {
  try {
    await nanoInstance.db.get(dbName);
    console.log(`Database '${dbName}' already exists.`);
  } catch (error) {
    if (error?.statusCode === 404) {
      await nanoInstance.db.create(dbName);
      console.log(`Database '${dbName}' created successfully.`);
    } else {
      throw error;
    }
  }
}

async function createDesignTokenPricesDocumentsIfNeeded() {
  const designDoc = {
    _id: "_design/tokenPrices",
    views: {
      byTokenId: {
        map: function (doc) {
          if (doc.type === "tokenPrice" && doc.tokenId) {
            emit(doc.tokenId, {
              price: doc.price,
              provider: doc.provider,
              timestamp: doc._id,
            });
          }
        }.toString(),
      },
    },
  };

  const db = nanoInstance.use(dbName);
  try {
    await db.get(designDoc._id);
    console.log("Design document already exists.");
  } catch (error) {
    if (error?.statusCode === 404) {
      await db.insert(designDoc);
      console.log("Design document created successfully.");
    } else {
      throw error;
    }
  }
}

async function createDesignGasPricesDocumentsIfNeeded() {
  const designDoc = {
    _id: "_design/gasPrices",
    views: {
      byChainId: {
        map: function (doc) {
          if (doc.type === "gasPrice" && doc.chainId) {
            emit(doc.chainId, {
              gasPrice: doc.gasPrice,
              timestamp: doc._id,
            });
          }
        }.toString(),
      },
    },
  };

  const db = nanoInstance.use(dbName);
  try {
    await db.get(designDoc._id);
    console.log("Design document for gas prices already exists.");
  } catch (error) {
    if (error?.statusCode === 404) {
      await db.insert(designDoc);
      console.log("Design document for gas prices created successfully.");
    } else {
      throw error;
    }
  }
}

async function initializeDatabase() {
  await createDatabaseIfNeeded();
  await createDesignTokenPricesDocumentsIfNeeded();
  await createDesignGasPricesDocumentsIfNeeded();
}

// Running the initialization
initializeDatabase()
  .then(() =>
    console.log(
      "Database and design documents initialization completed successfully."
    )
  )
  .catch((error) => console.error("Initialization failed:", error));
