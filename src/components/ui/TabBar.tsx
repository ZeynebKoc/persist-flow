import { TabView } from "../../types/todo.types";
import { tabs } from "../../config/tabBarConfig.ts";

interface TabBarProps {
  activeTab: TabView;
  counts: Record<TabView, number>;
  onTabChange: (tab: TabView) => void;
}

export function TabBar({ activeTab, counts, onTabChange }: TabBarProps) {
  return (
    <div className="flex gap-1 bg-surface border border-border rounded-xl p-1 transition-all duration-200">
      {tabs.map(({ view, label }) => {
        const isActive = activeTab === view;
        const isTrash = view === "trash";

        return (
          <button
            key={view}
            onClick={() => onTabChange(view)}
            className={`
            flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-[0.8rem] font-medium transition-all duration-200 cursor-pointer border
            ${isActive ? "bg-surface2 text-content border-border2" : "text-muted2 border-transparent hover:text-content"}
            `}
          >
            <div className="flex flex-col md:flex-row gap-1">
              <p>{label}</p>
              <span
                className={`
                text-[0.6rem] px-1.5 py-0.5 rounded-full duration-200 bg-surface3
                ${isActive ? "text-content" : "text-content"}
                ${isTrash  ? "bg-red-500/20 text-red-600" : ""}
              `}
             >
                {counts[view]}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}