import { Pact } from "@pact-foundation/pact"
import { eachLike, somethingLike } from "@pact-foundation/pact/src/dsl/matchers"
import 'dotenv/config'
import { resolve } from "path"


const mockProvider = new Pact({
    consumer: 'ebac-demo-store-admin',
    provider: 'ebac-demo-store-server',
    port: process.env.MOCK_Port,
    log: resolve(process.cwd(), 'log', 'pact.log'),
    dir: resolve(process.cwd(), 'pacts')
})

describe('Consumer Test', () => {

    beforeAll(async () => {
        await mockProvider.setup.then(() => {
            mockProvider.addInteraction({
                uponReceiving: 'a request',
                withRequest: {
                    method: 'POST',
                    path: '/graphql',
                    headers: {
                        authorization: 'Bearer Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkZhYmlvQnJ1bm8iLCJpYXQiOjE2ODc5OTkwMTksImV4cCI6MTY4ODE3MTgxOX0.tO-7_koFr4LEZPrbBSPfTYuFKv4LiYnfnOawSNYIIoE',
                        "Content-Type": 'application/json'
                    },
                    body: {
                        "operationName": "users",
                        "query": "query users($orderBy: UserOrderByInput, $skip: Float, $take: Float, $where: UserWhereInput) {\n  items: users(orderBy: $orderBy, skip: $skip, take: $take, where: $where) {\n    createdAt\n    firstName\n    id\n    lastName\n    roles\n    updatedAt\n    username\n    __typename\n  }\n  total: _usersMeta(where: $where) {\n    count\n    __typename\n  }\n}\n",
                        "variables": { where: {}, take: 50, skip: 0, orderBy: { id: "Asc" } }
                    }
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": 'application/json; charset=utf-8'
                    },
                    body: {
                        "data": {
                            "items": eachLike(
                                {
                                    "createdAt": somethingLike("2023-06-20T16:45:21.554Z"),
                                    "firstName": somethingLike("Admin"),
                                    "id": somethingLike("clj4inv2q0000wua8dpo17tnd"),
                                    "lastName": somethingLike("User"),
                                    "roles": ["user"],
                                    "updatedAt": somethingLike("2023-06-25T17:09:37.074Z"),
                                    "username": somethingLike("admin"),
                                    "__typename": somethingLike("User")
                                },
                                {min: 2}
                            ),
                            "total": {
                                "count": "2",
                                "__typename": "MetaQueryPayload"
                            }
                        }

                    }

                }
            })

        })

    });

    afterAll(() => mockProvider.finalize())

    afterEach(() => mockProvider.verify())

    it('Should return user list', () => {
userList().then(response=>{
    const {firstName, lastName} = response.data.items[1]

    expect(response.status).toEqual(200)
    expect(firstName).toBe('fabio')
    expect(lastName).toBe('bruno')
})
    });
})
