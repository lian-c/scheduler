import React from "react";
import axios from "axios";

import {getByText,
  queryByText,
  getByPlaceholderText,
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
  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "SAVING")).toBeInTheDocument();
  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
    );
    
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
  
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
      );
      fireEvent.click(getByAltText(appointment, "Delete"));
      expect(getByText(appointment, "Are you sure you want to delete this appointment")).toBeInTheDocument();
      fireEvent.click(getByText(appointment, "Confirm"));
      expect(getByText(appointment, "Deleting")).toBeInTheDocument();
      await waitForElement(() => getByAltText(appointment, "Add"));
      
      const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
        );
        
        expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
});

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  const { container, debug } = render(<Application />);
    
  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));
    fireEvent.change(getByPlaceholderText(appointment,"Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();
    await waitForElement(() => getByAltText(appointment, "Edit"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
      );
      
      expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
})
  
/* test number five */
it("shows the save error when failing to save an appointment", async () => {
  const { container, debug } = render(<Application />);
    
  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));
    fireEvent.change(getByPlaceholderText(appointment,"Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    axios.put.mockRejectedValueOnce();
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment,"Error with saving, please go back"));
    fireEvent.click(getByAltText(appointment, "Close"));
    fireEvent.click(getByText(appointment, "Cancel"));
    expect(getByText(appointment, "Archie Cohen"));
  });
  
  it("shows the delete error when failing to delete an existing appointment", async () => {
    const { container, debug } = render(<Application />);
    axios.delete.mockRejectedValueOnce();
    
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
      );
      fireEvent.click(getByAltText(appointment, "Delete"));
      expect(getByText(appointment, "Are you sure you want to delete this appointment"));
      fireEvent.click(getByText(appointment, "Confirm"));
      expect(getByText(appointment, "Deleting"));
      await waitForElement(() => getByText(appointment, /Error with deleting, please go back/i));
      fireEvent.click(getByAltText(appointment, "Close"));
      fireEvent.click(getByText(appointment, "Cancel"));
    });
    
    