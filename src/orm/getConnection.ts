import { createConnection, getConnectionManager } from "typeorm"
export default async () => {
  await createConnection()
  return getConnectionManager()
}
