import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { TreeContext } from '../contexts/TreeContext';
import styles from '../styles/components/NavBar.module.css';

const NavBar = (props) => {
  //! Variables and Constants
  //------------//
  // useHistory //
  //------------//
  const history = useHistory();

  //--------//
  // Styles //
  //--------//
  const navBarStyle = styles.navBar;
  const iconStyle = styles.icon;
  const subIconStyle = styles.subIcon;

  const subNavBarBackground = styles.subNavBarBackground;
  const subNavBarStyle = styles.subNavBar;

  //--------//
  // Images //
  //--------//
  const navBarIcons = {
    BlackBox: (
      <svg viewBox='0 0 50 50' fill='none'>
        <path
          d='M25.0001 0.866026L44.0479 11.8634L25.0001 22.856L5.95191 11.8634L25.0001 0.866026Z'
          fill='black'
          stroke='white'
          strokeWidth='1.5'
        />
        <path
          d='M22.7803 48.701L3.73193 37.7035V15.7087L22.7803 26.7013V48.701Z'
          fill='black'
          stroke='white'
          strokeWidth='1.5'
        />
        <path
          d='M46.2681 15.7087V37.7035L27.2202 48.701V26.7013L46.2681 15.7087Z'
          fill='black'
          stroke='white'
          strokeWidth='1.5'
        />
      </svg>
    ),
    EditTool: (
      <svg viewBox='0 0 50 50' fill='none'>
        <path
          d='M48.4055 11.5537L48.4011 11.5526C48.2291 11.5088 48.0415 11.559 47.9096 11.6909L47.9095 11.691L46.1801 13.4197C46.1799 13.42 46.1796 13.4203 46.1793 13.4206C46.1561 13.444 46.1383 13.4657 46.1262 13.483L46.1233 13.4871C45.8947 13.8087 45.6544 14.097 45.3897 14.3614L44.1916 15.5596L44.1915 15.5597C42.8902 16.8609 41.1548 17.5788 39.3155 17.5788C37.4734 17.5788 35.7407 16.8607 34.4395 15.5597L34.4394 15.5596C31.7511 12.8703 31.751 8.4965 34.4394 5.80763L34.9698 6.33791L34.4394 5.80761L38.1942 2.05245L38.1949 2.05173C38.3254 1.92154 38.3767 1.73296 38.3311 1.5568L38.3303 1.55389C38.2845 1.3737 38.1494 1.23464 37.9749 1.18398L37.9731 1.18346C36.9918 0.895878 35.9751 0.75 34.9505 0.75C32.0979 0.75 29.424 1.85698 27.411 3.87062L27.4108 3.87084L24.4128 6.86735C21.0973 10.1819 20.3634 15.3203 22.5134 19.4091L22.7704 19.8979L22.3798 20.2885L2.26714 40.4001C2.2671 40.4001 2.26707 40.4002 2.26703 40.4002C0.246127 42.4219 0.246458 45.7116 2.26694 47.7313L2.26724 47.7316C3.2464 48.7115 4.54637 49.25 5.93176 49.25C7.31626 49.25 8.61625 48.7115 9.59544 47.7316L9.59566 47.7314L29.7076 27.6209L30.0987 27.2299L30.5878 27.4878C32.1166 28.2939 33.8207 28.7158 35.572 28.7158H35.5721H35.5721H35.5722H35.5722H35.5722H35.5723H35.5723H35.5723H35.5724H35.5724H35.5724H35.5725H35.5725H35.5725H35.5725H35.5726H35.5726H35.5726H35.5727H35.5727H35.5727H35.5728H35.5728H35.5728H35.5729H35.5729H35.5729H35.573H35.573H35.573H35.5731H35.5731H35.5731H35.5732H35.5732H35.5732H35.5732H35.5733H35.5733H35.5733H35.5734H35.5734H35.5734H35.5735H35.5735H35.5735H35.5736H35.5736H35.5736H35.5736H35.5737H35.5737C38.429 28.7158 41.1106 27.6054 43.1305 25.5872C43.1306 25.5871 43.1306 25.5871 43.1307 25.587C43.1307 25.5869 43.1308 25.5869 43.1308 25.5869L46.1269 22.5895L46.1271 22.5894C48.9199 19.7969 49.9371 15.7051 48.7777 11.9079L48.4055 11.5537ZM48.4055 11.5537C48.5822 11.5975 48.7236 11.7311 48.7777 11.9077L48.4055 11.5537ZM4.77145 41.9205C3.85779 42.8341 3.85788 44.3155 4.77139 45.2293L4.77181 45.2297C5.68456 46.1412 7.16625 46.1411 8.07906 45.2297L8.07983 45.229C8.99274 44.3148 8.99349 42.8348 8.07989 41.9209M4.77145 41.9205L5.30178 42.4508L4.7711 41.9208C4.77122 41.9207 4.77134 41.9206 4.77145 41.9205ZM4.77145 41.9205C5.68447 41.0066 7.16708 41.0067 8.07989 41.9209M8.07989 41.9209C8.07973 41.9207 8.07957 41.9206 8.07942 41.9204L7.54928 42.4507L8.07989 41.9209Z'
          fill='black'
          stroke='white'
          strokeWidth='1.5'
        />
      </svg>
    ),
    createNode: (
      <svg viewBox='0 0 46 50' fill='none'>
        <path
          d='M32.3573 27.8701C32.3573 34.3484 27.2574 39.5636 21.0107 39.5636C14.764 39.5636 9.66406 34.3484 9.66406 27.8701C9.66406 21.3919 14.764 16.1766 21.0107 16.1766C27.2574 16.1766 32.3573 21.3919 32.3573 27.8701Z'
          fill='black'
          stroke='white'
          strokeWidth='1.5'
        />
        <path
          d='M9.9674 17.6641C9.9674 19.5909 8.45431 21.1165 6.63214 21.1165C4.80997 21.1165 3.29688 19.5909 3.29688 17.6641C3.29688 15.7372 4.80997 14.2117 6.63214 14.2117C8.45431 14.2117 9.9674 15.7372 9.9674 17.6641Z'
          fill='black'
          stroke='white'
          strokeWidth='1.5'
        />
        <path
          d='M39.2545 37.9665C39.2545 39.8933 37.7414 41.4189 35.9192 41.4189C34.0971 41.4189 32.584 39.8933 32.584 37.9665C32.584 36.0397 34.0971 34.5141 35.9192 34.5141C37.7414 34.5141 39.2545 36.0397 39.2545 37.9665Z'
          fill='black'
          stroke='white'
          strokeWidth='1.5'
        />
        <path
          d='M10.6041 38.6212C10.6041 40.548 9.09103 42.0736 7.26886 42.0736C5.44669 42.0736 3.93359 40.548 3.93359 38.6212C3.93359 36.6943 5.44669 35.1688 7.26886 35.1688C9.09103 35.1688 10.6041 36.6943 10.6041 38.6212Z'
          fill='black'
          stroke='white'
          strokeWidth='1.5'
        />
        <path
          d='M7.42053 28.1428C7.42053 30.0697 5.90743 31.5952 4.08526 31.5952C2.26309 31.5952 0.75 30.0697 0.75 28.1428C0.75 26.216 2.26309 24.6904 4.08526 24.6904C5.90743 24.6904 7.42053 26.216 7.42053 28.1428Z'
          fill='black'
          stroke='white'
          strokeWidth='1.5'
        />
        <path
          d='M20.7324 16.203V0M32.2524 24.6523L45.001 18.3673M20.7324 39.6009V50'
          stroke='white'
          strokeWidth='1.5'
        />
      </svg>
    ),
    createPath: (
      <svg viewBox='0 0 44 38' fill='none'>
        <path
          d='M26.9421 5.38831L5.38867 19.0388L37.3595 30.8932L14.01 37'
          stroke='white'
          strokeWidth='1.5'
        />
        <circle
          cx='26.9411'
          cy='5.38835'
          r='4.63835'
          fill='black'
          stroke='white'
          strokeWidth='1.5'
        />
        <circle
          cx='5.38835'
          cy='19.0389'
          r='4.63835'
          fill='black'
          stroke='white'
          strokeWidth='1.5'
        />
        <circle
          cx='37.7184'
          cy='30.534'
          r='4.63835'
          fill='black'
          stroke='white'
          strokeWidth='1.5'
        />
      </svg>
    ),
  };

  //! States
  //--------//
  // States //
  //--------//
  const [isShowingSubNavBar, setIsShowingSubNavBar] = useState(null);

  //! Functions
  //------------//
  // Get Action //
  //------------//
  function getAction(iconAction) {
    let { handleOnClick, link } = iconAction;
    if (link) handleOnClick = () => history.push(link);

    return handleOnClick;
  }

  //----------------------------//
  // Render Item With SubNavBar //
  //----------------------------//
  const renderItemWithSubNavBar = (iconName, iconAction) => {
    function showSubNavBar(iconName) {
      // If it's already set to iconName
      if (isShowingSubNavBar === iconName) setIsShowingSubNavBar(null);
      else setIsShowingSubNavBar(iconName);
    }

    function renderSubNavBar(subNavBar) {
      // Get subIcons
      const subIcons = Object.entries(subNavBar);

      // For each subIcon
      return subIcons.map((subIcon) => {
        const [subIconName, subIconAction] = subIcon;

        const handleOnClick = getAction(subIconAction);

        return (
          <div
            key={subIconName}
            className={subIconStyle}
            onClick={handleOnClick}
          >
            {navBarIcons[subIconName]}
          </div>
        );
      });
    }

    // Return
    if (isShowingSubNavBar === iconName)
      return (
        <div
          key={iconName}
          className={[subNavBarStyle, subNavBarBackground].join(' ')}
        >
          <div className={iconStyle} onClick={() => showSubNavBar(iconName)}>
            {navBarIcons[iconName]}
          </div>
          <div id='white-bar'></div>
          <div id='subIcons'>{renderSubNavBar(iconAction.subNavBar)}</div>
        </div>
      );
    else
      return (
        <div
          key={iconName}
          className={iconStyle}
          onClick={() => showSubNavBar(iconName)}
        >
          {navBarIcons[iconName]}
        </div>
      );
  };

  //-------------------------------//
  // Render Item Without SubNavBar //
  //-------------------------------//
  const renderItemWithoutSubNavBar = (iconName, iconAction) => {
    const handleOnClick = getAction(iconAction);

    // Return
    return (
      <div key={iconName} className={iconStyle} onClick={handleOnClick}>
        {navBarIcons[iconName]}
      </div>
    );
  };

  //---------------//
  // Render NavBar //
  //---------------//
  const renderNavBar = () => {
    // Get icons
    const icons = Object.entries(props);

    // For each icon
    return icons.map((icon) => {
      const [iconName, iconAction] = icon;

      // Icon With SubNavBar
      if (iconAction.hasOwnProperty('subNavBar'))
        return renderItemWithSubNavBar(iconName, iconAction);

      // Icon Without SubNavBar
      return renderItemWithoutSubNavBar(iconName, iconAction);
    });
  };

  //--------//
  // Return //
  //--------//
  return <div className={navBarStyle}>{renderNavBar()}</div>;
};

//! TreeNavBar
const TreeNavBar = () => {
  const { menu } = useContext(TreeContext);

  const navBarProps = {
    BlackBox: {
      link: '/',
    },
    EditTool: {
      subNavBar: {
        createNode: {
          handleOnClick: menu.createNode,
        },
        createPath: {
          handleOnClick: menu.createPath,
        },
      },
    },
  };
  return <NavBar {...navBarProps} />;
};

export { TreeNavBar };
