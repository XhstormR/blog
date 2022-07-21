---
author: XhstormR
categories:
- Notes
date: 2018-07-20T14:35:35+08:00
title: MyBatis Generator
---

<!--more-->

Updated on 2018-07-20

> https://github.com/mybatis/generator

## start.bat
```bash
@ echo off
if not exist mybatis-generator-core-1.3.7.jar curl -LROk https://jcenter.bintray.com/org/mybatis/generator/mybatis-generator-core/1.3.7/mybatis-generator-core-1.3.7.jar
if not exist postgresql-42.2.4.jar curl -LROk https://jcenter.bintray.com/org/postgresql/postgresql/42.2.4/postgresql-42.2.4.jar
md src\main\java
md src\main\resources
javac -cp mybatis-generator-core-1.3.7.jar; MyCommentGenerator.java
javac -cp mybatis-generator-core-1.3.7.jar; MyResultMapGenerator.java
java -cp mybatis-generator-core-1.3.7.jar; org.mybatis.generator.api.ShellRunner -configfile generatorConfig.xml -overwrite
```

## generatorConfig.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
  PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
  "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">

<generatorConfiguration>
    <classPathEntry location="postgresql-42.2.4.jar" />

    <context id="abc" targetRuntime="MyBatis3DynamicSql">
        <property name="autoDelimitKeywords" value="true" />
        <property name="javaFileEncoding" value="UTF-8" />

        <plugin type="MyResultMapGenerator" />
        <plugin type="org.mybatis.generator.plugins.ToStringPlugin" />
        <plugin type="org.mybatis.generator.plugins.RowBoundsPlugin" />
        <plugin type="org.mybatis.generator.plugins.SerializablePlugin" />
        <plugin type="org.mybatis.generator.plugins.EqualsHashCodePlugin" />
        <plugin type="org.mybatis.generator.plugins.MapperAnnotationPlugin" />
        <plugin type="org.mybatis.generator.plugins.CaseInsensitiveLikePlugin" />
        <plugin type="org.mybatis.generator.plugins.FluentBuilderMethodsPlugin" />
        <plugin type="org.mybatis.generator.plugins.UnmergeableXmlMappersPlugin" />
        <plugin type="org.mybatis.generator.plugins.MapperConfigPlugin">
            <property name="targetPackage" value="." />
            <property name="targetProject" value="src/main/resources" />
        </plugin>

        <commentGenerator type="MyCommentGenerator">
            <property name="suppressAllComments" value="true" />
            <property name="addRemarkComments" value="true" />
        </commentGenerator>

        <jdbcConnection
            driverClass="org.postgresql.Driver"
            connectionURL="jdbc:postgresql://127.0.0.1:5432/postgres"
            userId="123"
            password="123456" />

        <javaTypeResolver>
            <property name="useJSR310Types" value="true"/>
        </javaTypeResolver>

        <javaModelGenerator targetPackage="org.xhstormr.example.model" targetProject="src/main/java">
            <property name="enableSubPackages" value="false" />
            <property name="trimStrings" value="true" />
        </javaModelGenerator>

        <sqlMapGenerator targetPackage="mapper" targetProject="src/main/resources">
            <property name="enableSubPackages" value="false" />
        </sqlMapGenerator>

        <javaClientGenerator type="XMLMAPPER" targetPackage="org.xhstormr.example.mapper" targetProject="src/main/java">
            <property name="enableSubPackages" value="false" />
        </javaClientGenerator>

        <table tableName="%" schema="public" delimitIdentifiers="true" delimitAllColumns="true">
            <property name="useActualColumnNames" value="false" />
            <generatedKey column="id" sqlStatement="JDBC" identity="true" />
        </table>
    </context>
</generatorConfiguration>
```

## MyCommentGenerator.java
```java
import org.mybatis.generator.api.CommentGenerator;
import org.mybatis.generator.api.IntrospectedColumn;
import org.mybatis.generator.api.IntrospectedTable;
import org.mybatis.generator.api.dom.java.*;
import org.mybatis.generator.api.dom.xml.XmlElement;

import java.util.Properties;
import java.util.Set;

public class MyCommentGenerator implements CommentGenerator {
    private static void addRemark(JavaElement element, String remarks) {
        if (remarks != null && !remarks.trim().isEmpty()) {
            element.addJavaDocLine("/**");
            String[] remarkLines = remarks.split(System.getProperty("line.separator"));
            for (String remarkLine: remarkLines) {
                element.addJavaDocLine(" * " + remarkLine);
            }
            element.addJavaDocLine(" */");
        }
    }

    @Override
    public void addConfigurationProperties(Properties properties) {

    }

    @Override
    public void addFieldComment(Field field, IntrospectedTable introspectedTable, IntrospectedColumn introspectedColumn) {
        String remarks = introspectedColumn.getRemarks();
        addRemark(field, remarks);
    }

