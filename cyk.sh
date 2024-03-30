#!/bin/bash
sudo systemctl restart pcscd.service
ykman info
echo "EXPORTING .ssh/auth9a.pub"
ssh-keygen -D /usr/local/lib/libykcs11.so -e > .ssh/auth9a.pub
eval $(ssh-agent)
ssh-add -s /usr/local/lib/libykcs11.so
ssh-add -l
echo "TESTING"
ssh git@github.com
