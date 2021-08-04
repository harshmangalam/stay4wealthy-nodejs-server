require("dotenv").config();

const app = require("./server");
const { createConnection } = require("./database");

const { PORT } = require("./config");

async function bootstrap() {
  await createConnection();
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

bootstrap();
