import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import svg2react from '../modules/svg2react';

const SubNode = (props) => {
  //! Props
  const {
    subNode,
    nodeID,
    data,
    setData,
    setFormNode,
    pathNode,
    setPathNode,
    isPathEnvironmentOn,
  } = props;

  //! Refs
  //-------------//
  // SubNode Ref //
  //-------------//
  const subNodeRef = useRef();

  //! Constants and Variables
  //---------------//
  // Destructuring //
  //---------------//
  const { id, icon, position, status } = subNode;

  //-------------------//
  // SubNodes Settings //
  //-------------------//
  const subNodesSettings = data.settingsData.subNodes;

  //-------------------//
  // SubNodes Settings //
  //-------------------//
  const r = subNodesSettings[status].circle.r;

  const subNodeIconSettings = {
    width: r * 0.8,
    height: r * 0.8,
    x: position.x - (r * 0.8) / 2,
    y: position.y - (r * 0.8) / 2,
    ...subNodesSettings[status].svg,
  };

  //! States
  const [controlledPosition, setControlledPosition] = useState({ x: 0, y: 0 });

  //! Functions
  //----------------------------//
  // Handle SubNode DoubleClick //
  //----------------------------//
  function handleSubNodeDoubleClick(e, nodeID) {
    e.preventDefault();
    if (isPathEnvironmentOn === true) return;

    // Open Form with nodeID
    setFormNode({ ...data.treeData.nodes[nodeID] });
  }

  //---------------------------//
  // Handle SubNode RightClick //
  //---------------------------//
  function handleSubNodeRightClick(e, nodeID, id) {
    e.preventDefault();
    if (isPathEnvironmentOn === true) return;
    // Make a copy of treeData
    let treeDataCopy = data.treeData;

    // Define the newStatus
    let newStatus;
    if (treeDataCopy.nodes[nodeID].subNodes[id].status === 'done')
      newStatus = 'pending';
    else newStatus = 'done';

    // Set SubNode
    treeDataCopy.nodes[nodeID].subNodes[id].status = newStatus;

    // Check if all SubNodes from this Node are done
    let subNodesCopy = treeDataCopy.nodes[nodeID].subNodes;
    let areAllSubNodesDone = true;
    Object.keys(subNodesCopy).map((id) => {
      if (subNodesCopy[id].status === 'pending') areAllSubNodesDone = false;
    });

    // Verify if node status should be updated
    if (areAllSubNodesDone && newStatus === 'done')
      treeDataCopy.nodes[nodeID].status = newStatus;
    if (newStatus === 'pending') treeDataCopy.nodes[nodeID].status = newStatus;

    setData({ ...Object.assign(data, { treeData: treeDataCopy }) });
  }

  //------------------//
  // onControlledDrag //
  //------------------//
  function onControlledDrag(e, position) {
    const { x, y } = position;
    setControlledPosition({ ...{ x, y } });

    let treeDataCopy = data.treeData;
    treeDataCopy.nodes[nodeID].subNodes[id].delta = { x: x, y: y };

    setData({ ...Object.assign(data, { treeData: treeDataCopy }) });
  }

  //! Return
  //----------------//
  // Return SubNode //
  //----------------//
  return (
    <Draggable position={controlledPosition} onDrag={onControlledDrag}>
      <g
        onDoubleClick={(e) => handleSubNodeDoubleClick(e, nodeID)}
        onContextMenu={(e) => handleSubNodeRightClick(e, nodeID, id)}
        ref={subNodeRef}
      >
        <circle
          cx={position.x}
          cy={position.y}
          {...subNodesSettings[status].circle}
        />
        {svg2react(icon, subNodeIconSettings)}
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
    </Draggable>
  );
};

export default SubNode;
