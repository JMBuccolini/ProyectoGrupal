import Carousel from 'react-bootstrap/Carousel';
import samsung from '../../assets/img/banners/samsung.jpeg'
import ps5 from '../../assets/img/banners/ps5.png'
import apple2 from '../../assets/img/banners/iphone.jpg'
import samsung2 from '../../assets/img/banners/samsung2.jpg'
import {CarouselContainer, Text} from './Carousel.module.css'
function Carousell() {
  return (
<div className={CarouselContainer}>
    <Carousel>
      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100 h-300px"
          src={ps5}
          alt="First slide"
          />
        <Carousel.Caption className={Text}>
          <h3>Samsung Galaxy</h3>
          <p>Descubre la nueva familia Galaxy</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100 h-300px"
          src={apple2}
          alt="third slide"
          />
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100 h-300px"
          src={samsung2}
          alt="four slide"
          />
      </Carousel.Item>
    </Carousel>
</div>
  );
}

export default Carousell;