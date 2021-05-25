import React from 'react';
import paper from  '../../img/paper.jpg';
import { Subtitle } from '../core';
import '../../styles/articleDescription.css'


export default function useArticleDescription() {
    return (
        <div className="box">
            <img src={paper}  />
            <Subtitle value="Autor: JuanK."></Subtitle>
            <Subtitle value="Year: 2020-02-02"></Subtitle>
            <Subtitle value="Category: Technology"></Subtitle>
        </div>
    )
}
