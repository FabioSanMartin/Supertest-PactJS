import 'dotenv/config'
import axios from 'axios'
import data from '../contract-testing/data'

const baseUrl = `http:localhost: ${process.env.MOCK_PORT}`

export const usersList = async () => {
    return await axios.post(`${baseUrl}/graphql`, data, {
        headers: {
            authorization: 'Bearer Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkZhYmlvQnJ1bm8iLCJpYXQiOjE2ODc5OTkwMTksImV4cCI6MTY4ODE3MTgxOX0.tO-7_koFr4LEZPrbBSPfTYuFKv4LiYnfnOawSNYIIoE',
                        "Content-Type": 'application/json'
        }
    })
}