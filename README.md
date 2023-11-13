> Unfortunately unable to share the API url

# Instructions

To check the application, clone the repo, `cd` into the project and run the following:

```bash
npm install
npm run dev
```

Then you get the following:

```text
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://xxx.xxx.x.xxx:5173/
```

Use the network url to check the site on your mobile device

# Frontend stack

- Typescript
- React
- Graphql 


# User stories:

- [x] See a list of ballons:
  - [x] Balloons list should be paginated
  - [x] Balloons list should be filterable by color and variant
  - [x] Balloons list should be sortable by price and availiblity date
  - [x] Should be able to add a balloon to the cart
- [x] See details of a specific balloon where they can add balloon to cart with specified quantity
- [x] Open the cart and:
  - [x] See list of all previously added items with desired quantity
  - [x] Change quantity
  - [x] Be able to remove an item from the cart
  - [x] See total cost
  - [x] Checkout
- [x] Access the shop on a mobile device and have a smooth experience doing so

# Thoughts:

- **Quantity 0:** I've been trying to see what other e-commerce websites do when the quantity is set to zero. It seems like some apps don't allow the quantity to be less than 1, some of them automatically remove the item when the quantity is decreased to 0. While many strategies are valid and this decision is probably a business decision rather than a technical one, I decided to keep the item in the cart even when the item quantity is 0, reason being I might want to check what would the total be if I decide to exclude an item, but the decision of excluding it has not been made yet! There is a `remove` button for that.

- **Data integrity:** Whenever the Cart component is rendered, the app verifies the price stored in the localstorage/cart state with the backend data to make sure that we have the updated price and to secure the application against any price manipulation in the localstorage. Trying to change the price value in localstorage will have no impact. This is just an extra layer of security since most main checking will be done on the backend.

- **Query strings:** Added `variant`, `color`, `sort` and pagination values to the url to provide a stateful experience across different tabs/browsers and allow link sharing.
