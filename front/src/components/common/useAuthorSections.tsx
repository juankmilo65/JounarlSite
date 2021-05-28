import React from 'react'
import { Card, CarouselComponent } from '../core';
import paper from  '../../img/paper.jpg';
import paper2 from  '../../img/paper2.jpg';
import paper3 from  '../../img/paper3.png';

export default function AuthorSection() {

  var rows = [];

  for (var i = 0; i < 5; i++) {
    rows.push(<Card  isCarousel={false} className="box" img={i%2 === 0? paper:  i === 3? paper2 : paper3 } key={i} />);  
  }

    return (
        <>
          <CarouselComponent/> 
          <section className="documents">
                    {rows}      
          </section>
        </>
    )
}
