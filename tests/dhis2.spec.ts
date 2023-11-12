import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

test.describe("All DHIS2 tasks implemented", () => {
  test("It should have a title", async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/DHIS2 Frontend Task/);
  });

  test("It should show the dashboards in a list of collapsible cards", async ({
    page,
  }) => {
    // Expect the collapsible to available
    await expect(page.getByRole("list")).toBeInViewport();
    // There should be five dashboard Items
    await expect(page.getByRole("listitem")).toHaveCount(5);
  });

  test("It should to “star” a dashboard and persist the starred states on reload", async ({
    page,
  }) => {
    // Expect the collapsible to available
    const secondDasboard = page.getByRole("list").getByRole("listitem").nth(1);
    // The dashboard should not be stared at first
    await expect(
      secondDasboard.getByTestId("star-button").getByTestId("un-stared"),
    ).toBeInViewport();

    // Click the the star button to star the dashboard
    await secondDasboard
      .getByTestId("star-button")
      .getByTestId("un-stared")
      .click();

    // The Dashboard should be stared
    await expect(
      secondDasboard.getByTestId("star-button").getByTestId("stared"),
    ).toBeInViewport();

    // Reload the page and make sure the dashboard star is persisted
    await page.reload();

    // The Dashboard star should persist after reload
    await expect(
      secondDasboard.getByTestId("star-button").getByTestId("stared"),
    ).toBeInViewport();
  });

  test("It should filter dashboard items of a certain type", async ({
    page,
  }) => {
    const selectOption = page.getByTestId("filter-type");
    // Select filter component should be in view
    await expect(selectOption).toBeInViewport();
    // Select dashboard of type Text
    await selectOption.click();
    // Find the option to select
    const optionToSelect = page.getByText("Text");
    // Text option should be visible
    await expect(optionToSelect).toBeInViewport();
    // Click the option to select it
    await optionToSelect.click();
    // Type of Text has only one dashboard item
    await expect(page.getByRole("listitem")).toHaveCount(1);
  });
});
