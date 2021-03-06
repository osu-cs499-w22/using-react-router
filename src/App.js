import React from 'react';
import {
  Routes,
  Route,
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useParams
} from 'react-router-dom';

import './App.css';

const menu = {
  tacos: {
    name: "Tacos",
    image: "https://media.giphy.com/media/KfxPgR9Xb6lRvlFa8x/giphy.gif",
    description: "Shell + fillings",
    price: 5.95
  },
  pizza: {
    name: "Pizza",
    image: "https://media.giphy.com/media/VCDSo9xqCJOjC/giphy.gif",
    description: "Crust, sauce, cheese",
    price: 19.95
  },
  sushi: {
    name: "Sushi",
    image: "https://media1.tenor.com/images/a7087e13ce68524779c9b6946818986b/tenor.gif",
    description: "Raw fish + rice",
    price: 10.95
  }
};

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p><NavLink to="/home">Home</NavLink></p>
      <p><NavLink to="/people">People</NavLink></p>
      <p><NavLink to="/about">About</NavLink></p>
    </div>
  );
}

function About() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>About</h1>
      <p><Link to="/home">Home</Link></p>
      <p><Link to="/people">People</Link></p>
      <p><Link to="/about">About</Link></p>
      <button onClick={() => navigate("/home")}>
        Go home!
      </button>
    </div>
  );
}

function People() {
  return (
    <div>
      <h1>People</h1>
      <p><Link to="/home">Home</Link></p>
      <p><Link to="/people">People</Link></p>
      <p><Link to="/about">About</Link></p>
    </div>
  );
}

function Menu() {
  return (
    <div>
      <h1>Menu</h1>
      <ul>
        <li><Link to="">Specials</Link></li>
        {Object.entries(menu).map(([ key, value ]) => (
          <li key={key}><Link to={key}>{value.name}</Link></li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}

function Specials() {
  return <h1>Specials</h1>;
}

function NotFound() {
  return <h1>Not found</h1>;
}

function MenuItem() {
  const params = useParams();
  const menuItem = menu[params.menuItem];
  console.log("== params:", params);
  return (menuItem ? (
      <div>
        <h1>{menuItem.name} - {menuItem.price}</h1>
        <p>{menuItem.description}</p>
        <img src={menuItem.image} />
      </div>
    ) : <NotFound />
  );
}

/*
 * /photos/<id> -> /photos/12345, /photos/98765
 */

/*
 * /menu
 * /menu/specials
 * /menu/:menuItem
 */

 /*
  * /menu/specials
  *
  * <Menu>
  *   <Specials />
  * </Menu>
  */

  /*
   * /menu/pizza
   *
   * <Menu>
   *   <MenuItem />
   * </Menu>
   */

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/people" element={<People />} />
      <Route path="/menu" element={<Menu />}>
        <Route index element={<Specials />} />
        <Route path=":menuItem" element={<MenuItem />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
