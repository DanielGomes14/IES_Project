import React from "react";
import { Card, CardBody } from "shards-react";


/*
    Configuration profiles

    @param : name (profile name)

    Used in the Automation view
*/ 


class ConfigProfile extends React.Component {

    constructor(props){
        super(props)
    }

    render() {
        
        return (
            <Card small>
                <CardBody>
                    <div>
                        <div style={{textAlign:"center"}}>
                            <h6>{this.props.name}</h6>
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    }


}


export default ConfigProfile;