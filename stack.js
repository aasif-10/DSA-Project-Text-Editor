class Stack {
  constructor() {
    this.size = 0;
    this.stack = [];
    this.buffer = 10;
  }

  clear() {
    this.size = 0;
    this.stack = [];
  }

  isEmpty() {
    return this.size === 0;
  }

  top() {
    return this.isEmpty() ? null : this.stack[this.size - 1];
  }

  pop() {
    if (!this.isEmpty()) {
      this.size--;
      return this.stack.pop();
    } else {
      return [-1, ""];
    }
  }

  push(type, char) {
    if (this.isEmpty()) {
      if (type === 0) this.stack.push([type, char]);
      this.size++;
    } else {
      let top = this.top();
      if (top[0] === type && top[1].length < this.buffer) {
        top[1] += char;
      } else {
        this.stack.push([type, char]);
        this.size++;
      }
    }
  }
}

export { Stack };
