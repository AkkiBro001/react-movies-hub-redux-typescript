import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./CarouselContainer.module.scss"
import Card from "../Card/Card";

function CarouselContainer(){

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 1920, min: 1440 },
    items: 6,
    slidesToSlide: 6
  },
  desktop: {
    breakpoint: { max: 1440, min: 786 },
    items: 5,
    slidesToSlide: 5
  },
  tablet: {
    breakpoint: { max: 786, min: 550 },
    items: 3,
    slidesToSlide: 3
  },
  mobile: {
    breakpoint: { max: 550, min: 0 },
    items: 3,
    slidesToSlide: 3
  }
};
return (
<div className={styles.carouselContainer}>
  <header>
    <h2>Populer</h2>
  </header>
<Carousel 
responsive={responsive}
removeArrowOnDeviceType={["tablet", "mobile"]}
>
  <Card/>
  <Card/>
  <Card/>
  <Card/>
  <Card/>
  <Card/>
  <Card/>
  <Card/>
  <Card/>
  <Card/>
  <Card/>
  <Card/>
  <Card/>
  <Card/>
  <Card/>
  <Card/>
  <Card/>
  <Card/>
  <Card/>
  <Card/>
  
  
</Carousel>
</div>
);
}

export default CarouselContainer;