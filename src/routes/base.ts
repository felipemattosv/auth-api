export const baseRoutes = {
  HelloWorld: {
    handler:
      "src/controllers/base/HelloWorldController.handle",
    events: [
      {
        http: {
          path: "base/HelloWorld",
          method: "get",
          cors: true,
        }
      }
    ]
  },
  HelloName: {
    handler:
      "src/controllers/base/HelloNameController.handle",
    events: [
      {
        http: {
          path: "base/HelloName",
          method: "get",
          cors: true,
        }
      }
    ]
  }
}
