"use client";

import { useEffect, useState } from "react";
import styles from "../page.module.css";
import {
  Button,
  FluentProvider,
  Image,
  teamsLightTheme,
} from "@fluentui/react-components";
import {
  ArrowCircleLeft48Regular,
  ArrowCircleRight48Regular,
} from "@fluentui/react-icons";

const Carousel = () => {
  let [counter, setCounter] = useState(1);
  let [imagesrc, setImagesrc] = useState("/cities_pixel.jpg");
  let [text, setText] = useState(`${counter}`);

  useEffect(() => {
    handleCarouselChange();
  }, [counter]);

  const handleLeftClick = () => {
    if (counter != 1) {
      setCounter(counter - 1);
    }
  };

  const handleRightClick = () => {
    if (counter != 3) {
      setCounter(counter + 1);
    }
  };

  const handleCarouselChange = () => {
    switch (counter) {
      case 1:
        setImagesrc("/cities_pixel.jpg");
        setText(`${counter}`);
        break;
      case 2:
        setImagesrc("/monopoly.jpeg");
        setText(`${counter}`);
        break;
      case 3:
        setImagesrc("/business.jpeg");
        setText(`${counter}`);
        break;
    }
  };

  const Dots = () => {
    const divs = [];

    for (let i = 1; i <= 3; i++) {
      divs.push(
        <div
          key={i}
          style={{
            width: "5px",
            height: "5px",
            margin: "5px",
            border: "solid",
            backgroundColor: `${i === counter ? "black" : "white"}`,
            borderRadius: "50%",
          }}
        ></div>,
      );
    }

    return (
      <div
        className={styles.flexcontainer}
        style={{ justifyContent: "center", marginTop: "20px" }}
      >
        {divs}
      </div>
    );
  };

  return (
    <>
      <FluentProvider theme={teamsLightTheme}>
        <div>
          <div
            className={styles.flexcontainer}
            style={{ justifyContent: "center" }}
          >
            <div style={{ opacity: `${counter === 1 ? "0.6" : "1"}` }}>
              <Button
                icon={<ArrowCircleLeft48Regular />}
                onClick={handleLeftClick}
                style={{ border: "none" }}
              ></Button>
            </div>
            <div
              className={styles.flexcontainer}
              style={{ flexDirection: "column", margin: "20px" }}
            >
              <div style={{ height: "250px", width: "250px" }}>
                <Image
                  src={imagesrc}
                  fit="cover"
                  shape="circular"
                  height="50px"
                />
              </div>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                {text}
              </div>
            </div>
            <div style={{ opacity: `${counter === 3 ? "0.6" : "1"}` }}>
              <Button
                icon={<ArrowCircleRight48Regular />}
                onClick={handleRightClick}
                style={{ border: "none" }}
              ></Button>
            </div>
          </div>
          <Dots />
        </div>
      </FluentProvider>
    </>
  );
};

export { Carousel };
