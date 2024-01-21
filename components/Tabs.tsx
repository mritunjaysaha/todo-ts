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
                className={`tab ${currentTab === "ALL" ? "active-tab" : ""}`}
            >
                Show all tasks
            </button>
            <button
                data-tab="ACTIVE"
                className={`tab ${currentTab === "ACTIVE" ? "active-tab" : ""}`}
            >
                Show active tasks
            </button>
            <button
                data-tab="COMPLETED"
                className={`tab ${
                    currentTab === "COMPLETED" ? "active-tab" : ""
                }`}
            >
                Show completed tasks
            </button>
        </div>
    );
};
