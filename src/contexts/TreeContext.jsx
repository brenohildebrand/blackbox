import React, { createContext, useEffect, useRef, useState } from 'react';
import Node from '../components/Node';
import Path from '../components/Path';

const TreeContext = createContext({});

const TreeProvider = (props) => {
  //! Props
  //-------//
  // Props //
  //-------//
  const { children } = props;

  //! Refs
  //-----------------//
  // Tree Canvas Ref //
  //-----------------//
  const TreeCanvasRef = useRef(null);

  //! States
  //------------//
  // Data State //
  //------------//
  const [data, setData] = useState({
    treeData: null,
    settingsData: null,
  });

  //------------------//
  // isShowing States //
  //------------------//
  const [isShowingTreeCanvas, setIsShowingTreeCanvas] = useState(true);
  const [isShowingTreeNodeForm, setIsShowingTreeNodeForm] = useState(false);
  const [isShowingTreeNavBar, setIsShowingTreeNavBar] = useState(true);

  //-------------//
  // Form States //
  //-------------//
  const [formNode, setFormNode] = useState(null);
  const [numberOfSubNodes, setNumberOfSubNodes] = useState(0);

  //-------------//
  // Path States //
  //-------------//
  const [pathNode, setPathNode] = useState({});
  const [isPathEnvironmentOn, setIsPathEnvironmentOn] = useState(false);

  //! Effects
  //------------------------------------------//
  // When formNode changes --> show node form //
  //------------------------------------------//
  useEffect(() => {
    if (formNode === null) return;
    showNodeForm();
  }, [formNode]);

  //---------------------------------------------------------------------//
  // When pathNode.to changes -->  verify if there exists path.Node.from //
  //---------------------------------------------------------------------//
  useEffect(async () => {
    try {
      // Destructuring
      const { to, from, click } = pathNode;

      // Unevaluated cases
      if (click === 'rightclick') return;
      if (to === undefined) return;
      if (from === undefined) return;
      if (to === from) return;

      // Make a treeData copy
      let treeDataCopy = data.treeData;

      // Verify if it already exists
      let alreadyExists = false;

      // For each path
      Object.values(treeDataCopy.paths).map((path) => {
        let match = false;

        if (path.to === to && path.from === from) match = true;
        if (path.to === from && path.from === to) match = true;

        if (match) {
          // Delete path
          delete treeDataCopy.paths[path.id];

          // Update data
          setData({ ...Object.assign(data, { treeDataCopy: treeDataCopy }) });

          // Set alreadyExists to true
          alreadyExists = true;

          // Return
          return;
        }
      });

      // if it's deleted, do nothing more
      if (alreadyExists) return;

      // else, if it didn't existed
      // Fetch a new ID
      const ID = await fetchID();

      treeDataCopy.paths[ID] = {
        id: ID,
        from: from,
        to: to,
        status: 'pending',
      };

      // Checking if it's time to shine
      if (
        treeDataCopy.nodes[from].status === 'done' &&
        treeDataCopy.nodes[to].status === 'done'
      )
        treeDataCopy.paths[ID].status = 'done';

      setData({ ...Object.assign(data, { treeDataCopy: treeDataCopy }) });
    } catch (err) {
      throw err;
    }
  }, [pathNode]);

  //! Functions
  //---------------------------------//
  // Backend Communication Functions //
  //---------------------------------//
  // Fetching
  const fetchData = async () => {
    try {
      const treeData = await fetchTreeData();
      const settingsData = await fetchSettingsData();

      setData({
        ...{
          treeData: treeData,
          settingsData: settingsData,
        },
      });
    } catch (err) {
      throw err;
    }
  };
  const fetchTreeData = async () => {
    try {
      const treeData = await window.api.invoke('FETCH_TREE_DATA');
      return treeData;
    } catch (err) {
      throw err;
    }
  };
  const fetchSettingsData = async () => {
    try {
      const settingsData = await window.api.invoke('FETCH_SETTINGS_DATA');
      return settingsData;
    } catch (err) {
      throw err;
    }
  };
  const fetchID = async () => {
    try {
      const ID = await window.api.invoke('GET_ID');
      return ID;
    } catch (err) {
      throw err;
    }
  };

  //-------------------//
  // Drawing Functions //
  //-------------------//
  const DrawTree = () => {
    // Wait for data
    if (!data.treeData || !data.settingsData) return null;

    // Drawing Nodes
    const nodesGroup = DrawNodes();

    // Drawing Paths
    const pathsGroup = DrawPaths();

    // The last come on top
    return (
      <g>
        <g>{pathsGroup}</g>
        <g>{nodesGroup}</g>
      </g>
    );
  };
  const DrawNodes = () => {
    return Object.entries(data.treeData.nodes).map(([id, node]) => {
      return (
        <Node
          key={id}
          node={node}
          data={data}
          setData={setData}
          setFormNode={setFormNode}
          pathNode={pathNode}
          setPathNode={setPathNode}
          isPathEnvironmentOn={isPathEnvironmentOn}
        />
      );
    });
  };
  const DrawPaths = () => {
    // Getting Paths data and paths settings
    const paths = data.treeData.paths;

    return Object.entries(paths).map(([id, path]) => {
      return <Path key={id} data={data} setData={setData} path={path} />;
    });
  };

  //---------------------//
  // Show/Hide Functions //
  //---------------------//
  // Tree
  const showTree = () => {
    setIsShowingTreeCanvas(true);
  };
  const hideTree = () => {
    setIsShowingTreeCanvas(false);
  };
  // NodeForm
  const showNodeForm = () => {
    setIsShowingTreeNodeForm(true);
  };
  const hideNodeForm = () => {
    setIsShowingTreeNodeForm(false);
  };
  // Menu ( NavBar )
  const showMenu = () => {
    setIsShowingTreeNavBar(true);
  };
  const hideMenu = () => {
    setIsShowingTreeNavBar(false);
  };

  //----------------//
  // Form Functions //
  //----------------//
  const form = {
    // Node
    createNode: async (position) => {
      try {
        const ID = await fetchID();

        const node = {
          id: ID,
          title: '',
          description: '',
          icon: null,
          subNodes: {},
          status: 'pending',
          position: { x: position.x, y: position.y },
          delta: { x: 0, y: 0 },
        };

        let treeDataCopy = data.treeData;
        treeDataCopy.nodes[ID] = node;

        setNumberOfSubNodes(
          Object.values(treeDataCopy.nodes[ID].subNodes).length,
        );
        setFormNode({ ...treeDataCopy.nodes[ID] });
        setData({ ...Object.assign(data, { treeData: treeDataCopy }) });
      } catch (err) {
        throw err;
      }
    },
    updateNode: (newNode) => {
      setNumberOfSubNodes(Object.values(newNode.subNodes).length);
      setFormNode({ ...newNode });
    },
    deleteNode: () => {
      let treeDataCopy = data.treeData;

      delete treeDataCopy.nodes[formNode.id];

      setData({ ...Object.assign(data, { treeData: treeDataCopy }) });

      hideNodeForm();

      window.api.invoke('SAVE_CHANGES', {
        ...Object.assign(data, { treeData: treeDataCopy }),
      });
    },

    // SubNode
    createSubNode: async () => {
      try {
        const callback = async (e) => {
          e.preventDefault();

          const position = {
            x: e.clientX,
            y: e.clientY,
          };

          const ID = await fetchID();

          const subNode = {
            id: ID,
            title: '',
            description: '',
            difficulty: 0,
            icon: null,
            status: 'pending',
            position: { x: position.x, y: position.y },
            delta: { x: 0, y: 0 },
          };

          let treeDataCopy = data.treeData;

          // Saving Changes from last Form
          treeDataCopy.nodes[formNode.id] = formNode;

          // Putting the created SubNode
          treeDataCopy.nodes[formNode.id].subNodes[ID] = subNode;

          setNumberOfSubNodes(
            Object.values(treeDataCopy.nodes[formNode.id].subNodes).length,
          );
          setFormNode({ ...treeDataCopy.nodes[formNode.id] });
          setData({ ...Object.assign(data, { treeData: treeDataCopy }) });
        };

        hideNodeForm();
        // Add click event listener
        TreeCanvasRef.current.addEventListener('click', callback, {
          once: true,
        });
      } catch (err) {
        throw err;
      }
    },
    deleteSubNode: (subNodeID) => {
      let treeDataCopy = data.treeData;

      // Saving Changes from last Form
      delete treeDataCopy.nodes[formNode.id].subNodes[subNodeID];

      setNumberOfSubNodes(
        Object.values(treeDataCopy.nodes[formNode.id].subNodes).length,
      );
      setFormNode({ ...treeDataCopy.nodes[formNode.id] });
      setData({ ...Object.assign(data, { treeData: treeDataCopy }) });
    },

    // CloseButton
    closeButton: () => {
      let treeDataCopy = data.treeData;

      // Saving Changes from last Form
      treeDataCopy.nodes[formNode.id] = formNode;

      setData({ ...Object.assign(data, { treeData: treeDataCopy }) });

      hideNodeForm();

      window.api.invoke('SAVE_CHANGES', {
        ...Object.assign(data, { treeData: treeDataCopy }),
      });
    },
  };

  //----------------//
  // Menu Functions //
  //----------------//
  const menu = {
    // createNode
    createNode: async () => {
      try {
        if (isPathEnvironmentOn === true) return;

        // Define callback as the click response
        const callback = async (e) => {
          e.preventDefault();

          const position = {
            x: e.clientX,
            y: e.clientY,
          };

          await form.createNode(position);
          showNodeForm();
        };

        // Add click event listener
        TreeCanvasRef.current.addEventListener('click', callback, {
          once: true,
        });
      } catch (err) {
        throw err;
      }
    },
    // createPath
    createPath: () => {
      // Right click define the 'from'
      // Left click define the 'to'
      // When you left click it verifies if there's a 'from'. If so, it creates a path.
      // If that path already exists it deletes it
      setPathNode({});
      setIsPathEnvironmentOn(!isPathEnvironmentOn);
    },
  };

  //! Return
  //--------//
  // Return //
  //--------//
  return (
    <TreeContext.Provider
      value={{
        TreeCanvasRef,
        isShowingTreeCanvas,
        isShowingTreeNodeForm,
        isShowingTreeNavBar,
        formNode,
        numberOfSubNodes,
        isPathEnvironmentOn,
        data,
        fetchData,
        fetchTreeData,
        fetchSettingsData,
        fetchID,
        showTree,
        hideTree,
        showNodeForm,
        hideNodeForm,
        showMenu,
        hideMenu,
        DrawTree,
        DrawNodes,
        DrawPaths,
        form,
        menu,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};

export { TreeProvider, TreeContext };
