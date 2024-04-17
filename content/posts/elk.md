---
author: XhstormR
categories:
- Notes
date: 2020-08-08T18:39:18+08:00
title: Elastic Stack
---

<!--more-->

Updated on 2020-08-08

> {{< image "uploads/elastic-stack.svg" "Elastic Stack" "1" "0" "600" >}}
>
> https://github.com/elastic/
>
> https://www.docker.elastic.co/

## Docker Compose

### docker-compose.yml

```yaml
version: '3'

services:
  kibana:
    image: kibana:7.9.2
    restart: always
    environment:
      I18N_LOCALE: zh-CN
      SERVER_BASEPATH: /kibana
      ELASTICSEARCH_USERNAME: elastic
      ELASTICSEARCH_PASSWORD: elastic
    healthcheck:
      test: curl -f http://127.0.0.1:5601/ || exit 1
    labels:
      - traefik.http.services.kibana.loadbalancer.server.port=5601
      - traefik.http.routers.kibana.rule=PathPrefix(`/kibana/`)
      - traefik.http.routers.kibana.middlewares=kibana-stripprefix
      - traefik.http.middlewares.kibana-stripprefix.stripprefix.prefixes=/kibana/
    depends_on:
      - elasticsearch

  elasticsearch:
    image: elasticsearch:7.9.2
    restart: always
    environment:
      ES_JAVA_OPTS: -Xms256m -Xmx256m
      ELASTIC_PASSWORD: elastic
      xpack.security.enabled: 'true'
      discovery.type: single-node
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data
    labels:
      - traefik.http.services.elasticsearch.loadbalancer.server.port=9200
      - traefik.http.routers.elasticsearch.rule=PathPrefix(`/es/`)
      - traefik.http.routers.elasticsearch.middlewares=elasticsearch-stripprefix
      - traefik.http.middlewares.elasticsearch-stripprefix.stripprefix.prefixes=/es/

  traefik:
    image: traefik:latest
    restart: always
    ports:
      - '8080:80'
    command: --api --providers.docker
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    labels:
      - traefik.http.routers.traefik.service=api@internal
      - traefik.http.routers.traefik.rule=PathPrefix(`/traefik/`) || HeadersRegexp(`Referer`, `.*\/traefik\/.*`)
      - traefik.http.routers.traefik.middlewares=traefik-stripprefix,traefik-basicauth
      - traefik.http.middlewares.traefik-stripprefix.stripprefix.prefixes=/traefik/
      - traefik.http.middlewares.traefik-basicauth.basicauth.removeheader=true
      - traefik.http.middlewares.traefik-basicauth.basicauth.users=${TRAEFIK_BASIC_AUTH}

volumes:
  elasticsearch_data:
```

### .env

```
TRAEFIK_BASIC_AUTH=123:$2y$05$80HqrqBOoNaabteix3gYJ.S0kT.HP6sw5GjOplRfGhGezth0yL78y
```

## Beats
* https://www.elastic.co/downloads/beats

```
filebeat -e modules enable nginx
filebeat -e setup
filebeat -e
```

## Cluster

