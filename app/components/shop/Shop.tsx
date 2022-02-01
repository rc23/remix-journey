import type { LoaderData, Order } from "app/routes/shop";

type HashedData = {
  [index: number]: string[];
  grandTotal: number;
};

export default function Shop(data: LoaderData) {
  let { orders, prices } = data;

  const renderOrders = () =>
    orders.map((order) => (
      <div key={`order-${order.orderId}`} className="order">
        <div>User - {order.userId}</div>
        <div>Date - {new Date(order.date).toUTCString()}</div>
        <div>
          Products -{" "}
          {order.products.map((product, i) => (
            <span key={`product-${i}`}>{product} </span>
          ))}
        </div>
      </div>
    ));

  const renderPrices = () =>
    Object.entries(prices).map((price, i) => (
      <h5 key={i}>
        <span>
          {price[0]} - {price[1]}
        </span>
      </h5>
    ));

  const renderGrandTotal = () => {
    let hashedData: HashedData = {
      grandTotal: 0,
    };

    orders.forEach((order: Order) => {
      hashedData[order.userId] = hashedData[order.userId]
        ? hashedData[order.userId].concat(order.products)
        : order.products;
    });

    Object.entries(hashedData).forEach((x) => {
      let products = x[1];

      if (Array.isArray(products)) {
        let tNrOfSodas = products.filter(
          (product) => product === "soda"
        ).length;
        let tNrOfPopcorn = products.filter(
          (product) => product === "popcorn"
        ).length;

        let bundleTotal = 0;
        let nrOfBundles = 0;

        if (tNrOfSodas > tNrOfPopcorn) {
          let remainingSodas = tNrOfSodas - tNrOfPopcorn;
          bundleTotal += remainingSodas * prices.soda;
          nrOfBundles = tNrOfSodas - remainingSodas;
        }

        if (tNrOfPopcorn > tNrOfSodas) {
          let remainingPopcorn = tNrOfPopcorn - tNrOfSodas;
          bundleTotal += remainingPopcorn * prices.popcorn;
          nrOfBundles = tNrOfPopcorn - remainingPopcorn;
        }

        bundleTotal += nrOfBundles * prices.bundle;

        hashedData.grandTotal = hashedData.grandTotal
          ? hashedData.grandTotal + bundleTotal
          : bundleTotal;
      }
    });

    return (
      <h5>
        <span>Grand Total: {hashedData.grandTotal}</span>
      </h5>
    );
  };

  return (
    <div className="container">
      <h1>Shop</h1>
      {renderPrices()}
      {renderOrders()}
      {renderGrandTotal()}
    </div>
  );
}
