import { Link } from 'react-router-dom';

export const Order = ({
  cartItems,
  setConfirmOpacity,
  counts,
  totalString,
  total,
  setOpacity,
  removeItem,
  removedItems = [],
}) => {
  const handleCompleteOrder = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('counts', JSON.stringify(counts));
    localStorage.setItem('totalString', totalString);
    localStorage.setItem('total', total);
    setOpacity(0.4);
  };

  // Check if all items have been removed to conditionally hide carbon-neutral message
  const isCartEmpty = cartItems.filter(item => !removedItems.includes(item.name)).length === 0;

  return (
    <div className="order">
      <h1
        className="total"
        style={{
          color: 'chocolate',
          textAlign: 'left',
          marginLeft: '25px',
          fontWeight: 'bolder',
          fontFamily: 'Roboto',
        }}
      >
        {totalString}
      </h1>

      <div>
        {cartItems.length === 0 ? (
          <p style={{ marginRight: '100px', fontSize: '12px' }}>
            <img
              style={{ marginLeft: '80px' }}
              src="src/assets/images/illustration-empty-cart.svg"
              alt="Empty cart"
            />
          </p>
        ) : (
          cartItems.map((item, index) => {
            const sanitizedID = item.name.replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            const itemCount = counts[item.name] || 1;
            const isRemoved = removedItems.includes(item.name);

            return (
              <div key={sanitizedID}>
                <h3
                  style={{
                    textAlign: 'left',
                    marginLeft: '25px',
                    fontSize: '16px',
                    lineHeight: '20%',
                  }}
                >
                  <p>{item.name}</p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '27px',
                      gap: '10px',
                      fontSize: '16px',
                    }}
                  >
                    <p style={{ color: 'rgb(216, 90, 0)', fontWeight: 'bolder', margin: '0 0px' }}>
                      {itemCount}x
                    </p>
                    <p style={{ textAlign: 'center', color: 'grey', margin: '0 0px' }}>
                      @ ${item.price}
                    </p>
                    <p style={{ color: 'grey', fontWeight: 'bolder', margin: '0 0px' }}>
                      ${item.price * itemCount}
                    </p>
                  </div>

                  <img
                    src="src/assets/images/icon-remove-item.svg"
                    onClick={() => {
                      removeItem(item.name);
                    }}
                    style={{
                      width: '14px',
                      border: '1px solid grey',
                      cursor: 'pointer',
                      borderRadius: '10px',
                      marginLeft: '270px',
                      marginTop: '-12px',
                    }}
                  />
                </h3>
                <hr
                  style={{
                    width: '86%',
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    fontWeight: 'light',
                    border: 'none',
                    height: '2px',
                  }}
                />
              </div>
            );
          })
        )}

        {cartItems.length > 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              marginTop: '-20px',
            }}
          >
            <p style={{ marginLeft: '27px' }}>Order Total</p>
            <p
              style={{
                fontSize: '30px',
                textAlign: 'right',
                marginRight: '25px',
                fontWeight: 'bold',
              }}
            >
              ${total}
            </p>
          </div>
        )}

        {/* Conditionally render the carbon-neutral message based on cart being empty */}
        {!isCartEmpty && (
          <div
            style={{
              backgroundColor: 'rgb(245, 240, 231)',
              display: 'flex',
              justifyContent: 'center',
              marginTop: '-10px',
              alignItems: 'center',
              width: '90%',
              gap: '8px',
              marginLeft: '20px',
              borderRadius: '10px',
            }}
          >
            <img src="src/assets/images/icon-carbon-neutral.svg" alt="Carbon Neutral" />
            <p>
              This is a <strong>carbon-neutral</strong> delivery
            </p>
          </div>
        )}

        {cartItems.length > 0 && (
          <Link to="/confirm">
            <button
              className="cmb"
              onClick={handleCompleteOrder}
              style={{
                backgroundColor: 'rgb(216, 90, 0)',
                color: 'white',
                fontSize: '16px',
                padding: '15px 100px',
                borderRadius: '20px',
                cursor: 'pointer',
                borderColor: 'none',
                marginTop: '18px',
                border: 'none',
                height: '52px',
                marginBottom: '16px',
              }}
            >
              Complete Order
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};
