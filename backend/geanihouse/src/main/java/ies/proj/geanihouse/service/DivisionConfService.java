package ies.proj.geanihouse.service;

import ies.proj.geanihouse.model.*;
import ies.proj.geanihouse.repository.DivisionConfRepository;
import ies.proj.geanihouse.repository.TypeRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DivisionConfService {

    private static final Logger LOG = LogManager.getLogger(DivisionConf.class);

    @Autowired
    private TypeRepository typeRepository;

    @Autowired
    private DivisionConfRepository divisionConfRepository;

    public void addDefaultConfigurations(Division d){
        for (Sensor s : d.getSensors()) {
            Type type = typeRepository.findByName(s.getType().getName());
            double minValue = 0;
            double maxValue = 0;

            if (type.getName().equals("Temperature")){
                minValue = 17;
                maxValue = 22;
            } else if (type.getName().equals("Humidity")){
                minValue = 50;
                maxValue = 55;
            } else if (type.getName().equals("Luminosity")){
                minValue = 55;
                maxValue = 60;
            }

            DivisionConf divisionConf = new DivisionConf(0, d, s.getType(), minValue, maxValue);

            String error_message = this.checkConfsTypes(divisionConf, d);
            if (error_message == null) {
                divisionConfRepository.save(divisionConf);
            }
        }
    }



    public String checkValuesContraints(DivisionConf divisionConf){
        String error_message=null;
        String type = divisionConf.getType().getName();
        if (divisionConf.getMinValue() > divisionConf.getMaxValue()){
            error_message = "Invalid Values, minimum value cannot be less than the max value!";
            LOG.warn(error_message);
        }
        else if(divisionConf.getMaxValue() - divisionConf.getMinValue() <= 5){
            error_message = "Invalid Values, the difference between the max and min value must be greater than 1!";
            LOG.warn(error_message);
        }

        double minValue = divisionConf.getMinValue();
        double maxValue = divisionConf.getMaxValue();

        if (type.equals("Temperature")){
            minValue = 15;
            maxValue = 35;
        }else if (type.equals("Humidity")){
            minValue = 40;
            maxValue = 60;
        }else if (type.equals("Luminosity")){
            minValue = 20;
            maxValue = 80;
        }

        if ( minValue > divisionConf.getMinValue() || maxValue < divisionConf.getMaxValue())
            error_message = "Invalid Values, "+type+" values are between "+ minValue+ "-"+maxValue;

        return error_message;
    }

    public String checkConfsTypes(DivisionConf divisionConf, Division division){
        //verify if there's not a sensor of the type present on the configuration that we want to add
        String error_message = null;
        boolean valid = false;
        boolean validdevice=false;

        for(Sensor s : division.getSensors()){
            if (s.getType().getName().equals(divisionConf.getType().getName())) {
                valid = true;
                break;
            }
        }
        if (!valid){
            error_message="Cannot add a configuration of type " + divisionConf.getType().getName() + " without a sensor of this type";
            LOG.warn(error_message);
            return error_message;
        }
        for (Device d : division.getDevices()){
            if(d.getType().getName().equals(divisionConf.getType().getName())){
                validdevice=true;
            }
        }
        if (!validdevice) {
            error_message="Cannot add a configuration of type " + divisionConf.getType().getName() + " without a device of this type";
            LOG.warn(error_message);
            return error_message;
        }
        for (DivisionConf conf : division.getDivisionConf()){
            if(conf.getType().getName().equals(divisionConf.getType().getName())){
                error_message = "Cannot have two configurations of same type in the division " + division.getId();
                LOG.warn(error_message);
                return error_message;
            }
        }
        return error_message;
    }
}
