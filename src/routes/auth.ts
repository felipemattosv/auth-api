export const authRoutes = {
  Login: {
    handler:
      "src/controllers/auth/LoginController.handle",
    events: [
      {
        http: {
          path: "auth/login",
          method: "post",
          cors: true,
        }
      }
    ]
  }
}