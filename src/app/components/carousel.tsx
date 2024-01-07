"use client";

import { useEffect, useState } from "react";
import styles from "../page.module.css";
import { Button, Image, Tab, TabList } from "@fluentui/react-components";
import {
  ArrowCircleLeft48Regular,
  ArrowCircleRight48Regular,
  Circle12Filled,
  Circle12Regular,
} from "@fluentui/react-icons";
import type { SelectTabData, SelectTabEvent } from "@fluentui/react-components";

const Carousel = () => {
  const [imageCounter, setImageCounter] = useState(0);
  const imageArray = ["/cities_pixel.jpg", "/monopoly.jpeg", "/business.jpeg"];
  const [imageSrc, setImageSrc] = useState(imageArray[0]);
  const [selectedValue, setSelectedValue] = useState<number>(0);

  useEffect(() => {
    setImageSrc(imageArray[imageCounter]);
    setSelectedValue(imageCounter);
  }, [imageCounter]);

  useEffect(() => {
    setImageCounter(selectedValue);
  }, [selectedValue]);

  const handleLeftButton = () => {
    setImageCounter((prev) => {
      return (prev - 1 + imageArray.length) % imageArray.length;
    });
  };

  const handleRightButton = () => {
    setImageCounter((prev) => {
      return (prev + 1) % imageArray.length;
    });
  };

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value as number);
  };

  const renderTabs = () => {
    const tabs = [];

    for (let i = 0; i < imageArray.length; i++) {
      tabs.push(
        <Tab
          icon={i === imageCounter ? <Circle12Filled /> : <Circle12Regular />}
          value={i}
          key={`tab${i}`}
        />,
      );
    }

    return <>{tabs}</>;
  };

  return (
    <>
      <div>
        <div
          className={styles.flexcontainer}
          style={{ justifyContent: "center" }}
        >
          <div>
            <Button
              icon={<ArrowCircleLeft48Regular />}
              onClick={handleLeftButton}
              appearance="transparent"
              size="large"
            ></Button>
          </div>
          <div className={styles.CarouselImgContainer}>
            <div style={{ height: "280px", width: "280px" }}>
              <Image src={imageSrc} fit="cover" shape="circular" />
            </div>
          </div>
          <div>
            <Button
              icon={<ArrowCircleRight48Regular />}
              onClick={handleRightButton}
              appearance="transparent"
              size="large"
            ></Button>
          </div>
        </div>
        <div
          className={styles.flexcontainer}
          style={{ justifyContent: "center" }}
        >
          <TabList
            defaultSelectedValue={0}
            appearance="transparent"
            selectedValue={selectedValue}
            onTabSelect={onTabSelect}
          >
            {renderTabs()}
          </TabList>
        </div>
      </div>
    </>
  );
};

export { Carousel };
