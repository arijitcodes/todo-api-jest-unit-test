const { errorResponse } = require("./errorResponse");

describe("errorResponse Module", () => {
  let mRes;

  beforeEach(() => {
    mRes = {
      body: "",
      statusCode: 0,
      status: jest.fn(),
    };

    jest.spyOn(mRes, "status").mockImplementation((input) => {
      mRes.statusCode = Number(input);
    });
  });

  test("should set the res status code throw error as default setup", () => {
    const callErrorResponse = () => errorResponse(mRes);

    expect(callErrorResponse).toThrowError("Something Went Wrong!");
    expect(mRes.status).toBeCalledTimes(1);
    expect(mRes.status).toBeCalledWith(400);
    expect(mRes.statusCode).toBe(400);
  });

  test("should set the res status code as input and throw error", () => {
    const callErrorResponse = () => errorResponse(mRes, 401, "Un-Auth");

    expect(callErrorResponse).toThrowError("Un-Auth");
    expect(mRes.status).toBeCalledTimes(1);
    expect(mRes.status).toBeCalledWith(401);
    expect(mRes.statusCode).toBe(401);
  });
});
