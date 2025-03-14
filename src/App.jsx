import './App.css';
import { Landing } from './componennts/main-page';
import { Cart } from './componennts/enpty-cart';
import { Order } from './componennts/order';
import Confirm from './componennts/Confirm';
import { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  const cartRef = useRef(null);
  const [cartItems, setCartItems] = useState([]);
  const [removedItems, setRemovedItems] = useState([]);
  const [counts, setCounts] = useState({});
  const [opacity, setOpacity] = useState(0); 
  const [confirmOpacity, setConfirmOpacity] = useState(0);  

  const handleVisibility = (newOpacity) => {
    setOpacity(newOpacity);
  };

  const setOpacityForConfirm = (newOpacity) => {
    setConfirmOpacity(newOpacity);
  };

  const addToCart = (item) => {
    if (removedItems.includes(item.name)) {
      setCounts((prevCounts) => ({
        ...prevCounts,
        [item.name]: 1,
      }));
      setRemovedItems((prevRemovedItems) =>
        prevRemovedItems.filter((removedItem) => removedItem !== item.name)
      );
    } else {
      setCounts((prevCounts) => ({
        ...prevCounts,
        [item.name]: (prevCounts[item.name] || 0) + 1,
      }));
    }

    setCartItems((prevItems) => [...prevItems, item]);
  };

  const updateItemCount = (itemName, countChange) => {
    setCounts((prevCounts) => {
      const currentCount = prevCounts[itemName] || 1;
      const newCount = currentCount + countChange;
      return {
        ...prevCounts,
        [itemName]: Math.max(newCount, 1),
      };
    });
  };

  const removeItem = (itemName) => {
    setCartItems((prevCartItems) => prevCartItems.filter(item => item.name !== itemName));
    setRemovedItems((prevRemovedItems) => [...prevRemovedItems, itemName]);

    setCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts };
      delete updatedCounts[itemName];  
      return updatedCounts;
    });
  };

  const calculateTotalItems = () => {
    return Object.keys(counts).reduce((acc, itemName) => acc + counts[itemName], 0);
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      const itemCount = counts[item.name] || 1;
      return acc + item.price * itemCount;
    }, 0);
  };

  const total = calculateTotal();
  const totalItems = calculateTotalItems();   
  const totalString = `Your Cart (${totalItems})`;  

  useEffect(() => {}, [cartItems, counts]);

  return (
    <Router>
      <div style={{ position: 'relative', minHeight: '100vh' }}>       
        {opacity > 0 && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: `rgba(0, 0, 0, ${opacity})`, 
              zIndex: 10, 
              pointerEvents: 'none',  
            }}
          ></div>
        )}
        
        <h1 style={{ textAlign: 'left', fontSize: '45px', fontFamily: 'Oswald', fontWeight: '900' }}>
          Desserts
        </h1>
        
        <Routes> 
          <Route path="/" element={
            <Order
              cartItems={cartItems}
              counts={counts}
              totalString={totalString}
              total={total}
              removeItem={removeItem}
              removedItems={removedItems}
              setOpacity={handleVisibility}
              setOpacityForConfirm={setOpacityForConfirm}  
            />
          } /> 
          <Route path="/confirm" element={
            <Confirm
              cartItems={cartItems}
              counts={counts}
              totalString={totalString}
              total={total}
              adding to the Confirm component
            />
          } />
        </Routes>
        
        <Landing
          cartRef={cartRef}
          addToCart={addToCart}
          updateItemCount={updateItemCount}
          removeItem={removeItem}
          removedItems={removedItems}
          cartItems={cartItems}
          counts={counts}
          opacity={opacity}
        />
        
        <Cart
          ref={cartRef}
          cartItems={cartItems}  
          counts={counts}        
          removeItem={removeItem} 
        />
      </div>
    </Router>
  );
}
