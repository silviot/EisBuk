import { calendarDaySelector } from "./selectors";

it("Selects the app date", () => {
  expect(calendarDaySelector({ app: { calendarDay: "foo" } })).toEqual("foo");
});
