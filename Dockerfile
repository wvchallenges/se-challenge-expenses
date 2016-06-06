
FROM ubuntu:16.04

RUN mkdir -p /runtime/res

COPY target/debug/se-challenge /runtime
COPY res/ /runtime/res/

WORKDIR /runtime

CMD ["/runtime/se-challenge"]

EXPOSE 3000

