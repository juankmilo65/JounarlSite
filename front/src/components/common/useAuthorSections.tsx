import React from 'react'
import { Card, CarouselComponent } from '../core';

export default function AuthorSection() {

  var rows = [];

  for (var i = 0; i < 5; i++) {
    rows.push(<Card  isCarousel={false} className="box" key={i} />);  
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
