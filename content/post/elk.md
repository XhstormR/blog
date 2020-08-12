---
author: XhstormR
categories:
- Notes
date: 2020-08-08T18:39:18+08:00
title: Elastic Stack
---

<!--more-->

Updated on 2020-08-08

> {{< image "/uploads/elastic-stack.svg" "Elastic Stack" "1" "0" "600" >}}
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
    image: kibana:7.8.1
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
    image: elasticsearch:7.8.1
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

## Reference
* https://www.elastic.co/guide/en/kibana/current/settings.html
* https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-modules.html
* https://www.elastic.co/guide/en/elasticsearch/reference/current/rest-apis.html
* https://www.elastic.co/guide/en/elasticsearch/client/java-rest/current/java-rest-high.html
