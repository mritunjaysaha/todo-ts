import { TabListItem } from "@/components/TabListItem";
import { useSelector } from "@/lib/redux/store";
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
    const { todo, allTodoIdArr, activeTodoArr, completedTodoArr } = useSelector(
        (state) => state.todoData
    );

    const todoIdArrObj: Record<TabKeys, string[]> = {
        ALL: allTodoIdArr,
        ACTIVE: activeTodoArr,
        COMPLETED: completedTodoArr,
    };

    const remainingTodos = activeTodoArr.length;

    return (
        <ul onClick={handleTodoListClick}>
            <p>
                {remainingTodos
                    ? `${remainingTodos} tasks remaining`
                    : "All tasks completed"}{" "}
            </p>

            {todoIdArrObj[currentTab].map((id) => {
                const data = todo[id];

                return <TabListItem key={id} {...data} />;
            })}
        </ul>
    );
};
