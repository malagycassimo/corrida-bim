"use client";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll, { AutoScrollOptionsType } from "embla-carousel-auto-scroll";
import "./embla.css";
import { CarouselImageProps } from "@/utils/assets";
import Image from "next/image";
type PropType = {
    slides: CarouselImageProps[];
    options?: EmblaOptionsType;
    autoScrollOptions?: AutoScrollOptionsType;
};

const Carousel: React.FC<PropType> = (props) => {
    const { slides, options, autoScrollOptions = {} } = props;
    const [emblaRef] = useEmblaCarousel(options, [
        AutoScroll({ playOnInit: true, speed: 0.5, ...autoScrollOptions }),
    ]);

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map(({ src, alt }, idx) => (
                        <div className="embla__slide relative" key={idx}>
                            <Image
                                alt={alt}
                                src={src}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
