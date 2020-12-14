package ies.proj.geanihouse.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


import java.util.Date;
@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class ErrorDetails extends  Exception {
    private static final long serialVersionUID = 1L;
    private Date timestamp;
    private String message;

    public ErrorDetails( String message)  {
        super(message);
        this.timestamp = new Date();
        this.message = message;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public String getMessage() {
        return message;
    }

}