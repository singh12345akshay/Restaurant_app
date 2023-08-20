import React from "react";
import TableComponent from "@/components/tableComponent/tableComponent";
import SideBarComponent from "@/components/sideBar/sideBarComponent";
import store from "@/store/store";
import { Provider } from "react-redux";
import menuItem from '../../data/menu_item.json'

export default function Starter() {
    const {starter}=menuItem
  return (
    <>
      <Provider store={store}>
        <SideBarComponent>
          <TableComponent item={starter} />
        </SideBarComponent>
      </Provider>
    </>
  );
}
