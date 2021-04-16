import React, { useEffect } from 'react';

const Path = (props) => {
  //! Props
  //-------//
  // Props //
  //-------//
  const { data, setData, path } = props;

  //---------------//
  // Destructuring //
  //---------------//
  const { from, to, status } = path;

  //----------------//
  // Paths Settings //
  //----------------//
  const pathsSettings = data.settingsData.paths;

  //--------//
  // Points //
  //--------//
  const nodes = data.treeData.nodes;
  const fromPoint = {
    x: nodes[from].position.x + nodes[from].delta.x,
    y: nodes[from].position.y + nodes[from].delta.y,
  };
  const toPoint = {
    x: nodes[to].position.x + nodes[to].delta.x,
    y: nodes[to].position.y + nodes[to].delta.y,
  };
  const points = `${fromPoint.x},${fromPoint.y} ${toPoint.x},${toPoint.y}`;

  //! Return
  //--------//
  // Return //
  //--------//
  return (
    <g>
      <polyline points={points} {...pathsSettings[status]} />
      <defs>
        <filter
          id='filter_yellow_bright'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          />
          <feMorphology
            radius='1'
            operator='dilate'
            in='SourceAlpha'
            result='effect1_dropShadow'
          />
          <feGaussianBlur stdDeviation='15' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 1 0 0 0 0 0.921569 0 0 0 0 0.211765 0 0 0 0.75 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow'
            result='shape'
          />
        </filter>
      </defs>
    </g>
  );
};

export default Path;
