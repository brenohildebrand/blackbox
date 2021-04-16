class Tree {
  constructor(
    title = { text: '', position: { x: 0, y: 0 } },
    description,
    icon,
    nodes = [],
    paths = [],
  ) {
    this.title = title;
    this.description = description;
    this.icon = icon;
    this.nodes = nodes;
    this.paths = paths;
  }
}

module.exports = Tree;
