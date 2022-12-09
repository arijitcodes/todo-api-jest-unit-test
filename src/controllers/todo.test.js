const {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodoStatus,
} = require("./todo");
const TodoModel = require("../models/Todo");

const { errorResponse } = require("../utils/errorResponse");

jest.mock("../utils/errorResponse", () => ({
  errorResponse: jest.fn((x) => x),
}));

describe("Todo Controller - getAllTodos()", () => {
  const mReq = {};
  const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const mNext = jest.fn();

  test("should return blank array when no Todos found in DB", async () => {
    const todos = [];

    jest.spyOn(TodoModel, "find").mockResolvedValueOnce(todos);
    // const mockTodoFind = jest.fn(() => todos);
    // jest.spyOn(TodoModel, "find").mockImplementation(() => mockTodoFind());

    await getAllTodos(mReq, mRes, mNext);
    expect(TodoModel.find).toHaveBeenCalledTimes(1);
    expect(mRes.json).toBeCalledWith({ count: 0, todos: [] });
    expect(mNext).not.toBeCalled();
    expect(getAllTodos).not.toThrowError();
  });
});

describe("Todo Controller - getTodo()", () => {
  const todo = {
    _id: "6391b4f44f413dfe313654ef",
    title: "Todo 1",
    description: "This is the First Todo",
    status: false,
    createdAt: "2022-12-08T09:57:08.764Z",
    updatedAt: "2022-12-08T09:57:08.764Z",
    __v: 0,
  };

  const mReq = { params: { id: 0 } };
  const mRes = {
    status: jest.fn().mockReturnThis(),
    body: {},
    json: jest.fn((input) => {
      this.body = input;
    }),
  };
  const mNext = jest.fn();

  test("should throw error if Request Parameter ID does not exist", async () => {
    jest.spyOn(TodoModel, "findById").mockResolvedValueOnce(null);

    mReq.params.id = "6391b65944b2b3405aee8c8d";

    await getTodo(mReq, mRes, mNext);

    expect(TodoModel.findById).toHaveBeenCalledTimes(1);
    expect(errorResponse).toHaveBeenCalledTimes(1);
    expect(errorResponse).toHaveBeenCalledWith(
      mRes,
      404,
      "Invalid Todo ID! Todo Not Found!"
    );
    /* expect(mNext).toHaveBeenCalledTimes(1);
    expect(mNext).toHaveBeenCalledWith(
      new Error("Invalid Todo ID! Todo Not Found!")
    ); */
  });

  test("should throw error if Request Parameter ID is inavlid type of id", async () => {
    jest.spyOn(TodoModel, "findById").mockResolvedValueOnce(null);

    mReq.params.id = "123131";

    await getTodo(mReq, mRes, mNext);

    expect(TodoModel.findById).toHaveBeenCalledTimes(1);
    expect(errorResponse).toHaveBeenCalledTimes(1);
    expect(errorResponse).toHaveBeenCalledWith(
      mRes,
      404,
      "Invalid Todo ID! Todo Not Found!"
    );
  });

  test("should return valid todo if ID is good", async () => {
    jest.spyOn(TodoModel, "findById").mockResolvedValueOnce(todo);

    mReq.params.id = "6391b4f44f413dfe313654ef";

    await getTodo(mReq, mRes, mNext);

    expect(TodoModel.findById).toHaveBeenCalledTimes(1);
    expect(errorResponse).not.toBeCalled();
    expect(mRes.json).toHaveBeenCalledTimes(1);
    expect(mRes.json).toHaveBeenCalledWith({ todo });
  });
});

