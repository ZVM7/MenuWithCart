import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Confirm = () => {
  const [cartData, setCartData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const counts = JSON.parse(localStorage.getItem('counts'));
    const totalString = localStorage.getItem('totalString');
    const total = parseFloat(localStorage.getItem('total'));

    if (cartItems && counts && totalString && total) {
      setCartData({ cartItems, counts, totalString, total });
    }
  }, []);

  const handleStartNewOrder = () => {
    navigate('landing');
  };

  if (!cartData) {
    return <div>No order details found.</div>;
  }

  const { cartItems, counts, totalString, total } = cartData;

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 20,
        padding: '20px',
        borderRadius: '10px',
        width: '30%',
        maxHeight: '90%', 
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden', 
        height: 'auto', 
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',
          marginLeft: '10px',
          marginBottom: '20px',
        }}
      >
        <img
          src="src\assets\images\icon-order-confirmed.svg"
          style={{ width: '10%', marginBottom: '10px' }}
          alt="Order Confirmed"
        />
        <h1 style={{ margin: 0 }}>Order Confirmed</h1>
        <p style={{ marginTop: '5px', color: 'grey', fontSize: '13px' }}>
          We hope you enjoy your food!
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '0',
          margin: '0',
          backgroundColor: 'rgb(245, 240, 231)',
          borderRadius: '10px',
          flexGrow: 1, 
        }}
      >
        {cartItems.length === 0 ? (
          <p>No items in your order.</p>
        ) : (
          cartItems.map((item, index) => {
            const itemCount = counts[item.name] || 1;
            return (
              <div
                style={{
                  backgroundColor: 'rgb(245, 240, 231)', // Keeps the same background color as the parent container
                  borderRadius: '10px',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'row',
                  marginLeft: '8px',
                  marginBottom: '10px',
                  alignItems: 'center',
                  padding: '10px',
                }}
                key={index}
              >
                <img
                  src={item.image.thumbnail}
                  style={{
                    width: '12%',
                    marginRight: '15px',
                    borderRadius: '5px',
                  }}
                  alt={item.name}
                />

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: '1',
                  }}
                >
                  <p
                    style={{
                      fontWeight: 'bold',
                      textAlign: 'left',
                      whiteSpace: 'nowrap',
                      marginRight: '15px',
                      marginTop: '0',
                    }}
                  >
                    {item.name}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '10px',
                    }}
                  >
                    <p
                      style={{
                        color: 'rgb(216, 90, 0)',
                        fontWeight: 'bold',
                        textAlign: 'left',
                        margin: '0',
                      }}
                    >
                      {itemCount}x
                    </p>

                    <p
                      style={{
                        textAlign: 'center',
                        margin: '0',
                        color: 'grey',
                      }}
                    >
                      @ ${item.price}
                    </p>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    textAlign: 'right',
                    margin: '0',
                    marginRight: '10px',
                    flex: '1',
                  }}
                >
                  ${itemCount * item.price}
                </p>
              </div>
            );
          })
        )}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'rgb(245, 240, 231)', 
          padding: '10px',
          borderRadius: '10px',
          marginTop: '0px',
        }}
      >
        <p
          style={{
            marginLeft: '5px',
            margin: '0',
            padding: '0',
          }}
        >
          Order Total
        </p>
        <p
          style={{
            fontSize: '27px',
            fontWeight: 'bolder',
            textAlign: 'right',
            marginTop: '10px',
            marginRight: '5px',
            marginBottom: '10px',
            margin: '0',
            padding: '0',
          }}
        >
          ${total}
        </p>
      </div>

      <a
        href="/"
        style={{
          backgroundColor: 'rgb(216, 90, 0)',
          color: 'white',
          textDecoration: 'none',
          padding: '15px 100px',
          borderRadius: '20px',
          cursor: 'pointer',
          borderColor: 'none',
          border: 'none',
          marginTop: '11px',
          marginBottom:'5px',
        }}
      >
        Start New Order
      </a>
    </div>
  );
};

export default Confirm;
