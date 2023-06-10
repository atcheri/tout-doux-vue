import "@testing-library/jest-dom/extend-expect";

import { render, screen, waitFor } from "@testing-library/vue";

import ToDoListVue from "./ToDoList.vue";
import userEvent from "@testing-library/user-event";

// import event from "@testing-library/user-event";

describe("<ToDoList />", () => {
  describe("Given an invalid form", () => {
    it("disables the submit button", () => {
      // arrange
      render(ToDoListVue);
      const button = screen.getByText("Add a todo");

      // assert
      expect(button).toBeDisabled();
    });
  });

  describe("Given an non empty input", () => {
    describe("When the category is not selected", () => {
      it("keeps the submit button disabled", () => {
        // arrange
        render(ToDoListVue);
        const input = screen.getByRole("textbox", { name: /todo/i });
        const button = screen.getByText("Add a todo");

        // act
        userEvent.type(input, "this is a new todo");

        // assert
        expect(button).toBeDisabled();
      });
    });

    describe("When a category is selected", () => {
      it("enables the submit button", async () => {
        // arrange
        render(ToDoListVue);
        const input = screen.getByRole("textbox", { name: /todo/i });
        const button = screen.getByText("Add a todo");
        const category = screen.getByLabelText(/personal/i);

        // act
        await userEvent.type(input, "this is a new todo");
        await userEvent.click(category);

        // assert
        expect(button).not.toBeDisabled();
      });
    });
  });
});