```yaml
version: '3'

services:
  es01:
    image: elasticsearch:7.9.2
    restart: always
    hostname: es01
    environment:
      cluster.name: es-docker-cluster
      cluster.initial_master_nodes: es01,es02,es03,es04,es05,es06,es07,es08
      discovery.seed_hosts: es02,es03,es04,es05,es06,es07,es08
      bootstrap.memory_lock: 'true'
      ES_JAVA_OPTS: -Xms32g -Xmx32g
    volumes:
      - es01_data:/usr/share/elasticsearch/data
    ulimits:
      memlock:
        soft: -1
        hard: -1
    ports:
      - 9200:9200

  es02:
    image: elasticsearch:7.9.2
    restart: always
    hostname: es02
    environment:
      cluster.name: es-docker-cluster
      cluster.initial_master_nodes: es01,es02,es03,es04,es05,es06,es07,es08
      discovery.seed_hosts: es01,es03,es04,es05,es06,es07,es08
      bootstrap.memory_lock: 'true'
      ES_JAVA_OPTS: -Xms32g -Xmx32g
    volumes:
      - es02_data:/usr/share/elasticsearch/data
    ulimits:
      memlock:
        soft: -1
        hard: -1

  es03:
    image: elasticsearch:7.9.2
    restart: always
    hostname: es03
    environment:
      cluster.name: es-docker-cluster
      cluster.initial_master_nodes: es01,es02,es03,es04,es05,es06,es07,es08
      discovery.seed_hosts: es01,es02,es04,es05,es06,es07,es08
      bootstrap.memory_lock: 'true'
      ES_JAVA_OPTS: -Xms32g -Xmx32g
    volumes:
      - es03_data:/usr/share/elasticsearch/data
    ulimits:
      memlock:
        soft: -1
        hard: -1

  es04:
    image: elasticsearch:7.9.2
    restart: always
    hostname: es04
    environment:
      cluster.name: es-docker-cluster
      cluster.initial_master_nodes: es01,es02,es03,es04,es05,es06,es07,es08
      discovery.seed_hosts: es01,es02,es03,es05,es06,es07,es08
      bootstrap.memory_lock: 'true'
      ES_JAVA_OPTS: -Xms32g -Xmx32g
    volumes:
      - es04_data:/usr/share/elasticsearch/data
    ulimits:
      memlock:
        soft: -1
        hard: -1

  es05:
    image: elasticsearch:7.9.2
    restart: always
    hostname: es05
    environment:
      cluster.name: es-docker-cluster
      cluster.initial_master_nodes: es01,es02,es03,es04,es05,es06,es07,es08
      discovery.seed_hosts: es01,es02,es03,es04,es06,es07,es08
      bootstrap.memory_lock: 'true'
      ES_JAVA_OPTS: -Xms32g -Xmx32g
    volumes:
      - es05_data:/usr/share/elasticsearch/data
    ulimits:
      memlock:
        soft: -1
        hard: -1

  es06:
    image: elasticsearch:7.9.2
    restart: always
    hostname: es06
    environment:
      cluster.name: es-docker-cluster
      cluster.initial_master_nodes: es01,es02,es03,es04,es05,es06,es07,es08
      discovery.seed_hosts: es01,es02,es03,es04,es05,es07,es08
      bootstrap.memory_lock: 'true'
      ES_JAVA_OPTS: -Xms32g -Xmx32g
    volumes:
      - es06_data:/usr/share/elasticsearch/data
    ulimits:
      memlock:
        soft: -1
        hard: -1

  es07:
    image: elasticsearch:7.9.2
    restart: always
    hostname: es07
    environment:
      cluster.name: es-docker-cluster
      cluster.initial_master_nodes: es01,es02,es03,es04,es05,es06,es07,es08
      discovery.seed_hosts: es01,es02,es03,es04,es05,es06,es08
      bootstrap.memory_lock: 'true'
      ES_JAVA_OPTS: -Xms32g -Xmx32g
    volumes:
      - es07_data:/usr/share/elasticsearch/data
    ulimits:
      memlock:
        soft: -1
        hard: -1

  es08:
    image: elasticsearch:7.9.2
    restart: always
    hostname: es08
    environment:
      cluster.name: es-docker-cluster
      cluster.initial_master_nodes: es01,es02,es03,es04,es05,es06,es07,es08
      discovery.seed_hosts: es01,es02,es03,es04,es05,es06,es07
      bootstrap.memory_lock: 'true'
      ES_JAVA_OPTS: -Xms32g -Xmx32g
    volumes:
      - es08_data:/usr/share/elasticsearch/data
    ulimits:
      memlock:
        soft: -1
        hard: -1

  kibana:
    image: kibana:7.9.2
    restart: always
    environment:
      ELASTICSEARCH_HOSTS: http://es01:9200
    ports:
      - 5601:5601

volumes:
  es01_data:
  es02_data:
  es03_data:
  es04_data:
  es05_data:
  es06_data:
  es07_data:
  es08_data:
```

## Reference
* https://www.elastic.co/guide/index.html
* kibana
  * [settings](https://www.elastic.co/guide/en/kibana/current/settings.html)
  * https://www.elastic.co/guide/cn/kibana/current/index.html
* elasticsearch
  * [rest-apis](https://www.elastic.co/guide/en/elasticsearch/reference/current/rest-apis.html)
  * [java-rest-high-query-builders](https://www.elastic.co/guide/en/elasticsearch/client/java-rest/current/java-rest-high-query-builders.html)
  * [java-rest-high-aggregation-builders](https://www.elastic.co/guide/en/elasticsearch/client/java-rest/current/java-rest-high-aggregation-builders.html)
  * https://www.elastic.co/guide/cn/elasticsearch/guide/current/index.html
* filebeat
  * [inputs](https://www.elastic.co/guide/en/beats/filebeat/current/configuration-filebeat-options.html)
  * [modules](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-modules.html)
