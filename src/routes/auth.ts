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
  CreateAccountByAdmin: {
    handler:
      "src/controllers/auth/CreateAccountByAdminController.handle",
    events: [
      {
        http: {
          path: "auth/CreateAccountByAdmin",
          method: "post",
          cors: true,
          authorizer: { // need token
            name: "authenticate"
          }
        }
      }
    ]
  },
  SendRecoveryCode: {
    handler:
      "src/controllers/auth/SendRecoveryCodeController.handle",
    events: [
      {
        http: {
          path: "auth/SendRecoveryCode",
          method: "post",
          cors: true,
        }
      }
    ]
  },
  ChangePassword: {
    handler:
      "src/controllers/auth/ChangePasswordController.handle",
    events: [
      {
        http: {
          path: "auth/ChangePassword",
          method: "put",
          cors: true,
        }
      }
    ]
  },
  ListUsers: {
    handler:
      "src/controllers/auth/ListUsersController.handle",
    events: [
      {
        http: {
          path: "auth/ListUsers",
          method: "get",
          cors: true,
          authorizer: { // need token
            name: "authenticate"
          }
        }
      }
    ]
  },
}
