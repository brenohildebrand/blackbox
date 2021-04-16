import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import svg2react from '../modules/svg2react';

import SubNode from './SubNode';

const Node = (props) => {
  //! Props
  //-------//
  // Props //
  //-------//
  const {
    node,
    data,
    setData,
    setFormNode,
    pathNode,
    setPathNode,
    isPathEnvironmentOn,
  } = props;

  //! Refs
  //----------//
  // Node Ref //
  //----------//
  const nodeRef = useRef(null);

  //! Constants and Variables
  //---------------//
  // Destructuring //
  //---------------//
  const { id, icon, position, status, subNodes } = node;

  //----------------//
  // Nodes Settings //
  //----------------//
  const nodesSettings = data.settingsData.nodes;

  //--------------------//
  // Node Icon Settings //
  //--------------------//
  const r = nodesSettings[status].circle.r;

  const nodeIconSettings = {
    width: r * 0.8,
    height: r * 0.8,
    x: position.x - (r * 0.8) / 2,
    y: position.y - (r * 0.8) / 2,
    ...nodesSettings[status].svg,
  };

  //! States
  const [controlledPosition, setControlledPosition] = useState({ x: 0, y: 0 });

  //! Functions
  //-------------------//
  // Handle Node Click //
  //-------------------//
  function handleNodeOnClick(e, id) {
    e.preventDefault();
    if (isPathEnvironmentOn === false) return;

    setPathNode({ ...Object.assign(pathNode, { to: id, click: 'leftclick' }) });
  }

  //-------------------------//
  // Handle Node DoubleClick //
  //-------------------------//
  function handleNodeDoubleClick(e, id) {
    e.preventDefault();
    if (isPathEnvironmentOn === true) return;

    // Open Form with id
    setFormNode({ ...data.treeData.nodes[id] });
  }

  //------------------------//
  // Handle Node RightClick //
  //------------------------//
  function handleNodeRightClick(e, id) {
    e.preventDefault();

    if (isPathEnvironmentOn === true) {
      setPathNode({
        ...Object.assign(pathNode, { from: id, click: 'rightclick' }),
      });
      return;
    }

    // Make a copy of treeData
    let treeDataCopy = data.treeData;

    // Define the newStatus
    let newStatus;
    if (treeDataCopy.nodes[id].status === 'done') newStatus = 'pending';
    else newStatus = 'done';

    // Set node status
    treeDataCopy.nodes[id].status = newStatus;

    // Set subNodes status
    let subNodesCopy = treeDataCopy.nodes[id].subNodes;
    Object.keys(subNodesCopy).map((id) => {
      subNodesCopy[id].status = newStatus;
    });
    treeDataCopy.nodes[id].subNodes = subNodesCopy;

    // Set path status
    let pathsCopy = treeDataCopy.paths;
    Object.values(pathsCopy).map((path) => {
      const { id, from, to, status } = path;

      if (
        treeDataCopy.nodes[from].status === 'done' &&
        treeDataCopy.nodes[to].status === 'done'
      )
        treeDataCopy.paths[id].status = 'done';
      else treeDataCopy.paths[id].status = 'pending';
    });

    setData({ ...Object.assign(data, { treeData: treeDataCopy }) });
  }

  //------------------//
  // onControlledDrag //
  //------------------//
  function onControlledDrag(e, position) {
    const { x, y } = position;
    setControlledPosition({ ...{ x, y } });

    let treeDataCopy = data.treeData;
    treeDataCopy.nodes[id].delta = { x: x, y: y };

    setData({ ...Object.assign(data, { treeData: treeDataCopy }) });
  }

  //! Return
  //---------------------------//
  // Return Node with SubNodes //
  //---------------------------//
  return (
    <g>
      <Draggable position={controlledPosition} onDrag={onControlledDrag}>
        <g
          onClick={(e) => handleNodeOnClick(e, id)}
          onDoubleClick={(e) => handleNodeDoubleClick(e, id)}
          onContextMenu={(e) => handleNodeRightClick(e, id)}
          ref={nodeRef}
        >
          <circle
            cx={position.x}
            cy={position.y}
            {...nodesSettings[status].circle}
          />
          {svg2react(icon, nodeIconSettings)}
        </g>
      </Draggable>
      {Object.entries(subNodes).map(([id, subNode]) => {
        return (
          <SubNode
            key={id}
            subNode={subNode}
            nodeID={node.id}
            data={data}
            setData={setData}
            setFormNode={setFormNode}
            pathNode={pathNode}
            setPathNode={setPathNode}
            isPathEnvironmentOn={isPathEnvironmentOn}
          />
        );
      })}
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

export default Node;
