import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../components/Login";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

// Mock axios
jest.mock("axios");

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Login Component", () => {
  test("renders all input fields and buttons", () => {
  renderWithRouter(<Login />);

  expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/Username\*/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password\*/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /signup/i })).toBeInTheDocument();
});

//   test("allows user to login successfully", async () => {
//     axios.post.mockResolvedValueOnce({
//       data: { token: "fake-jwt-token" },
//     });

//     renderWithRouter(<Login />);

//     fireEvent.change(screen.getByLabelText("Username*"), {
//       target: { value: "testuser" },
//     });
//     fireEvent.change(screen.getByLabelText("Password*"), {
//       target: { value: "12345" },
//     });

//     fireEvent.click(screen.getByText("Login"));

//     await waitFor(() =>
//       expect(localStorage.getItem("token")).toBe("fake-jwt-token")
//     );
//     expect(mockedNavigate).toHaveBeenCalledWith("/notes");
//   });

//   test("shows error alert on login failure", async () => {
//     axios.post.mockRejectedValueOnce({
//       response: { data: { message: "Invalid credentials" } },
//     });

//     jest.spyOn(window, 'alert').mockImplementation(() => {});

//     renderWithRouter(<Login />);

//     fireEvent.change(screen.getByLabelText("Username*"), {
//       target: { value: "wronguser" },
//     });
//     fireEvent.change(screen.getByLabelText("Password*"), {
//       target: { value: "wrongpass" },
//     });

//     fireEvent.click(screen.getByText("Login"));

//     await waitFor(() =>
//       expect(window.alert).toHaveBeenCalledWith("Invalid credentials")
//     );
//   });

//   test("navigates to register page", () => {
//     renderWithRouter(<Login />);

//     fireEvent.click(screen.getByText("Signup"));
//     expect(mockedNavigate).toHaveBeenCalledWith("/register");
//   });
});
