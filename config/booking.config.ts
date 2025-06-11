export interface ErrorDetail {
  key: string;
  code: number;
  msg: string;
}

export interface BookingSeatErrors {
  [key: string]: ErrorDetail;
}

const constants = {
  contentType: "content-type",

  bookingSeatErrors: {
    allFieldsRequired: {
      key: "allFieldsRequired",
      code: 400,
      msg: "All fields are required",
    },
  } as BookingSeatErrors,
};

export default constants;
