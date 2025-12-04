import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Login page as default route", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
});