import { DynamoDBClient } from "@aws-sdk/client-dynamodb"

class ClientDB {
    static client() {
        return new DynamoDBClient({
            region: "us-east-2",
            credentials: {
                accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
                secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
            }
        })
    }
}

export default ClientDB