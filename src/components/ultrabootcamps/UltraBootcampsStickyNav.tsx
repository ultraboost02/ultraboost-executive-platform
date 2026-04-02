"use client";

const NAV_ITEMS = [
  { id: "ecosystem", label: "ÉCOSYSTÈMES" },
  { id: "applications", label: "APPLICATIONS" },
  { id: "specialist", label: "SPECIALIST" },
  { id: "manager", label: "MANAGER" },
  { id: "director", label: "DIRECTOR" },
  { id: "executive", label: "EXECUTIVE" },
] as const;

export type UltraBootcampsStickyNavProps = {
  /** Scroll vers #bootcamp-section-{id} */
  mode: "scroll";
  activeId?: string;
};

export type UltraBootcampsStickyNavFilterProps = {
  /** Change l’onglet actif (Home) */
  mode: "filter";
  activeId: string;
  onSelect: (id: string) => void;
};

type Props = UltraBootcampsStickyNavProps | UltraBootcampsStickyNavFilterProps;

export function UltraBootcampsStickyNav(props: Props) {
  return (
    <nav
      className="sticky top-0 z-[1000] -mx-4 border-b-2 border-[#C9A84C] bg-black/80 px-4 py-3 backdrop-blur-xl sm:-mx-0 sm:px-2"
      aria-label="Navigation UltraBootcamps"
    >
      <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-3 md:justify-between md:gap-2">
        {NAV_ITEMS.map((item) => {
          const isActive =
            props.mode === "filter" ? props.activeId === item.id : props.activeId === item.id;

          if (props.mode === "filter") {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => props.onSelect(item.id)}
                aria-pressed={isActive}
                className={`relative rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition sm:px-4 sm:text-xs ${
                  isActive
                    ? "border border-[rgba(201,168,76,0.55)] bg-[rgba(201,168,76,0.16)] text-[#F5F5F7] shadow-[0_10px_26px_rgba(212,175,55,0.12)]"
                    : "border border-transparent text-white/75 hover:border-white/10 hover:bg-white/[0.03] hover:text-[#C9A84C]"
                }`}
              >
                {item.label}
              </button>
            );
          }

          const scrollActive = props.activeId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                const el = document.getElementById(`bootcamp-section-${item.id}`);
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              aria-current={scrollActive ? "true" : undefined}
              className={`relative rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition sm:px-4 sm:text-xs ${
                scrollActive
                  ? "border border-[rgba(201,168,76,0.55)] bg-[rgba(201,168,76,0.16)] text-[#F5F5F7] shadow-[0_10px_26px_rgba(212,175,55,0.12)]"
                  : "border border-transparent text-white/75 hover:border-white/10 hover:bg-white/[0.03] hover:text-[#C9A84C]"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
