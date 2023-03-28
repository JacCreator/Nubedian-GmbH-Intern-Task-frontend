import React from "react";
import ResponsiveAppBar from "../components/Bar";
import Footer from "../components/Footer";
import Form from "../components/editcpu_page/Form";
import { useParams } from "react-router-dom";

function EditCpu() {
  const { id } = useParams();

  return (
    <div>
      <ResponsiveAppBar />
      <Form id={id} />
      <Footer />
    </div>
  );
}

export default EditCpu;
