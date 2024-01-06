import { useState } from "react";
import SidebarItem from "../molecules/SidebarItem";
import { useAppSelector } from "../../hooks/reduxHooks";

const SideBar = () => {
  const [active, setActive] = useState(false);
  const { sidebarMenu } = useAppSelector((store) => store.sidebar);
  return (
    <div
      onMouseMove={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={
        "w-sidebar hover:w-[280px] min-h-screen fixed left-0 bg-secondary z-[1] font-inter flex flex-col items-center gap-[20px] pt-20 transition-all ease-in-out duration-300 overflow-hidden" +
        (active ? " justify-start w-[250px]" : "")
      }
    >
      {sidebarMenu.map((item) => (
        <SidebarItem
          key={Math.random().toString(6) + item.id}
          id={item.id}
          sidebarAtive={active}
          title={item.title}
          link={item.link}
          icon={item.icon}
          active={item.active}
          subItems={item.subItems}
          parrentId={item.id}
        />
      ))}
    </div>
  );
};

export default SideBar;
