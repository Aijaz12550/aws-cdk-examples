const axios = require("axios");
const auth = require("/opt/auth")

export const helloWorld = async() => {
    console.log("Hello World !!")
    let result = await axios.get("https://jsonplaceholder.typicode.com/todos")
    console.log("result",result,auth)

    return {
        statusCode:200,
        headers:{"content-type":"application/json"},
        body: JSON.stringify(result.data)
    }
}