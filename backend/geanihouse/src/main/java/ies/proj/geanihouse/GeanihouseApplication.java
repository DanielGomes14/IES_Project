package ies.proj.geanihouse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.messaging.Sink;

@EnableBinding(Sink.class)
@SpringBootApplication
public class GeanihouseApplication {

	public static void main(String[] args) {
		SpringApplication.run(GeanihouseApplication.class, args);
	}

}
