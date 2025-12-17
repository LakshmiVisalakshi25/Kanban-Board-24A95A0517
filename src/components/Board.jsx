import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Column from "./Column";

const columns = [
  { id: "todo", title: "To Do" },
  { id: "progress", title: "In Progress" },
  { id: "review", title: "Review" },
  { id: "done", title: "Done" },
];

export default function Board({ data, setData, filters }) {
  return (
    <div className="grid md:grid-cols-4 gap-4 p-4">
      {columns.map((col) => (
        <SortableContext
          key={col.id}
          items={data.columns[col.id].map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <Column column={col} tasks={data.columns[col.id]} data={data} setData={setData} filters={filters} />
        </SortableContext>
      ))}
    </div>
  );
}
