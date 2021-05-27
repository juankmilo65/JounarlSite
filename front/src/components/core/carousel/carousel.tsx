import React from 'react';
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { Card } from '..';


const CarouselComponent = (props: any) => {

    const {} = props;
    var rows = [];

    for (var i = 0; i < 4 ; i++) {
      rows.push(<Card  isCarousel={true} className="carouselBox" key={i} />);  
    }

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
            {rows}
          </Carousel>
         </>
    )
}

export default CarouselComponent