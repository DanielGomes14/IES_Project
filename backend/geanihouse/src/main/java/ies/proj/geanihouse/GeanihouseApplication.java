package ies.proj.geanihouse;

import ies.proj.geanihouse.repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.messaging.Sink;


@EnableBinding(Sink.class)
@SpringBootApplication
@EnableJpaRepositories(basePackageClasses = UserRepository.class)
public class GeanihouseApplication {

	public static void main(String[] args) {
		SpringApplication.run(GeanihouseApplication.class, args);
	}

}
