import React from 'react';
//import { Carousel } from 'react-bootstrap';

const ImmaginiCarousel = () => { // Rinominato per evitare conflitti

  const immagini = [{
    titolo: "niggio1",
    src: "../public/milan.jpg",
    alt : "First slide"
  }, {
    titolo: "niggio2",
    src: "../public/sciarpe-galatasaray.jpg",
    alt : "Second slide",
  }, {
    titolo: "niggio3",
    src: "../public/foto-bayern.jpeg",
    alt: "Third slide",
  }];

  return (
    <Carousel>
      {immagini.map((img) => (
        <Carousel.Item key={img.titolo}> {/* Aggiunto key per migliorare le performance */}
          <img
            className="d-block w-100"
            src={img.src}
            alt={img.alt}
          />
          <Carousel.Caption>
            <h3>{img.titolo}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImmaginiCarousel;
