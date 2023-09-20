import { DeleteItemCommand, DescribeTableCommand, GetItemCommand, PutItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb"
import ClientDB from "./aws";
import sha256 from 'crypto-js/sha256'
import { TransacaoType } from "@/App/organisms/Home/components/Table";

interface updateUserProps {
    hash: string;
    transacoes: Array<TransacaoType>
}

export async function updateUser(props: updateUserProps) {

    if (!props.hash || !props.transacoes) {
        return false
    }

    const client = ClientDB.client()

    const user = {
        userId: props.hash,
    }

    const data = {
        transacoes: props.transacoes
    }

    const params = {
        UpdateExpression: 'set transacoes = :t',
        ExpressionAttributeValues: {
            ':t': marshall(data).transacoes
        },
    }

    const command = new UpdateItemCommand({ TableName: "users", Key: marshall(user), ...params })

    try {
        const { $metadata } = await client.send(command);
        if ($metadata.httpStatusCode !== 200) throw $metadata
        return true

    } catch (err) {
        return false
    }
}

interface createUserProps {
    nome: string;
    login: string;
    pass: string;
    transacoes?: Array<TransacaoType>
}

export async function createUser(props: createUserProps) {

    if (!props.login || !props.pass || !props.nome) {
        return false
    }

    const client = ClientDB.client()

    const user = {
        userId: sha256(props.login + props.pass).toString(),
        transacoes: props.transacoes || [],
        nome: props.nome
    }

    const item_dynamodb = marshall(user);

    const command = new PutItemCommand({ TableName: "users", Item: item_dynamodb })

    try {
        const { $metadata } = await client.send(command);

        if ($metadata.httpStatusCode !== 200) throw $metadata

        return true

    } catch (err) {
        return false
    }
}

interface getUserProps {
    hash: string;
}

export async function getUser(props: getUserProps) {

    if (!props?.hash) return false

    const client = ClientDB.client()

    const input = {
        "userId": props.hash
    }

    const command = new GetItemCommand({ TableName: "users", Key: marshall(input) });

    try {
        const { $metadata, ...result } = await client.send(command);

        if ($metadata.httpStatusCode !== 200) throw $metadata

        const item = unmarshall(result.Item)

        return item

    } catch (err) {
        return false
    }
}

export async function deleteUser(props: getUserProps) {

    if (!props?.hash) return false

    const client = ClientDB.client()

    const input = {
        "userId": props.hash
    }

    const command = new DeleteItemCommand({ TableName: "users", Key: marshall(input) });

    try {
        const { $metadata, ...result } = await client.send(command);

        if ($metadata.httpStatusCode !== 200) throw $metadata

        return true

    } catch (err) {
        return false
    }
}

export async function describeTable() {
    const client = ClientDB.client()

    const input = {
        TableName: "users",
    };
    const command = new DescribeTableCommand(input);
    const response = await client.send(command);

    return response
}

interface hashUserProps {
    login: string;
    pass: string;
}

export function hashUser(props: hashUserProps) {
    if (!props?.login || !props.pass) return false
    return sha256(props.login + props.pass).toString()
}