FROM openjdk:11
#CMD ["./mvnw", "clean", "package"]
COPY images images/
ARG JAR_FILE_PATH=/build/libs/seonbi-1.0-SNAPSHOT.jar
COPY ${JAR_FILE_PATH} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
EXPOSE 8000