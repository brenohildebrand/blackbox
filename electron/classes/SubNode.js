class SubNode {
  constructor(
    title,
    description,
    icon,
    difficulty,
    parent,
    status = 'pending',
  ) {
    this.title = title;
    this.description = description;
    this.icon = icon;
    this.difficulty = difficulty;
    this.parent = parent;
    this.status = status;
  }
}

module.exports = SubNode;
