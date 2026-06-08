import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import Column from "./Column";

const columns = [
  { id: "todo", title: "To Do" },
  { id: "progress", title: "In Progress" },
  { id: "review", title: "Review" },
  { id: "done", title: "Done" },
];

export default function Board({
  data,
  setData,
  filters,
  fetchTasks,
}) {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4 w-max">

        {columns.map((col) => (
          <div
            key={col.id}
            className="
              w-[330px]
              sm:w-[350px]
              flex-shrink-0
            "
          >
            <SortableContext
              items={data.columns[col.id].map(
                (t) => t._id
              )}
              strategy={
                verticalListSortingStrategy
              }
            >
              <Column
                column={col}
                tasks={data.columns[col.id]}
                data={data}
                setData={setData}
                filters={filters}
                fetchTasks={fetchTasks}
              />
            </SortableContext>
          </div>
        ))}

      </div>
    </div>
  );
}