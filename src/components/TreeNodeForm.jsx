import React, { useContext, useEffect, useState } from 'react';
import { TreeContext } from '../contexts/TreeContext';
import svg2react from '../modules/svg2react';
import styles from '../styles/components/TreeNodeForm.module.css';

const TreeNodeForm = () => {
  //! Context
  const { form, formNode, numberOfSubNodes } = useContext(TreeContext);

  //! Variables and Constants
  //--------//
  // Styles //
  //--------//
  const [formStyle, setFormStyle] = useState(styles.form);
  const titleStyle = styles.title;

  const gridStyle = styles.grid;
  const subNodesArrayStyle = styles.subNodesArray;

  const OverallDataStyle = styles.overallData;
  const nodeStyle = styles.node;
  const nodeDeleteButtonStyle = styles.nodeDeleteButton;
  const editionStyle = styles.edition;
  const editionDifficultyStyle = styles.editionDifficulty;
  const editionIconsStyle = styles.editionIcons;
  const editionSelectedDifficultyStyle = styles.editionSelectedDifficulty;
  const editionSelectedIconStyle = styles.editionSelectedIcon;

  const subNodesMessageStyle = styles.subNodesMessage;
  const subNodesSubArrayStyle = styles.subNodesSubArray;
  const subNodeStyle = styles.subNode;
  const subNodeDeleteButtonStyle = styles.subNodeDeleteButton;
  const addSubNodeStyle = styles.addSubNode;

  const [closeButtonStyle, setCloseButtonStyle] = useState(styles.closeButton);

  //--------//
  // Images //
  //--------//
  const plusIcon = (
    <svg width='35' height='35' viewBox='0 0 35 35' fill='none'>
      <rect y='17.1499' width='35' height='0.7' fill='#494949' />
      <rect
        x='17.1484'
        y='35'
        width='35'
        height='0.7'
        transform='rotate(-90 17.1484 35)'
        fill='#494949'
      />
    </svg>
  );

  const closeButton = (
    <svg width='37' height='39' viewBox='0 0 37 39' fill='none'>
      <rect
        width='51.4052'
        height='1.0281'
        transform='matrix(0.687778 -0.725921 0.687778 0.725921 0 37.3162)'
        fill='#494949'
      />
      <rect
        width='51.4052'
        height='1.0281'
        transform='matrix(0.687778 0.725921 -0.687778 0.725921 0.707031 0)'
        fill='#494949'
      />
    </svg>
  );

  //--------------------//
  // Placeholder Values //
  //--------------------//
  const titlePlaceholder = 'Add Title';
  const descriptionPlaceholder = 'Add Description';
  const searchPlaceHolder = 'search';

  //--------//
  // Macros //
  //--------//
  const TITLE_MAX_LENGTH = 30;
  const DESCRIPTION_MAX_LENGTH = 300;
  const SEARCH_MAX_LENGTH = 30;

  //---------------//
  // Search States //
  //---------------//
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  //-----------------------//
  // Selected Node/SubNode //
  //-----------------------//
  const [selectedNodeOrSubNode, setSelectedNodeOrSubNode] = useState(null);

  //! Effects
  //----------------//
  // Initialization //
  //----------------//
  useEffect(() => {
    setFormStyle(`${styles.form} fullOpacity`);
    setCloseButtonStyle(`${styles.closeButton} fullOpacity`);
  }, []);

  //--------------------------------------------------//
  // When searchValue changes --> update searchResult //
  //--------------------------------------------------//
  useEffect(() => {
    updateSearchResult();
  }, [searchValue]);

  //! Functions
  //------------------//
  // Search Functions //
  //------------------//
  async function updateSearchResult() {
    try {
      setSearchResult(await window.api.invoke('SEARCH_ICONS', searchValue, 5));
    } catch (err) {
      throw err;
    }
  }

  //-------------------//
  // Support Functions //
  //-------------------//
  function forEachSubNode(callback) {
    return Object.values(formNode.subNodes).map(callback);
  }

  //------------------//
  // Render Functions //
  //------------------//
  //--------------//
  // Render Title //
  //--------------//
  function renderTitle() {
    return (
      <div className={titleStyle}>
        <h2>Node Edition</h2>
      </div>
    );
  }

  //-------------//
  // Render Grid //
  //-------------//
  function renderGrid() {
    //--------------------------//
    // Render Grid Overall Data //
    //--------------------------//
    function renderOverallData() {
      // Caculate Completed Percentage Value
      function calculateCompletedPercentageValue() {
        // Base Cases
        if (formNode.status === 'done') return '100';
        if (numberOfSubNodes === 0) return '0';

        // All other cases
        let completedSubNodes = 0;

        forEachSubNode((subNode) => {
          if (subNode.status === 'done') completedSubNodes++;
        });

        return String(Math.round((completedSubNodes / numberOfSubNodes) * 100));
      }

      // Calculate Average Difficulty Value
      function calculateAverageDifficultyValue() {
        // Base Cases
        if (numberOfSubNodes === 0) return '-';

        // All other cases
        let subNodesDifficultiesSum = 0;

        forEachSubNode((subNode) => {
          subNodesDifficultiesSum += subNode.difficulty;
        });

        return String(Math.round(subNodesDifficultiesSum / numberOfSubNodes));
      }

      // Return Overall Data
      return (
        <div className={OverallDataStyle}>
          <div>
            <h3>Overall Data</h3>
          </div>
          <div>
            <div>
              <p>Completed</p>
              <p>{calculateCompletedPercentageValue()}%</p>
            </div>
            <div>
              <p>Difficulty</p>
              <p>{calculateAverageDifficultyValue()}</p>
            </div>
          </div>
        </div>
      );
    }

    //------------------//
    // Render Grid Node //
    //------------------//
    function renderNode() {
      // handle OnFocus
      const handleNodeOnFocus = () => {
        setSelectedNodeOrSubNode('node');
      };

      // handle Title On Change
      const handleTitleOnChange = (e) => {
        e.preventDefault();
        form.updateNode({
          ...Object.assign(formNode, { title: e.target.value }),
        });
      };

      // handle Description on Change
      const handleDescriptionOnChange = (e) => {
        e.preventDefault();
        form.updateNode({
          ...Object.assign(formNode, { description: e.target.value }),
        });
      };

      // Return Node
      return (
        <div className={nodeStyle}>
          <div>
            <form
              onSubmit={(e) => e.preventDefault()}
              onFocus={handleNodeOnFocus}
            >
              <input
                type='text'
                placeholder={titlePlaceholder}
                value={formNode.title}
                onChange={handleTitleOnChange}
                maxLength={TITLE_MAX_LENGTH}
                spellCheck={false}
              />
            </form>
            <div className={nodeDeleteButtonStyle} onClick={form.deleteNode}>
              {closeButton}
            </div>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            onFocus={handleNodeOnFocus}
          >
            <textarea
              placeholder={descriptionPlaceholder}
              value={formNode.description}
              onChange={handleDescriptionOnChange}
              maxLength={DESCRIPTION_MAX_LENGTH}
              spellCheck={false}
            />
          </form>
        </div>
      );
    }

    //---------------------//
    // Render Grid Edition //
    //---------------------//
    function renderEdition() {
      // Render Icons
      const renderIcons = () => {
        const handleSearchOnChange = (e) => {
          e.preventDefault();
          setSearchValue(e.target.value);
        };

        const renderFiveIcons = () => {
          const handleIconOnClick = (e, icon) => {
            e.preventDefault();

            // In case it's a node
            if (selectedNodeOrSubNode === 'node') {
              form.updateNode({
                ...Object.assign(formNode, { icon: icon }),
              });
            }

            // In case it's a subNode
            else {
              let nodeCopy = formNode;

              nodeCopy.subNodes[selectedNodeOrSubNode] = Object.assign(
                nodeCopy.subNodes[selectedNodeOrSubNode],
                {
                  icon: icon,
                },
              );

              form.updateNode({ ...nodeCopy });
            }
          };

          // Define currentIcon
          let currentIcon;
          if (selectedNodeOrSubNode === 'node') currentIcon = formNode.icon;
          else currentIcon = formNode.subNodes[selectedNodeOrSubNode].icon;

          // There are five icons cause just five were asked from the backend.
          return searchResult.map((icon, idx) => {
            if (currentIcon === icon) {
              return (
                <div
                  key={idx}
                  className={editionSelectedIconStyle}
                  onClick={(e) => handleIconOnClick(e, icon)}
                >
                  {svg2react(icon)}
                </div>
              );
            }

            return (
              <div key={idx} onClick={(e) => handleIconOnClick(e, icon)}>
                {svg2react(icon)}
              </div>
            );
          });
        };

        // Return
        return (
          <div className={editionIconsStyle}>
            <form>
              <input
                type='text'
                placeholder={searchPlaceHolder}
                value={searchValue}
                onChange={handleSearchOnChange}
                maxLength={SEARCH_MAX_LENGTH}
                spellCheck={false}
              />
            </form>
            <div>{renderFiveIcons()}</div>
          </div>
        );
      };

      // Render Difficulty
      const renderDifficulty = () => {
        const handleNumberOnClick = (e, number) => {
          e.preventDefault();
          let nodeCopy = formNode;
          nodeCopy.subNodes[selectedNodeOrSubNode] = Object.assign(
            nodeCopy.subNodes[selectedNodeOrSubNode],
            {
              difficulty: number,
            },
          );

          form.updateNode({ ...nodeCopy });
        };

        return (
          <div className={editionDifficultyStyle}>
            <div>
              <p>Difficulty</p>
            </div>
            <div>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => {
                if (
                  formNode.subNodes[selectedNodeOrSubNode].difficulty === number
                )
                  return (
                    <div
                      key={number}
                      className={editionSelectedDifficultyStyle}
                      onClick={(e) => handleNumberOnClick(e, number)}
                    >
                      <p>{number}</p>
                    </div>
                  );

                return (
                  <div
                    key={number}
                    onClick={(e) => handleNumberOnClick(e, number)}
                  >
                    <p>{number}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      };

      // Return
      if (selectedNodeOrSubNode === null)
        return (
          <div className={editionStyle}>
            <div>
              <h3>Edition</h3>
            </div>
            <div>
              <p>
                Start editing the node or a subnode to see settings
                possibilities.
              </p>
            </div>
          </div>
        );
      else if (selectedNodeOrSubNode === 'node')
        return (
          <div className={editionStyle}>
            <div>
              <h3>Edition</h3>
            </div>
            {renderIcons()}
          </div>
        );
      else
        return (
          <div className={editionStyle}>
            <div>
              <h3>Edition</h3>
            </div>
            {renderDifficulty()}
            {renderIcons()}
          </div>
        );
    }

    //----------------------//
    // Render Grid SubNodes //
    //----------------------//
    function renderSubNodes() {
      // handle OnFocus
      const handleOnFocus = (id) => {
        setSelectedNodeOrSubNode(id);
      };

      // handle Title OnChange
      const handleTitleOnChange = (e, id) => {
        e.preventDefault();
        let nodeCopy = formNode;

        nodeCopy.subNodes[id] = Object.assign(nodeCopy.subNodes[id], {
          title: e.target.value,
        });

        form.updateNode({ ...nodeCopy });
      };

      // handle Description OnChange
      const handleDescriptionOnChange = (e, id) => {
        e.preventDefault();
        let nodeCopy = formNode;

        nodeCopy.subNodes[id] = Object.assign(nodeCopy.subNodes[id], {
          description: e.target.value,
        });

        form.updateNode({ ...nodeCopy });
      };

      // If there's no subNode yet
      if (numberOfSubNodes === 0)
        return (
          <div className={subNodesMessageStyle}>
            <div>
              <p>There is no SubNode yet.</p>
              <p>Would you like to add some?</p>
            </div>
            <div onClick={() => form.createSubNode()}>
              {plusIcon}
              <h3>Add SubNode</h3>
            </div>
          </div>
        );

      // If there are subNodes
      // Let's build up an array of subArrays each containing three subNodes
      // [[subNode, subNode, subNode], [subNode, subNode, subNode], ..., [subNode, subNode, subNode]]

      const subArraySize = 3;

      // +1 cause addSubNode is being considered
      const numberOfSubArrays = Math.ceil(
        (numberOfSubNodes + 1) / subArraySize,
      );

      // A copy to not change the subNodes state
      let subNodesArray = Object.values(formNode.subNodes);

      const array = new Array(numberOfSubArrays).fill(null).map((_, idx) => {
        const subArray = [];

        for (let i = 0; i < subArraySize; i++) {
          if (subNodesArray[i + idx * subArraySize])
            subArray.push(subNodesArray[i + idx * subArraySize]);
        }

        if (subArray.length < 3) subArray.push(null);

        return subArray;
      });

      // Now let's build up the JSX using the array
      let isAddSubNodeInserted = false;
      return (
        <>
          {array.map((subArray, subArrayIndex) => {
            // For each subArray
            // Return the SubArray
            return (
              <div key={subArrayIndex} className={subNodesSubArrayStyle}>
                {subArray.map((subNode, index) => {
                  // For each subNode

                  // On the first null value 'addSubNode' is inserted
                  if (subNode === null && !isAddSubNodeInserted) {
                    isAddSubNodeInserted = true;
                    return (
                      <div
                        key={index}
                        onClick={() => form.createSubNode()}
                        className={addSubNodeStyle}
                      >
                        <div>
                          {plusIcon}
                          <h3>Add SubNode</h3>
                        </div>
                      </div>
                    );
                  }

                  // Return the subNode
                  return (
                    <div key={index} className={subNodeStyle}>
                      <div>
                        <div>
                          <form
                            onSubmit={(e) => e.preventDefault()}
                            onFocus={() => handleOnFocus(subNode.id)}
                          >
                            <input
                              type='text'
                              placeholder={titlePlaceholder}
                              value={subNode.title}
                              onChange={(e) =>
                                handleTitleOnChange(e, subNode.id)
                              }
                              maxLength={TITLE_MAX_LENGTH}
                              spellCheck={false}
                            />
                          </form>
                          <div
                            className={subNodeDeleteButtonStyle}
                            onClick={() => {
                              if (selectedNodeOrSubNode === subNode.id)
                                setSelectedNodeOrSubNode(null);
                              form.deleteSubNode(subNode.id);
                            }}
                          >
                            {closeButton}
                          </div>
                        </div>
                        <form
                          onSubmit={(e) => e.preventDefault()}
                          onFocus={() => handleOnFocus(subNode.id)}
                        >
                          <textarea
                            placeholder={descriptionPlaceholder}
                            value={subNode.description}
                            onChange={(e) =>
                              handleDescriptionOnChange(e, subNode.id)
                            }
                            maxLength={DESCRIPTION_MAX_LENGTH}
                            spellCheck={false}
                          />
                        </form>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </>
      );
    }

    //-------------//
    // Grid Return //
    //-------------//
    return (
      <>
        <div className={gridStyle}>
          {renderOverallData()}
          {renderNode()}
          {renderEdition()}
        </div>
        <div className={subNodesArrayStyle}>{renderSubNodes()}</div>
      </>
    );
  }

  //--------//
  // Return //
  //--------//
  //! Return
  return (
    <>
      <div className={formStyle}>
        {renderTitle()}
        {renderGrid()}
      </div>
      <div className={closeButtonStyle} onClick={form.closeButton}>
        {closeButton}
      </div>
    </>
  );
};

export default TreeNodeForm;
