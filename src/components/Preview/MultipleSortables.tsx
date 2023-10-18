// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   DndContext,
//   DragOverlay,
//   UniqueIdentifier,
//   useDroppable,
// } from "@dnd-kit/core";
// import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { useState } from "react";

// export function Item(props: any) {
//   const { id } = props;

//   const style = {
//     width: "100%",
//     height: 50,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     border: "1px solid black",
//     margin: "10px 0",
//     background: "white",
//   };

//   return <div style={style}>{id}</div>;
// }

// export function SortableItem(props: any) {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: props.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       <Item id={props.id} />
//     </div>
//   );
// }

// const containerStyle = {
//   background: "#dadada",
//   padding: 10,
//   margin: 10,
//   flex: 1,
// };

// export function Container(props: any) {
//   const { id, items } = props;

//   const { setNodeRef } = useDroppable({
//     id,
//   });

//   return (
//     <SortableContext id={id} items={items}>
//       <div ref={setNodeRef} style={containerStyle}>
//         {items.map((id) => (
//           <SortableItem key={id} id={id} />
//         ))}
//       </div>
//     </SortableContext>
//   );
// }

// const wrapperStyle: any = {
//   display: "flex",
//   flexDirection: "row",
// };

// export default function App() {
//   const [items, setItems] = useState({
//     root: ["1", "2", "3"],
//     container1: ["4", "5", "6"],
//     container2: ["7", "8", "9"],
//     container3: [],
//   });
//   const [activeId, setActiveId] = useState<null | UniqueIdentifier>(null);

//   return (
//     <div style={wrapperStyle}>
//       <DndContext
//         onDragStart={handleDragStart}
//         onDragOver={handleDragOver}
//         onDragEnd={handleDragEnd}
//       >
//         <Container id="root" items={items.root} />
//         <Container id="container1" items={items.container1} />
//         <Container id="container2" items={items.container2} />
//         <Container id="container3" items={items.container3} />
//         <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
//       </DndContext>
//     </div>
//   );

//   function findContainer(id: string) {
//     if (id in items) {
//       return id;
//     }

//     return Object.keys(items).find((key) => items[key].includes(id));
//   }

//   function handleDragStart(event) {
//     const { active } = event;
//     const { id } = active;

//     setActiveId(id);
//   }

//   function handleDragOver(event) {
//     const { active, over, draggingRect } = event;
//     const { id } = active;
//     const { id: overId } = over;

//     // Find the containers
//     const activeContainer = findContainer(id);
//     const overContainer = findContainer(overId);

//     if (
//       !activeContainer ||
//       !overContainer ||
//       activeContainer === overContainer
//     ) {
//       return;
//     }

//     setItems((prev) => {
//       const activeItems = prev[activeContainer];
//       const overItems = prev[overContainer];

//       // Find the indexes for the items
//       const activeIndex = activeItems.indexOf(id);
//       const overIndex = overItems.indexOf(overId);

//       let newIndex;
//       if (overId in prev) {
//         // We're at the root droppable of a container
//         newIndex = overItems.length + 1;
//       } else {
//         const isBelowLastItem =
//           over &&
//           overIndex === overItems.length - 1 &&
//           draggingRect &&
//           draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

//         const modifier = isBelowLastItem ? 1 : 0;

//         newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
//       }

//       return {
//         ...prev,
//         [activeContainer]: [
//           ...prev[activeContainer].filter((item) => item !== active.id),
//         ],
//         [overContainer]: [
//           ...prev[overContainer].slice(0, newIndex),
//           items[activeContainer][activeIndex],
//           ...prev[overContainer].slice(newIndex, prev[overContainer].length),
//         ],
//       };
//     });
//   }

//   function handleDragEnd(event) {
//     const { active, over } = event;
//     const { id } = active;
//     const { id: overId } = over;

//     const activeContainer = findContainer(id);
//     const overContainer = findContainer(overId);

//     if (
//       !activeContainer ||
//       !overContainer ||
//       activeContainer !== overContainer
//     ) {
//       return;
//     }

//     const activeIndex = items[activeContainer].indexOf(active.id);
//     const overIndex = items[overContainer].indexOf(overId);

//     if (activeIndex !== overIndex) {
//       setItems((items) => ({
//         ...items,
//         [overContainer]: arrayMove(
//           items[overContainer],
//           activeIndex,
//           overIndex,
//         ),
//       }));
//     }

//     setActiveId(null);
//   }
// }
