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
  },
  VerifyEmail: {
    handler:
      "src/controllers/auth/VerifyEmailController.handle",
    events: [
      {
        http: {
          path: "auth/VerifyEmail",
          method: "post",
          cors: true,
        }
      }
    ]
  },
  CreateAccountByUser: {
    handler:
      "src/controllers/auth/CreateAccountByUserController.handle",
    events: [
      {
        http: {
          path: "auth/CreateAccountByUser",
          method: "post",
          cors: true,
        }
      }
    ]
  },
}
