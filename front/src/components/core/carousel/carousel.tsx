import React from 'react';
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { Card } from '..';


const CarouselComponent = (props: any) => {

    const {} = props;
    return (
         <>
          <Carousel
            plugins={[
              'infinite',
              'arrows',
              {
                resolve: slidesToShowPlugin,
                options: {
                numberOfSlides: 4
                }
              },
            ]}
          >
         <Card className="carouselBox" />
         <Card className="carouselBox" />
         <Card className="carouselBox" />
         <Card className="carouselBox" />
          </Carousel>
         </>
    )
}

export default CarouselComponent