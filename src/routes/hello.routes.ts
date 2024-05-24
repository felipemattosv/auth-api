export const helloRoutes = {
  sayHello: {
    handler:
      "src/functions/hello/sayHello.handler",
    events: [
      {
        http: {
          path: "sayHello",
          method: "get",
          cors: true,
          // authorizer: {
          //   name: "authenticate",
          // },
        },
      },
    ],
  },
}