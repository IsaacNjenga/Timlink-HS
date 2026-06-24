import { Drawer } from "antd";
import React from "react";

function DrawerComponent({
  children,
  openModal,
  setOpenModal,
  loading,
  title,
  width,
}) {
  return (
    <Drawer
      title={title}
      closable={{ "aria-label": "Close Button" }}
      onClose={() => setOpenModal(false)}
      open={openModal}      
      width={width}
    >
      {children}
    </Drawer>
  );
}

export default DrawerComponent;
