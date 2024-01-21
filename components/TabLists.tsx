import { TabListItem } from "@/components/TabListItem";
import { updateTodoStatus } from "@/lib/redux/slices/todoSlice/todoSlice";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { TabKeys } from "@/types/tabKeys";
import { FC } from "react";

type TabListsProps = {
    currentTab: TabKeys;
    handleTodoListClick: (e: any) => void;
};

export const TabLists: FC<TabListsProps> = ({
    currentTab,
    handleTodoListClick,
}) => {
    const dispatch = useDispatch();
    const { todo, allTodoIdArr, activeTodoArr, completedTodoArr } = useSelector(
        (state) => state.todoData
    );

    const todoIdArrObj: Record<TabKeys, string[]> = {
        ALL: allTodoIdArr,
        ACTIVE: activeTodoArr,
        COMPLETED: completedTodoArr,
    };

    const remainingTodos = activeTodoArr.length;

    const onChangeStatus = (todoId: string) => {
        const currentTodo = todo[todoId];
        if (currentTodo.status === "ACTIVE") {
            dispatch(updateTodoStatus({ ...currentTodo, status: "COMPLETED" }));
        } else {
            dispatch(updateTodoStatus({ ...currentTodo, status: "ACTIVE" }));
        }
    };

    if (!allTodoIdArr.length) {
        return <></>;
    }

    return (
        <ul
            onClick={handleTodoListClick}
            className="flex flex-col gap-8 w-full md:w-11/12 lg:w-2/3 xl:w-1/2 bg-slate-900 rounded-md p-10 overflow-y-auto  max-h-[60vh] custom-scrollbar"
        >
            <p className="text-2xl font-semibold">
                {remainingTodos
                    ? `${remainingTodos} tasks remaining`
                    : "All tasks completed"}{" "}
            </p>

            {todoIdArrObj[currentTab].map((id) => {
                const data = todo[id];

                return (
                    <TabListItem
                        key={id}
                        {...data}
                        onChangeStatus={onChangeStatus}
                    />
                );
            })}
        </ul>
    );
};
