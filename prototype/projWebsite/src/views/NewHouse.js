import React from "react";
import {Container} from "shards-react";
import FormNewHouse from "../components/new-house/FormNewHouse";


const NewHouse = ({ title }) => (
    <Container fluid className="main-content-container  px-4 py-5 d-flex justify-content-center">

      <FormNewHouse></FormNewHouse>

    </Container>

);


export default NewHouse;