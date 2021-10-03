import React, { useState } from 'react';
// import { SliderData } from './SliderData';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import PropTypes from "prop-types";

function ImageSlider(props) {
    const [current, setCurrent] = useState(0);

    console.log("slideImages is");
    console.log(props.slideImages);
    // alert(props.selectedCar);

    // const length2 = props.selectedCar.ImageURLs[].length;
    // console.log(length2);
    // const SliderData = Array.from(props.selectedCar.ImageURLs);
    // console.log("SliderData is");
    // console.log(SliderData);


    // props.selectedCar.ImageURLs[0].value
    const SliderData = [
        {
            // image: props.selectedCar.ImageURLs[0].value
            image: props.slideImages.ImageURLs[0].value
        },
        {
            image: props.slideImages.ImageURLs[1].value
        },
        {
            image: props.slideImages.ImageURLs[2].value
        },
        {
            image: props.slideImages.ImageURLs[3].value
        },
        {
            image: props.slideImages.ImageURLs[4].value
        },
    ];
    const SliderData2 = [
        {
            image:
                'https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        },
        {
            image:
                'https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1489&q=80'
        },
        {
            image:
                'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'
        },
        {
            image:
                'https://images.unsplash.com/photo-1475189778702-5ec9941484ae?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80'
        },
        {
            image:
                'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'
        }
    ];
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
                            //   <img src={props.selectedCar.ImageURLs[1].value} alt="" className="image"></img>
                            // <img src={slide.image} alt='Car image' className='image' />
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