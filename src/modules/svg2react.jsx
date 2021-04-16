import { createElement } from 'react';
import { parse } from 'svg-parser';

function buildReactElement(parsedSvg) {
  // Get Properties
  let { tagName, properties, children } = parsedSvg;

  // Top Down Approach
  const childrenElements = children.map((child, idx) => {
    child.properties.key = idx;
    return buildReactElement(child);
  });

  // Create the React Element
  const element = createElement(tagName, properties, childrenElements);

  // Returning
  return element;
}

function svg2react(svgString, props = {}) {
  if (typeof svgString !== 'string') return null;

  // Parse the svgString
  let parsedSvg = parse(svgString);

  parsedSvg.children[0].properties = Object.assign(
    parsedSvg.children[0].properties,
    props,
  );

  return buildReactElement(parsedSvg.children[0]);
}

export default svg2react;
