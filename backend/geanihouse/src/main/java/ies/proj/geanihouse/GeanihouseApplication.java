package ies.proj.geanihouse;

import ies.proj.geanihouse.repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.messaging.Sink;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


@EnableBinding(Sink.class)
@SpringBootApplication
@EnableJpaRepositories(basePackageClasses = UserRepository.class)
public class GeanihouseApplication {

	public static void main(String[] args) {
		SpringApplication.run(GeanihouseApplication.class, args);
	}


}
