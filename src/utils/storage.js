export const loadData = () => JSON.parse(localStorage.getItem("kanban"));
export const saveData = (data) => localStorage.setItem("kanban", JSON.stringify(data));
