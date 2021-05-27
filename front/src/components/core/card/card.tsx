import React from 'react'
import { Content, Subtitle } from '..'
import paper from  '../../../img/paper.jpg';
import { ICard } from '../../../interfaces/Core';
import './card.css'

const Card = (props:ICard) => {

const { className, isCarousel} = props;

    return (
        <div className={className}>
        <img src={paper}  />
        {isCarousel ?
        <>
         <Subtitle value="Beauty Ttle"></Subtitle>
        </>:
        <>
        <Subtitle value="Big Title bigger than big, because big is big"></Subtitle>
        <Content value="Autor: JuanK."></Content>
        <Content value="Year: 2020-02-02"></Content>
        </>
        }
        
    </div>
    )
}

export default Card