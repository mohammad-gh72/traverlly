import { useState } from "react";
import NavbarStyle from "./Navbar.module.css";
import { useEffect } from "react";
const url = "http://localhost:9000/menue";
function Navbar() {
  const [menueItems, setMenueItems] = useState([]);

  async function loadMenueItems() {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      setMenueItems(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    loadMenueItems();
  }, []);

  return (
    <div>
      <header className={NavbarStyle.mainHead}>
        <nav className={NavbarStyle.mainHead__nav}>
          <div className={NavbarStyle.logo}>
            <h1>Traverlly</h1>
          </div>
          <ul>
            {menueItems?.map((item) => (
              <MenueItem key={item.id} item={item} />
            ))}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;

function MenueItem({ item }) {
  return (
    <a href={"#" + item.linkto}>
      <li>{item.name}</li>
    </a>
  );
}
