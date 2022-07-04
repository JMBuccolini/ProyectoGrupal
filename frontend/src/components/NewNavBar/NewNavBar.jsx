import { NavLink } from 'react-router-dom'
import {Nav, NavLinked,NavLinkActive, Bars, NavMenu, NavBtn,NavLinkBtn,Cart,cartIMG, DropdownA, datalist, LoginContainer,logo,NavContainer,searchdata, Publicar } from './NewNavBar.module.css'
import {FaBars} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import lupa from '../../assets/img/lupa.png'
import Favoritos from '../../assets/img/heart.png'
import mercado from '../../assets/img/logoOficial.png'
import {
  Navbar,
  Container,
  NavDropdown,
  Form,
  Button,
} from 'react-bootstrap';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  getProductByCategory,
  BuscarProducto,
  setActive,
} from '../../redux/actions';
import { setUser } from '../../redux/actions/userAction'
import EmptyCart from '../../assets/img/emptycart.png'
import cart from '../../assets/img/cartICON.png';
import { useState } from 'react';
import LoginButton from '../Auth0/login';
import LogoutButton from '../Auth0/logout';
import { useAuth0 } from '@auth0/auth0-react';

function NewNavBar(props) {
    let navigate = useNavigate();
    const dispatch = useDispatch();
  
    let productsCache = [
      ...useSelector((state) => state.productReducer.allProductCache).map(
        (e) => e.title
      ),
    ];

    const [display, setDisplay] = useState([...productsCache]);
    const [displayFlag, setDisplayFlag] = useState(false);
    const [togglemenu, settogglemenu] = useState(false)
    const [screen, setscreen] = useState(window.innerWidth)
    const CartState = useSelector(state => state.CartReducer.cart.cartItem)
    const [search, setSearch] = useState('');
  
    const categories = useSelector((state) => state.productReducer.categories);
    const userLogged = useSelector((state) => state.userReducer.user)
    const { user, isAuthenticated, isLoading } = useAuth0();
    const toggleNav = () =>{
        settogglemenu(!togglemenu)
    }

  useEffect(()=> {
    const changeWidth = () =>{
      setscreen(window.innerWidth)
    }
    window.addEventListener("resize", changeWidth)
  }, [])

    useEffect(() => {
      user?dispatch(setUser(user)):null
    },[user])
  
    const searchOnSubmit = (e) => {
      e.preventDefault();
      navigate('/');
      props.scrollTo();
      dispatch(setActive(1));
      dispatch(BuscarProducto(search));
    };
  
    function searchOnChange(e) {
      setSearch(e.target.value);
      setDisplay([...productsCache]);
      setDisplay([
        ...productsCache.filter((e) =>
          e.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        ),
      ]);
      e.target.value && setDisplayFlag(true);
      !e.target.value && setDisplayFlag(false);
    }
  
    const handleOnSelectCategory = (e, name) => {
      e.preventDefault();
      window.scrollTo(0, 650);
      navigate('/');
      dispatch(setActive(1));
      dispatch(getProductByCategory(name));
    };
    function refreshPage(e) {
      e.preventDefault();
      navigate('/');
    }
  
  return (
    <div className={NavContainer}>
        <nav className={Nav}>
            <NavLink className={NavLinked} onClick={(e) => 
                {refreshPage(e);
                }} to="/" ActiveClassname={NavLinkActive}>
            <img src={mercado} />
          </NavLink>
          <div onClick={toggleNav} className={Bars}>
            <FaBars/> 
          </div>

        {    (togglemenu || screen >768) && (
            <div className={NavMenu}>
            <NavDropdown title="Categorías" id="navbarScrollingDropdown">
                {categories?.map((category) => {
                    return (
                    <NavDropdown.Item
                        key={category.id}
                        className={DropdownA}
                        onClick={(e) => handleOnSelectCategory(e, category.name)}
                        href="#"
                    >
                        {category.name}
                    </NavDropdown.Item>
                    );
                })}
                </NavDropdown>
            <div className={searchdata}>
                <Form className="d-flex" onSubmit={(e) => searchOnSubmit(e)}>
                    <input
                    type="text"
                    className={datalist}
                    placeholder="...buscar"
                    list="data"
                    onChange={(e) => searchOnChange(e)}
                    />
                    <datalist id="data">
                    {display.map((item, key) => (
                        <option key={key} value={item} />
                        ))}
                    </datalist>
                    <Button type="submit" variant="outline-success">
                    <img src={lupa} />
                    </Button>
                </Form>
            </div>
                <NavLink to="/cart" ActiveClassname={NavLinkActive}>
                {
                CartState.length > 0 ? <div className={Cart}>
                  <img className={cartIMG} src={cart} alt="cart" />
                  <h6>{CartState.length}</h6>
                </div> :
                  <img className={cartIMG} src={EmptyCart} alt="cart" />
                }   
                </NavLink>
                {
                    isAuthenticated ? (<Link to="/favoritos"><img className={cartIMG} src={Favoritos} alt="favoritos" /></Link>) : null
                }
          {isAuthenticated ? (
          <div className={LoginContainer}>
            <div >
              <NavDropdown title={user.nickname}>
                {userLogged?.email_verified ? (
                  <div>
                    <NavDropdown.Item onClick={() => navigate("/favoritos")}>Favoritos</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigate("/shipping")}>Shipping</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigate("/publicar")}>Publica tu producto</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigate("/perfil")}>Perfil</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <LogoutButton />
                  </div>
                ) : (                  
                  <p>please verify you email </p>
                )}
              </NavDropdown>
            </div>
            <Container>
              <Link to="/">
                <img className={logo} src={user.picture} />
              </Link>
            </Container>
          </div>
        ) : (
          <LoginButton />
        )}

        </div>)}
    
    </nav>
</div>
  )
}

export default NewNavBar