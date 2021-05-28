import React from 'react';
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { Card } from '..';
import paper from  '../../../img/paper.jpg';
import paper2 from  '../../../img/paper2.jpg';
import paper3 from  '../../../img/paper3.png';


const CarouselComponent = (props: any) => {

    const {} = props;
    var rows = [];

    for (var i = 0; i < 4 ; i++) {
      rows.push(<Card  isCarousel={true} className="carouselBox" img={i%2 === 0? paper:  i === 3? paper2 : paper3 } key={i} />);  
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