    @Override
    public void addFieldComment(Field field, IntrospectedTable introspectedTable) {

    }

    @Override
    public void addModelClassComment(TopLevelClass topLevelClass, IntrospectedTable introspectedTable) {
        String remarks = introspectedTable.getRemarks();
        addRemark(topLevelClass, remarks);
    }

    @Override
    public void addClassComment(InnerClass innerClass, IntrospectedTable introspectedTable) {

    }

    @Override
    public void addClassComment(InnerClass innerClass, IntrospectedTable introspectedTable, boolean markAsDoNotDelete) {

    }

    @Override
    public void addEnumComment(InnerEnum innerEnum, IntrospectedTable introspectedTable) {

    }

    @Override
    public void addGetterComment(Method method, IntrospectedTable introspectedTable, IntrospectedColumn introspectedColumn) {

    }

    @Override
    public void addSetterComment(Method method, IntrospectedTable introspectedTable, IntrospectedColumn introspectedColumn) {

    }

    @Override
    public void addGeneralMethodComment(Method method, IntrospectedTable introspectedTable) {

    }

    @Override
    public void addJavaFileComment(CompilationUnit compilationUnit) {

    }

    @Override
    public void addComment(XmlElement xmlElement) {

    }

    @Override
    public void addRootComment(XmlElement rootElement) {

    }

    @Override
    public void addGeneralMethodAnnotation(Method method, IntrospectedTable introspectedTable, Set<FullyQualifiedJavaType> imports) {

    }

    @Override
    public void addGeneralMethodAnnotation(Method method, IntrospectedTable introspectedTable, IntrospectedColumn introspectedColumn, Set<FullyQualifiedJavaType> imports) {

    }

    @Override
    public void addFieldAnnotation(Field field, IntrospectedTable introspectedTable, Set<FullyQualifiedJavaType> imports) {

    }

    @Override
    public void addFieldAnnotation(Field field, IntrospectedTable introspectedTable, IntrospectedColumn introspectedColumn, Set<FullyQualifiedJavaType> imports) {
        String remarks = introspectedColumn.getRemarks();
        addRemark(field, remarks);
    }

    @Override
    public void addClassAnnotation(InnerClass innerClass, IntrospectedTable introspectedTable, Set<FullyQualifiedJavaType> imports) {

    }
}
```

## MyResultMapGenerator.java
```java
import org.mybatis.generator.api.GeneratedXmlFile;
import org.mybatis.generator.api.IntrospectedTable;
import org.mybatis.generator.api.PluginAdapter;
import org.mybatis.generator.api.dom.xml.Attribute;
import org.mybatis.generator.api.dom.xml.Document;
import org.mybatis.generator.api.dom.xml.XmlElement;
import org.mybatis.generator.codegen.XmlConstants;
import org.mybatis.generator.codegen.mybatis3.xmlmapper.elements.AbstractXmlElementGenerator;
import org.mybatis.generator.codegen.mybatis3.xmlmapper.elements.ResultMapWithoutBLOBsElementGenerator;

import java.util.Collections;
import java.util.List;

/**
 * @author zhangzf
 * @create 2018/8/7 13:20
 */
public class MyResultMapGenerator extends PluginAdapter {
    @Override
    public boolean validate(List<String> list) {
        return true;
    }

    @Override
    public List<GeneratedXmlFile> contextGenerateAdditionalXmlFiles(IntrospectedTable introspectedTable) {
        Document document = new Document(XmlConstants.MYBATIS3_MAPPER_PUBLIC_ID, XmlConstants.MYBATIS3_MAPPER_SYSTEM_ID);
        XmlElement root = new XmlElement("mapper");
        document.setRootElement(root);

        root.addAttribute(new Attribute("namespace", introspectedTable.getMyBatis3SqlMapNamespace()));

        initializeAndExecuteGenerator(root, introspectedTable, new ResultMapWithoutBLOBsElementGenerator(false));

        GeneratedXmlFile xmlFile = new GeneratedXmlFile(
                document,
                introspectedTable.getMyBatis3XmlMapperFileName(),
                properties.getProperty("targetPackage", "mapper"),
                properties.getProperty("targetProject", "src/main/resources"),
                false,
                context.getXmlFormatter());

        return Collections.singletonList(xmlFile);
    }

    private void initializeAndExecuteGenerator(XmlElement parentElement,
                                               IntrospectedTable introspectedTable,
                                               AbstractXmlElementGenerator elementGenerator) {
        elementGenerator.setContext(context);
        elementGenerator.setIntrospectedTable(introspectedTable);
        elementGenerator.addElements(parentElement);
    }
}
```

## Reference
* http://www.mybatis.org/mybatis-3/zh/dynamic-sql.html
* https://github.com/mybatis/mybatis-dynamic-sql/releases/latest
