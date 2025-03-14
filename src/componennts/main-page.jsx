import { useState, useEffect } from "react";
import axios from "axios";

export function Landing({ addToCart, removeFromCart, cartRef, opacity, updateItemCount, cartItems = [] }) {
  const [items, setItems] = useState([]);
  const [counts, setCounts] = useState({});
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios
      .get("/public/data.json")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const sanitizeID = (id) => {
    return id.replace(/\s+/g, '-').replace(/[^\w-]/g, ''); // Replace spaces and remove invalid characters
  };

  const Press = (itemID) => {
    const sanitizedID = sanitizeID(itemID); 
    setSelected(sanitizedID);

    const button = document.querySelector(`#button-${sanitizedID}`);
    const plus_minus = document.querySelector(`#bt-2-${sanitizedID}`);
    const orderCart = document.querySelector('.order');
    orderCart.style.display = 'block';

    if (button && plus_minus) {
      button.style.display = "none";  
      plus_minus.style.display = "inline-flex";
    }

    if (cartRef.current) {
      cartRef.current.style.display = "none"; 
    }

    const item = items.find((item) => item.name === itemID);

    if (item) {
      addToCart(item);  
      setCounts((prevCounts) => ({
        ...prevCounts,
        [item.name]: 1, 
      }));
    }
  };

  const handleChange = (operation, itemName) => {
    setCounts((prevCounts) => {
      const currentCount = prevCounts[itemName] || 1;
      const newCount = operation === "add" ? currentCount + 1 : Math.max(currentCount - 1, 1);
      return {
        ...prevCounts,
        [itemName]: newCount,
      };
    });
    updateItemCount(itemName, operation === "add" ? 1 : -1);
  };

  const isItemInCart = (itemName) => {
    return cartItems.some((item) => item.name === itemName);
  };

  const removeItem = (itemName) => {
    const item = items.find((i) => i.name === itemName);
    removeFromCart(item);

    setCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      delete newCounts[itemName];  
      return newCounts;
    });

    const sanitizedID = sanitizeID(itemName);
    const button = document.querySelector(`#button-${sanitizedID}`);
    const plus_minus = document.querySelector(`#bt-2-${sanitizedID}`);
    const image = document.querySelector(`#img-${sanitizedID}`);

    if (image) {
      image.style.border = "none";
    }

    if (button && plus_minus) {
      button.style.display = "block";  
      plus_minus.style.display = "none"; 
    }
  };

  return (
    <div className="container" style={{ zIndex: 1 }}>
      {items.map((item) => {
        const sanitizedID = sanitizeID(item.name);
        const isSelected = sanitizedID === selected;
        const itemCount = counts[item.name] || 1; // Ensure count is 1 when no count exists

        return (
          <div key={sanitizedID} className="item">
            <img
              id={`img-${sanitizedID}`}  
              src={item.image.desktop}
              alt={item.name}
              className="itemimg"
              style={{
                border: isItemInCart(item.name) ? "3px solid orange" : "none", 
              }}
            />
            
            {isItemInCart(item.name) ? (
              <a
                className="bt"
                id={`button-${sanitizedID}`}
                style={{ display: "none" }} 
              >
                <img
                  className="cart-icon"
                  src="src/assets/images/icon-add-to-cart.svg"
                />
                Added to Cart
              </a>
            ) : (
              <a
                onClick={() => Press(item.name)}
                className="bt"
                id={`button-${sanitizedID}`}
              >
                <img
                  className="cart-icon"
                  src="src/assets/images/icon-add-to-cart.svg"
                />
                Add to Cart
              </a>
            )}

            {isItemInCart(item.name) && (
              <a id={`bt-2-${sanitizedID}`} className="bt-2" href="#" style={{ display: "inline-flex" }}>
                <span className="minus" onClick={() => handleChange("sub", item.name)}>-</span>
                <span className="number">{itemCount}</span>
                <span className="plus" onClick={() => handleChange("add", item.name)}>+</span>
              </a>
            )}

            <div style={{ textAlign: "left", lineHeight: '43%' }}>
              <p style={{ color: 'grey' }}>{item.category}</p>
              <p className="title" style={{ color: "black", fontWeight: 'bold', fontSize: '19px' }}>
                {item.name}
              </p>
              <p className="price" style={{ color: "#FF8C00", fontWeight: 'bold', fontSize: '19px' }}>
                ${item.price}
              </p>
            </div>  
          </div>
        );
      })}
    </div>
  );
}
