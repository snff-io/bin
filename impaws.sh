docker load -i worldcomputer.tar
docker stop $(docker ps -a -q)
docker run --rm -d -p 80:80 -p 443:443 worldcomputer:latest
