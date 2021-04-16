class Node {
  constructor(
    title,
    description,
    icon,
    difficulty,
    parents = [],
    children = [],
    subNodes = [],
    position = { x: 0, y: 0 },
    status = 'pending',
  ) {
    this.title = title;
    this.description = description;
    this.icon = icon;
    this.difficulty = difficulty;
    this.parents = parents;
    this.children = children;
    this.subNodes = subNodes;
    this.position = position;
    this.status = status;
  }
}

module.exports = Node;
