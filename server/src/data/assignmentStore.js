// reads and writes the array
let assignments = [];
let nextId = 1;

export function getAll() {
  return assignments;
}

export function getById(id) {
  return assignments.find((a) => a.id === id);
}

export function insert(data) {
  const assignment = { id: nextId++, ...data };
  assignments.push(assignment);
  return assignment;
}

export function update(id, changes) {
  const assignment = getById(id);
  if (!assignment) return undefined;
  Object.assign(assignment, changes);
  return assignment;
}

export function remove(id) {
  const index = assignments.findIndex((a) => a.id === id);
  if (index === -1) return false;
  assignments.splice(index, 1);
  return true;
}


export function reset() {
  assignments = [];
  nextId = 1;
}