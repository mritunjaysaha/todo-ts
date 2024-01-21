import { TabKeys } from "@/types/tabKeys";
import { FC } from "react";

type TabsProps = {
    currentTab: TabKeys;
    handleTabsClick: (e: any) => void;
};

export const Tabs: FC<TabsProps> = ({ currentTab, handleTabsClick }) => {
    return (
        <div onClick={handleTabsClick} className="flex gap-2">
            <button
                data-tab="ALL"
                className={currentTab === "ALL" ? "active-tab" : "tab"}
            >
                Show all tasks
            </button>
            <button
                data-tab="ACTIVE"
                className={currentTab === "ACTIVE" ? "active-tab" : "tab"}
            >
                Show active tasks
            </button>
            <button
                data-tab="COMPLETED"
                className={currentTab === "COMPLETED" ? "active-tab" : "tab"}
            >
                Show completed tasks
            </button>
        </div>
    );
};
