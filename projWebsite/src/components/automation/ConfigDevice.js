import React from "react";
import { Card, CardBody, CardHeader, FormCheckbox} from "shards-react";
import PageTitle from "../common/PageTitle";
/*
    Configure Default

    @param : name (device name), division (division name)

    Used in the Automation view
*/


class ConfigDevice extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            
            /*
                Don't know why but width 1000 works 
            */
            <Card style={{width:1000}}>
                <CardHeader>
                    <PageTitle title={this.props.name} subtitle={this.props.division} className="text-sm-left" sm="4" />
                </CardHeader>
                <CardBody>
                    <div className="px-3">
                        <FormCheckbox toggle defaultChecked> Off/On </FormCheckbox>
                    </div>
                </CardBody>
            </Card>
        );
    }



}


export default ConfigDevice;