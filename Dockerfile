FROM denoland/deno:alpine-1.25.0
WORKDIR /app
COPY . /app
RUN deno cache main.ts
EXPOSE 8000
CMD ["run", "--allow-env", "--allow-net", "--allow-read", "--allow-write", "--allow-run", "main.ts"]
