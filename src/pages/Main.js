import React from "react";
import ResponsiveAppBar from "../components/Bar";
import Footer from "../components/Footer";
import CollapsibleTable from "../components/main_page/Table";

function Main() {
  return (
    <div>
      <ResponsiveAppBar />
      <CollapsibleTable />
      <Footer />
    </div>
  );
}

export default Main;
