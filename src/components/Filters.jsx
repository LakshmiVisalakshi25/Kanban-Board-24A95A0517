export default function Filters({ filters, setFilters }) {
return (
<div className="flex flex-wrap gap-2 mb-4">
<input
placeholder="Search"
className="border p-1"
value={filters.search}
onChange={e => setFilters({ ...filters, search: e.target.value })}
/>
<select className="border p-1" onChange={e => setFilters({ ...filters, priority: e.target.value })}>
<option value="">All Priority</option>
<option value="Low">Low</option>
<option value="Medium">Medium</option>
<option value="High">High</option>
</select>
</div>
);
}