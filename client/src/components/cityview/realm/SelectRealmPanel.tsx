import { useEffect, useMemo, useState } from "react";
import useRealmStore from "../../../hooks/store/useRealmStore";
import { useTrade } from "../../../hooks/helpers/useTrade";
import { useCaravan } from "../../../hooks/helpers/useCaravans";
import { getLatestRealmId } from "../../../hooks/graphql/useGraphQLQueries";
import { getRealm } from "../../../utils/realms";
import { getOrderName } from "../../../constants/orders";
import { OrderIcon } from "../../../elements/OrderIcon";
import { SortButton, SortInterface } from "../../../elements/SortButton";
import { SortPanel } from "../../../elements/SortPanel";

export interface SelectRealmInterface {
  id: number;
  name: string;
  order: string;
  distance: number;
}

export const SelectRealmPanel = ({
  selectedRealmId,
  setSelectedRealmId,
}: {
  selectedRealmId: number | undefined;
  setSelectedRealmId: (selectedRealmId: number) => void;
}) => {
  const [specifyRealmId, setSpecifyRealmId] = useState(false);
  const [allRealms, setAllRealms] = useState<SelectRealmInterface[]>([]); // This would ideally be populated from an API call or similar.

  const { realmId, realmEntityId } = useRealmStore();

  const { getRealmEntityIdFromRealmId } = useTrade();

  const { calculateDistance } = useCaravan();

  const sortingParams = useMemo(() => {
    return [
      { label: "Order", sortKey: "order" },
      { label: "Realm ID", sortKey: "id", className: "ml-4" },
      { label: "Name", sortKey: "name", className: "ml-auto mr-4" },
      { label: "Distance", sortKey: "distance", className: "" },
    ];
  }, []);

  const [activeSort, setActiveSort] = useState<SortInterface>({
    sortKey: "number",
    sort: "none",
  });

  useEffect(() => {
    const buildSelectableRealms = async () => {
      const realm_id = await getLatestRealmId();
      let realms = Array.from({ length: realm_id }, (_, i) => i + 1)
        .map((id) => {
          const { name, order, realm_id: takerRealmId } = getRealm(id);
          const takerEntityId = getRealmEntityIdFromRealmId(takerRealmId);
          const distance = takerEntityId ? calculateDistance(realmEntityId, takerEntityId) || 0 : 0;
          return {
            id,
            name,
            order: getOrderName(order),
            distance,
          };
        })
        .filter((realm) => realm.id !== realmId && realm.id !== 1);
      setAllRealms(realms);
    };
    buildSelectableRealms();
  }, []);

  useEffect(() => {
    setAllRealms((prevRealms) => sortRealms(prevRealms, activeSort));
  }, [activeSort]);

  return (
    <div className="flex flex-col items-center w-full p-2">
      {!specifyRealmId && (
        <div
          onClick={() => setSpecifyRealmId(true)}
          className="w-full mx-4 h-8 py-[7px] bg-dark-brown cursor-pointer rounded justify-center items-center"
        >
          <div className="text-xs text-center text-gold"> + Make Direct Offer</div>
        </div>
      )}
      {specifyRealmId && (
        <div
          onClick={() => setSpecifyRealmId(false)}
          className="w-full mx-4 h-8 py-[7px] bg-dark-brown cursor-pointer rounded justify-center items-center"
        >
          <div className="text-xs text-center text-gold">Back to Market Offer</div>
        </div>
      )}
      {specifyRealmId && realmEntityId && (
        <div className="flex flex-col">
          <SortPanel className="px-3 py-2">
            {sortingParams.map(({ label, sortKey, className }) => (
              <SortButton
                className={className}
                key={sortKey}
                label={label}
                sortKey={sortKey}
                activeSort={activeSort}
                onChange={(_sortKey, _sort) => {
                  setActiveSort({
                    sortKey: _sortKey,
                    sort: _sort,
                  });
                }}
              />
            ))}
          </SortPanel>
          <div className="flex flex-col p-2 space-y-2 max-h-40 overflow-y-auto">
            {allRealms.map(({ order, name, id: takerRealmId, distance }) => {
              return (
                <div
                  key={takerRealmId}
                  className={`flex flex-col p-2 border rounded-md ${
                    selectedRealmId === takerRealmId ? "border-order-brilliance" : ""
                  } text-xxs text-gold`}
                  onClick={() => setSelectedRealmId(takerRealmId)}
                >
                  <div className="flex items-center justify-between text-xxs">
                    <div className="flex-none mr-10">
                      <OrderIcon order={order} size="xs" />
                    </div>

                    <div className="flex-none w-20">{takerRealmId}</div>

                    <div className="flex-grow">{name}</div>

                    <div className="flex-none w-16 text-right">{`${distance.toFixed(0)} km`}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * sort realms based on active filters
 */
export function sortRealms(realms: SelectRealmInterface[], activeSort: SortInterface): SelectRealmInterface[] {
  if (activeSort.sort !== "none") {
    if (activeSort.sortKey === "id") {
      return realms.sort((a, b) => {
        if (activeSort.sort === "asc") {
          return a.id - b.id;
        } else {
          return b.id - a.id;
        }
      });
    } else if (activeSort.sortKey === "name") {
      return realms.sort((a, b) => {
        if (activeSort.sort === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    } else if (activeSort.sortKey === "distance") {
      return realms.sort((a, b) => {
        if (activeSort.sort === "asc") {
          return a.distance - b.distance;
        } else {
          return b.distance - a.distance;
        }
      });
    } else if (activeSort.sortKey === "order") {
      return realms.sort((a, b) => {
        if (activeSort.sort === "asc") {
          return parseInt(a.order) - parseInt(b.order);
        } else {
          return parseInt(b.order) - parseInt(a.order);
        }
      });
    } else {
      return realms;
    }
  } else {
    return realms.sort((a, b) => b!.id - a!.id);
  }
}