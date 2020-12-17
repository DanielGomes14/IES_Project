#### Stage 1: Build the java application

FROM openjdk:11 as build

# Set the current working directory inside the image

WORKDIR /app

# Copy maven executable to the image

COPY mvnw .

COPY .mvn .mvn

# Copy the pom.xml file

COPY pom.xml .

# Build all the dependencies in preparation to go offline.

# dependency:go-offline can be used to ensure you have all of your dependencies installed locally before you begin to work offline

# This is a separate step so the dependencies will be cached unless

# the pom.xml file has changed.

RUN ./mvnw dependency:go-offline

# Copy the project source

COPY src src

# Package the application

RUN ./mvnw clean

RUN ./mvnw package -DskipTests -Pprod,no-liquibase

RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

#### Stage 2: A minimal docker image with command to run the app

FROM openjdk:11

ARG DEPENDENCY=/app/target/dependency

# Copy project dependencies from the build stage

COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib

COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF

COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app

ENTRYPOINT ["java","-cp","app:app/lib/*","ies.proj.geanihouse.GeanihouseApplication"] # MainApp is the main class of your java app