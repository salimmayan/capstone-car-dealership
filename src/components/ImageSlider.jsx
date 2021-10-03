import React, { useState } from 'react';
// import { SliderData } from './SliderData';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import PropTypes from "prop-types";

function ImageSlider(props) {
    const [current, setCurrent] = useState(0);

    console.log("slideImages is");
    console.log(props.slideImages);

   
    const tempSliderData = [...props.slideImages.ImageURLs];

    const SliderData = tempSliderData.map((index) => {
        return {image: index.value};
    });
    console.log("SliderData is");
    console.log(SliderData); 

    const length = SliderData.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(SliderData) || SliderData.length <= 0) {
        return null;
    }  


    return (
        <section className='slider'>
            <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
            <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
            {SliderData.map((slide, index) => {
                console.log(slide.image);
                return (
                    <div
                        className={index === current ? 'slide active' : 'slide'}
                        key={index}
                    >
                        {index === current && (
                            <img src={slide.image} alt='Car image' className='image' />
                        )}
                    </div>
                );
            })}
        </section>
    );
};

ImageSlider.propTypes = {
    // carList: PropTypes.array,
    // carList: PropTypes.object,
    slideImages: PropTypes.object
  };

export default ImageSlider;
//type "rafce" to get this boiler plate