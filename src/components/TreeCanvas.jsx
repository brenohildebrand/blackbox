import React, { useContext, useEffect, useRef, useState } from 'react';
import { TreeContext } from '../contexts/TreeContext';
import styles from '../styles/components/TreeCanvas.module.css';

const TreeCanvas = (props) => {
  //! Props
  const { DrawTree, TreeCanvasRef } = useContext(TreeContext);

  //! States
  //---------//
  // ViewBox //
  //---------//
  const [viewBox, setViewBox] = useState({
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  });

  //------//
  // Zoom //
  //------//
  const [mouseOnWheelEvent, setMouseOnWheelEvent] = useState(null);
  const [zoom, setZoom] = useState(1);

  //----------------//
  // Axis Intervals //
  //----------------//
  const [mouseOnMoveEvent, setMouseOnMoveEvent] = useState(null);
  const [intervalXAxisID, setIntervalXAxisID] = useState(null);
  const [intervalYAxisID, setIntervalYAxisID] = useState(null);

  //--------//
  // Styles //
  //--------//
  const [treeCanvasStyle, setTreeCanvasStyle] = useState(styles.treeCanvas);

  //! Effects
  //----------------//
  // Initialization //
  //----------------//
  //---------------//
  // Handle Resize //
  //---------------//
  useEffect(() => {
    setTreeCanvasStyle(`${styles.treeCanvas} fullOpacity`);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  //------------------//
  // Handle mouseMove //
  //------------------//
  useEffect(() => {
    window.addEventListener('mousemove', handleOnMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleOnMouseMove);
    };
  }, []);

  // Update Mouse On Move
  useEffect(() => {
    if (mouseOnMoveEvent === null) return;

    const e = mouseOnMoveEvent;
    const mouse = { x: e.clientX, y: e.clientY };
    const screenPercentage = 0.05;

    const delta = 1.5;
    const intervalTime = 15;

    // Booleans
    const shouldDragLeft = mouse.x <= window.innerWidth * screenPercentage;

    const shouldDragRight =
      mouse.x >= window.innerWidth * (1 - screenPercentage);

    const shouldDragUp = mouse.y <= window.innerHeight * screenPercentage;

    const shouldDragDown =
      mouse.y >= window.innerHeight * (1 - screenPercentage);

    // If it should not drag at all
    if (!shouldDragLeft && !shouldDragRight) {
      if (intervalXAxisID !== null) {
        clearInterval(intervalXAxisID);
        setIntervalXAxisID(null);
      }
    }
    if (!shouldDragUp && !shouldDragDown) {
      if (intervalYAxisID !== null) {
        clearInterval(intervalYAxisID);
        setIntervalYAxisID(null);
      }
    }

    if (intervalXAxisID === null && intervalYAxisID === null) {
      if (shouldDragLeft) {
        setIntervalXAxisID(
          setInterval(() => {
            setViewBox({
              ...Object.assign(viewBox, { x: viewBox.x - delta * zoom }),
            });
          }, intervalTime),
        );
      }
      if (shouldDragRight) {
        setIntervalXAxisID(
          setInterval(() => {
            setViewBox({
              ...Object.assign(viewBox, { x: viewBox.x + delta * zoom }),
            });
          }, intervalTime),
        );
      }
      if (shouldDragUp) {
        setIntervalYAxisID(
          setInterval(() => {
            setViewBox({
              ...Object.assign(viewBox, { y: viewBox.y - delta * zoom }),
            });
          }, intervalTime),
        );
      }
      if (shouldDragDown) {
        setIntervalYAxisID(
          setInterval(() => {
            setViewBox({
              ...Object.assign(viewBox, { y: viewBox.y + delta * zoom }),
            });
          }, intervalTime),
        );
      }
    }
  }, [mouseOnMoveEvent]);

  useEffect(() => {}, [intervalXAxisID]);

  useEffect(() => {}, [intervalYAxisID]);

  //-------------//
  // Handle Zoom //
  //-------------//
  useEffect(() => {
    TreeCanvasRef.current.addEventListener('wheel', handleOnWheel);

    return () => {
      TreeCanvasRef.current.removeEventListener('wheel', handleOnWheel);
    };
  }, []);

  // Zoom Update
  useEffect(() => {
    if (mouseOnWheelEvent === null) return;

    const e = mouseOnWheelEvent;
    setZoom(Math.max(0.125, Math.min(zoom + e.deltaY * 0.125, 2)));
  }, [mouseOnWheelEvent]);

  useEffect(() => {
    setViewBox({
      ...{
        x: window.innerWidth / 2 - (window.innerWidth * zoom) / 2,
        y: window.innerHeight / 2 - (window.innerHeight * zoom) / 2,
        width: window.innerWidth * zoom,
        height: window.innerHeight * zoom,
      },
    });
  }, [zoom]);

  //! Functions
  //---------------//
  // Handle Resize //
  //---------------//
  const handleResize = (e) => {
    e.preventDefault();
  };

  //------------------//
  // Handle MouseMove //
  //------------------//
  const handleOnMouseMove = (e) => {
    e.preventDefault();
    setMouseOnMoveEvent(e);
  };

  //----------------//
  // Handle OnWheel //
  //----------------//
  const handleOnWheel = (e) => {
    e.preventDefault();
    setMouseOnWheelEvent(e);
  };

  //! Return
  //--------//
  // Return //
  //--------//
  return (
    <svg
      className={treeCanvasStyle}
      viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
      preserveAspectRatio='xMidYMid slice'
      ref={TreeCanvasRef}
    >
      {DrawTree()}
    </svg>
  );
};

export default TreeCanvas;
