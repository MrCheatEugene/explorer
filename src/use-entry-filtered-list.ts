import { useEffect, useState } from "react";
import { ENTRY_LIST_ITEM_PROPS } from "./entry-list";

function compareEntrySorter(
  a: ENTRY_LIST_ITEM_PROPS,
  b: ENTRY_LIST_ITEM_PROPS
) {
  /**
   * Sort implementation for the filtered list
   * TODO: Sort by
   */
  if (a.displayType < b.displayType) {
    return -1;
  }
  if (a.displayType > b.displayType) {
    return 1;
  }
  return 0;
}

export type ENTRY_FILTERS = {
  hideDotFiles: boolean;
  hideSystem: boolean;
  hideHidden: boolean;
};

export const useEntryFilteredList = () => {
  const [filteredEntries, setFilteredEntries] = useState<
    ENTRY_LIST_ITEM_PROPS[]
  >([]);
  const [filters, setFilters] = useState<ENTRY_FILTERS>({
    hideDotFiles: false,
    hideHidden: true,
    hideSystem: true,
  });
  const [entries, setEntries] = useState<ENTRY_LIST_ITEM_PROPS[]>([]);

  const filterEntries = (entries: ENTRY_LIST_ITEM_PROPS[]) => {
    entries = entries.sort(compareEntrySorter);
    if (filters.hideDotFiles) {
      entries = entries.filter((e: ENTRY_LIST_ITEM_PROPS) => {
        return !e.displayName.startsWith(".");
      });
    }
    if (filters.hideHidden) {
      entries = entries.filter((e: ENTRY_LIST_ITEM_PROPS) => {
        return !e.metadata?.attributes?.windows?.hidden;
      });
    }

    if (filters.hideSystem) {
      entries = entries.filter((e: ENTRY_LIST_ITEM_PROPS) => {
        return !e.metadata?.attributes?.windows?.system;
      });
    }
    return entries;
  };

  useEffect(() => {
    setFilteredEntries(() => filterEntries(entries));
  }, [entries, filters]);

  return {
    setFilters,
    setEntries,
    filters,
    filteredEntries,
  };
};
