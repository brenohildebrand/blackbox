import React, { useContext, useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { TreeNavBar } from '../components/NavBar';
import TreeCanvas from '../components/TreeCanvas';
import TreeNodeForm from '../components/TreeNodeForm';
import { TreeContext } from '../contexts/TreeContext';
import styles from '../styles/pages/Tree.module.css';

const TreePage = () => {
  //! Context
  const {
    fetchData,
    isShowingTreeNavBar,
    isShowingTreeNodeForm,
    isShowingTreeCanvas,
  } = useContext(TreeContext);

  //! States
  //--------//
  // Styles //
  //--------//
  const backgroundStyle = 'blackBackground';
  const [treePageStyle, setTreePageStyle] = useState(styles.treePage);

  //! Effects
  //----------------//
  // Initialization //
  //----------------//
  useEffect(() => {
    setTreePageStyle(`${styles.treePage} fullOpacity`);
    fetchData();
  }, []);

  //--------//
  // Return //
  //--------//
  return (
    <div className={backgroundStyle}>
      <div className={treePageStyle}>
        {isShowingTreeNavBar && <TreeNavBar />}
        {isShowingTreeNodeForm && <TreeNodeForm />}
        {isShowingTreeCanvas && <TreeCanvas />}
      </div>
    </div>
  );
};

export default TreePage;
