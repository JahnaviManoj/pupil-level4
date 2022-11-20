/* eslint-disable no-undef */
const todoList = require("../todo");
let today = new Date().toLocaleDateString("en-CA");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Verifying the To-Do list", () => {
  beforeAll(() => {
    add({
      title: "Jogging for 1 and half hour",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });

  test("Adding a new To-Do task to the list", () => {
    // expect(all.length).toBe(0);
    let length = all.length;

    add({
      title: "Learning french for half an hour",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toBe(length + 1);
  });

  test("A To-Do task that is marked as done", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("all overdue To-Do tasks to be brought back", () => {
    let list_date_due = overdue();

    expect(
      list_date_due.every((todo) => {
        return todo.dueDate < today;
      })
    ).toBe(true);
  });

  test("fetching the To-Do tasks that are due today", () => {
    let list_date_due = dueToday();

    expect(
      list_date_due.every((todo) => {
        return todo.dueDate === today;
      })
    ).toBe(true);
  });

  test("recovering the To-Do tasks that are due in the future", () => {
    let list_date_due = dueLater();

    expect(
      list_date_due.every((todo) => {
        return todo.dueDate > today;
      })
    ).toBe(true);
  });
});
