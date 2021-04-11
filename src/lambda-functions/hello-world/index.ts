
export const helloWorld = async() => {
    console.log("Hello World !!")
    return {
        statusCode:200,
        headers:{"content-type":"text/plain"},
        body: "Hello"
    }
}