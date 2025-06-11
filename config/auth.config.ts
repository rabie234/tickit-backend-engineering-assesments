export const config = {
  contentType: "content-type",

  errors: {
    allFieldsRequired: {
      key: "allFieldsRequired",
      code: 400,
      msg: "All fields are required",
    },

    emailDoesNotExist: {
      key: "emailDoesNotExist",
      code: 409,
      msg: "Email does not exist",
    },

    wrongCredentials: {
      key: "wrongCredentials",
      code: 400,
      msg: "Email/username or password is incorrect.",
    },
    notFound: {
      key: "customerNotFound",
      code: 404,
      msg: "Customer not found",
    },

    somethingWentWrong: {
      key: "somethingWentWrong",
      code: 400,
      msg: "Something Went Wrong.",
    },
  },
};
