import { useState } from "react";
import NavbarStyle from "./Navbar.module.css";
import { useEffect } from "react";

const url = "";
function Navbar() {
  const [menueItems, setMenueItems] = useState([]);
  const [toggleMenueBetweenViews, setToggleMenueBetweenViews] = useState(false);
  async function loadMenueItems() {
    try {
      const response = await fetch(url, {});
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      setMenueItems(data.record.menue);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    loadMenueItems();
  }, []);

  useEffect(() => {
    const resizeFn = () => {
      if (window.innerWidth > 768) {
        setToggleMenueBetweenViews(true);
      } else {
        setToggleMenueBetweenViews(false);
      }
    };

    window.addEventListener("resize", resizeFn);

    () => window.removeEventListener("resize", resizeFn);
  }, []);

  return (
    <div className={NavbarStyle.parent}>
      <header className={NavbarStyle.mainHead}>
        <nav className={NavbarStyle.mainHead__nav}>
          <div className={NavbarStyle.logo}>
            <h1>Traverlly</h1>
          </div>

          <svg
            onClick={() => {
              setToggleMenueBetweenViews((prev) => !prev);
            }}
            width="50px"
            viewBox="0 0 15 15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#fff"
              d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
            />
          </svg>

          {toggleMenueBetweenViews && (
            <ul>
              {menueItems?.map((item) => (
                <MenueItem key={item.id} item={item} />
              ))}
            </ul>
          )}
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
