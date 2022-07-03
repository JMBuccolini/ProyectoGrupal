import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {FavContainer, FavDiv} from './Favoritos.module.css'
import {ItemsContainer_SingleItem, EliminarItem} from '../Cart/Cart.module.css'
import { DeleteFromFav } from '../../redux/actions/FavActions'
function Favoritos() {
    const dispatch= useDispatch()
    JSON.parse(localStorage.getItem('favs'));
    const FavState = useSelector(state=> state.FavReducer.Favs)
  return (
    <div className={FavContainer}>
        <div className={FavDiv}>
           <h1> Favoritos</h1>
           <hr />
           {
            FavState.length >0  ?
            
           <div>
                {
                FavState.map((e,i) => 
                <div className={ItemsContainer_SingleItem}  key={i}>
                    <img src ={e.thumbnail} alt={e.title}/>
                    <h1>{e.title}</h1>
                    <h2>${e.price}</h2>
                    <h2>{e.province}</h2>
                    {
                    e.freeShipping == true ? <h2>Envio Gratuito</h2> : null
                    }
                    {
                    e.condition == "new" ? <h2>Nuevo</h2> : <h2>Usado</h2>
                    }
                    <button className={EliminarItem} onClick={() => dispatch(DeleteFromFav(e.product))}>
                    Eliminar
                  </button>
                </div>) 
                }
           </div> : <img src="https://i.imgflip.com/6lodcg.jpg" alt="meme" /> 
           }
        </div>
    </div>
  )
}

export default Favoritos