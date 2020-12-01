import React from "react";
import { Container } from "shards-react";
import FormNewDevice from "../components/new-device/FormNewDevice";


const NewDevice = ({ title }) => (
    <Container fluid className="main-content-container  px-4 py-5 d-flex justify-content-center">

      <FormNewDevice></FormNewDevice>

    </Container>

);


export default NewDevice;