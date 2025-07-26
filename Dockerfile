FROM maven:3.9.4-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/todolist-1.0.0.jar app.jar
EXPOSE 8080
CMD ["java", "-Dserver.port=${PORT:-8080}", "-jar", "app.jar"]
