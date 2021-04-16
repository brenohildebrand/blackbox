class Path {
  constructor(id, from, to) {
    this.id = id;
    this.from = from;
    this.to = to;
    this.status = 'pending';
  }
}

module.exports = Path;
