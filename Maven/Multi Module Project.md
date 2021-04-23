# Multi Module Project

## Parent `pom.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId></groupId>
    <artifactId></artifactId>
    <version>1.0.0</version>
    <name></name>
    <description></description>
    <packaging>pom</packaging>

    <properties>
        <java.version>11</java.version>
        <maven.compiler.source>${java.version}</maven.compiler.source>
        <maven.compiler.target>${java.version}</maven.compiler.target>
        <maven.compiler.compilerVersion>${java.version}</maven.compiler.compilerVersion>
        <file.encoding>UTF-8</file.encoding>
        <project.build.sourceEncoding>${file.encoding}</project.build.sourceEncoding>
        <project.reporting.outputEncoding>${file.encoding}</project.reporting.outputEncoding>
        <skipTests>true</skipTests>
        <spring-boot.version></spring-boot.version>
        <spring-cloud.version></spring-cloud.version>
    </properties>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring-boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <modules>
        <module></module>
    </modules>

</project>

```

## Sub Module `pom.xml` 
- Attention: module depended by other can not use spring-boot-maven-plugin.
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId></groupId>
        <artifactId></artifactId>
        <version>1.0.0</version>
        <relativePath>../pom.xml</relativePath>
	</parent>
	<artifactId></artifactId>
	<version>1.0.0</version>
	<name></name>
	<description></description>
	<packaging>jar</packaging>

	<dependencies>

	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
                <version>${spring-boot.version}</version>
				<executions>
					<execution>
						<goals>
							<goal>repackage</goal>
						</goals>
					</execution>
				</executions>
			</plugin>
		</plugins>
	</build>

</project>

```
