"use client";

import { useEffect, useState } from "react";
import styles from "../page.module.css";
import {
  Button,
  FluentProvider,
  Image,
  Tab,
  TabList,
  teamsLightTheme,
} from "@fluentui/react-components";
import {
  ArrowCircleLeft48Regular,
  ArrowCircleRight48Regular,
  Circle12Filled,
  Circle12Regular,
} from "@fluentui/react-icons";

const Carousel = () => {
  let [counter, setCounter] = useState(0);
  var imageArray = ["/cities_pixel.jpg", "/monopoly.jpeg", "/business.jpeg"];
  let [imagesrc, setImagesrc] = useState(imageArray[0]);

  useEffect(() => {
    handleCarouselChange();
  }, [counter]);

  const handleLeftClick = () => {
    setCounter((prev) => {
      return (counter - 1 + imageArray.length) % imageArray.length;
    });
  };

  const handleRightClick = () => {
    setCounter((prev) => {
      return (counter + 1) % imageArray.length;
    });
  };

  const handleCarouselChange = () => {
    setImagesrc(imageArray[counter]);
  };

  const renderTabs = () => {
    const tabs = [];

    for (let i = 0; i < imageArray.length; i++) {
      tabs.push(
        <Tab
          icon={i === counter ? <Circle12Filled /> : <Circle12Regular />}
          value={`tab${i}`}
        />,
      );
    }

    return <>{tabs}</>;
  };

  return (
    <>
      <FluentProvider theme={teamsLightTheme}>
        <div>
          <div
            className={styles.flexcontainer}
            style={{ justifyContent: "center" }}
          >
            <div>
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
              <div style={{ height: "280px", width: "280px" }}>
                <Image src={imagesrc} fit="cover" shape="circular" />
              </div>
            </div>
            <div>
              <Button
                icon={<ArrowCircleRight48Regular />}
                onClick={handleRightClick}
                style={{ border: "none" }}
              ></Button>
            </div>
          </div>
          <div
            className={styles.flexcontainer}
            style={{ justifyContent: "center", marginTop: "20px" }}
          >
            <TabList>{renderTabs()}</TabList>
          </div>
        </div>
      </FluentProvider>
    </>
  );
};

export { Carousel };
