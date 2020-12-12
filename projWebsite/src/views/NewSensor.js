import React from "react";
import { Container } from "shards-react";
import FormNewSensor from "../components/new-sensor/FormNewSensor.js";


const NewSensor = ({ title }) => (
    <Container fluid className="main-content-container  px-4 py-5 d-flex justify-content-center">

      <FormNewSensor></FormNewSensor>

    </Container>

);


export default NewSensor;