echo "DOING Yubikey"
sudo apt install yubikey-manager -y 
sudo apt install yubikey-manager-qt -y
sudo apt install yubioath-desktop -y
sudo apt install libpam-yubico -y	
sudo apt install libpam-u2f -y
sudo apt install pcscd -y
sudo apt install scdaemon -y
sudo apt install zlib1g-dev

echo "BUILDING PIV-TOOL"
cd $HOME

sudo apt install libpcsclite-dev -y
sudo apt install gengetopt -y
sudo apt install help2man -y
sudo apt install check -y

git clone https://github.com/Yubico/yubico-piv-tool.git
cd yubico-piv-tool
mkdir build
cd build
cmake ..
make -j8

sudo cp ykcs11/lib* /usr/local/lib
sudo cp lib/lib* /usr/local/lib
sudo cp tool/yubico-piv-tool /usr/bin

cd $HOME

echo "SETTING UP CERT"

sudo systemctl restart pcscd.service >> .bashrc 

ykman info

echo "EXPORTING .ssh/auth9a.pub"

ssh-keygen -D /usr/local/lib/libykcs11.so -e > .ssh/auth9a.pub

eval $(ssh-agent)
ssh-add -s /usr/local/lib/libykcs11.so
ssh-add -l
echo "TESTING"
ssh git@github.com

echo rm -rf yubico-piv-tool

echo "DONE"