describe("Todo Controller - createTodo()", () => {
  let reqTodo;
  let expectedTodo;
  let mReq;
  let mRes;
  let mNext;

  beforeEach(() => {
    reqTodo = {
      title: "Todo Test",
      description: "This is the First Todo",
      status: false,
    };

    expectedTodo = {
      _id: "6391b4f44f413dfe313654ef",
      title: "Todo 1",
      description: "This is the First Todo",
      status: false,
      createdAt: "2022-12-08T09:57:08.764Z",
      updatedAt: "2022-12-08T09:57:08.764Z",
      __v: 0,
    };

    mReq = { body: JSON.stringify(reqTodo) };
    mRes = {
      status: jest.fn().mockReturnThis(),
      body: {},
      json: jest.fn((input) => {
        this.body = input;
      }),
    };
    mNext = jest.fn();
  });

  test("should throw error if title is not present in Request Body", async () => {
    const tempTodo = reqTodo;
    delete tempTodo.title;

    mReq.body = JSON.stringify(tempTodo);

    jest.spyOn(TodoModel, "create").mockImplementation(() => {
      throw new Error(
        "Todo validation failed: title: Title is a required field!"
      );
    });

    await createTodo(mReq, mRes, mNext);

    expect(TodoModel.create).toHaveBeenCalledTimes(1);
    expect(TodoModel.create).toHaveBeenCalledWith(mReq.body);
    expect(mNext).toHaveBeenCalledTimes(1);
    expect(mNext).toHaveBeenCalledWith(
      new Error("Todo validation failed: title: Title is a required field!")
    );
  });

  test("should not call next and respond with created Todo with 201 status code", async () => {
    jest.spyOn(TodoModel, "create").mockResolvedValue(expectedTodo);
    await createTodo(mReq, mRes, mNext);

    expect(TodoModel.create).toHaveBeenCalledTimes(1);
    expect(TodoModel.create).toHaveBeenCalledWith(mReq.body);
    expect(mRes.status).toHaveBeenCalledTimes(1);
    expect(mRes.status).toHaveBeenCalledWith(201);
    expect(mRes.json).toHaveBeenCalledTimes(1);
    expect(mRes.json).toHaveBeenCalledWith({ todo: expectedTodo });
    expect(mNext).not.toHaveBeenCalled();
  });
});

describe("Todo Controller - updateTodoStatus()", () => {
  let todo;
  let mReq;
  let mRes;
  let mNext;

  beforeEach(() => {
    todo = {
      _id: "6391b4f44f413dfe313654ef",
      title: "Todo 1",
      description: "This is the First Todo",
      status: false,
      createdAt: "2022-12-08T09:57:08.764Z",
      updatedAt: "2022-12-08T09:57:08.764Z",
      __v: 0,
    };

    mReq = { params: { id: 0 } };
    mRes = {
      status: jest.fn().mockReturnThis(),
      body: {},
      json: jest.fn((input) => {
        this.body = input;
      }),
    };
    mNext = jest.fn();
  });

  test("should throw error if Request Params ID is invalid", async () => {
    jest.spyOn(TodoModel, "findById").mockResolvedValue(null);

    await updateTodoStatus(mReq, mRes, mNext);

    expect(TodoModel.findById).toHaveBeenCalledTimes(1);
    expect(TodoModel.findById).toHaveBeenCalledWith(0);
    expect(errorResponse).toHaveBeenCalledTimes(1);
    expect(errorResponse).toHaveBeenCalledWith(
      mRes,
      404,
      "Invalid Todo ID! Todo Not Found!"
    );
    expect(mRes.json).not.toHaveBeenCalled();
  });

  test("should not throw error if Request Params ID is valid and respond with expected Todo", async () => {
    mReq.params.id = todo._id;
    const oldTodo = todo;

    jest.spyOn(TodoModel, "findById").mockResolvedValue(todo);
    jest
      .spyOn(TodoModel.prototype, "save")
      .mockResolvedValue({ ...todo, status: !oldTodo.status });
    /* jest
      .spyOn(TodoModel.prototype, "save")
      .mockImplementationOnce((todo) =>
        Promise.resolve({ ...todo, status: !oldTodo.status })
      ); */

    await updateTodoStatus(mReq, mRes, mNext);

    expect(TodoModel.findById).toHaveBeenCalledTimes(1);
    expect(TodoModel.findById).toHaveBeenCalledWith(todo._id);
    expect(TodoModel.findById).toHaveReturned();
    expect(errorResponse).not.toHaveBeenCalled();
    expect(mRes.json).toHaveBeenCalledTimes(1);
  });
});
