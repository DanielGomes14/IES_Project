import React from "react";
import { Card, CardBody, CardHeader, FormCheckbox, Slider} from "shards-react";
import PageTitle from "../common/PageTitle";
/*
    Configure Default

    @param : name (device name), division (division name), type (temp,...),isOn(boolean)

    Used in the Automation view
*/


class ConfigDevice extends React.Component{

    constructor(props){
        super(props)
    }

    

    render(){

        let type_conf;
        if (this.props.type==="temperature"){

            type_conf = <Slider
            connect
            start={[35, 40]}
            pips={{
              mode: "positions",
              values: [0, 20, 40, 60,80, 100],
              stepped: true,
              density: 5
            }}
            range={{ min: 0, max: 50 }}
          />
        }else if (this.props.type==="humidity"){
            type_conf = <Slider
            connect
            start={[35, 40]}
            pips={{
              mode: "positions",
              values: [0, 25, 50, 75, 100],
              stepped: true,
              density: 5
            }}
            range={{ min: 0, max: 100 }}
          />
        }else{
            type_conf = <div></div>
        }
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
                        <FormCheckbox toggle checked={this.props.isOn} > Off/On </FormCheckbox>
                        {type_conf}
                    </div>
                </CardBody>
            </Card>
        );
    }



}


export default ConfigDevice;