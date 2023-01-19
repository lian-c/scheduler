import React from "react";

import {getByText,getByPlaceholderText,

  getByAltText,
  prettyDOM,
  render,
  cleanup,
  waitForElement,
  fireEvent,
  act, getAllByTestId
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("changes the schedule when a new day is selected", async () => {
  const { getByText  } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();

});

it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  fireEvent.click(getByText(appointment, "Save"));
  console.log(prettyDOM(appointment));

});

xit("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
  const { container } = render(<Application />);
  console.log(prettyDOM(container))
  // getByText, getAllByAltText,getByPlaceholderText, getByAltText
  const onSave = jest.fn();
  await waitForElement(() => getByText("Archie Cohen"));


    fireEvent.click(getAllByAltText("Add")[0]); // click the first add




    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    }); // show placeholder text and add new input name

  


    fireEvent.click(getByAltText("Sylvia Palmer")); // click interviewer
    expect(onSave).not.toHaveBeenCalled();

  fireEvent.click(getByText("Save"));
  // expect(getByText("Monday")).toHaveTextContent("0 spot remaining")
});




