import React, { useEffect, useState } from "react";
import Tesseract from 'tesseract.js';

const Translate = props => {
    const [caption, setCaption] = useState("");
    const image = props.image ? props.image : 'https://tesseract.projectnaptha.com/img/eng_bw.png';
    useEffect(() => {
        Tesseract.recognize(
            image,
            'eng',
            { logger: m => console.log(m) }
        )
            .then(({ data: { text } }) => {
                setCaption(text);
            })
    }, [image])
    return (
        <div className="container">
            <img className="img-fluid" src="https://tesseract.projectnaptha.com/img/eng_bw.png"></img>
            <figcaption>{caption}</figcaption>
        </div>);
}
export default Translate;