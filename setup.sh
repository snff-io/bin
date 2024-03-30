cd ~
sudo apt update -y
sudo apt upgrade -y
#zsh / nano
sudo apt install zsh -y
sudo apt install nano -y
sudo apt-get install baobab -y

#flatpak
sudo apt install flatpak -y
sudo flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo

sudo apt upgrade -y

#chromium
sudo apt install chromium -y

#node / npm
sudo apt install nodejs -y
sudo apt install npm -y

# nvm
sudo apt install build-essential libssl-dev -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash 

## update nodejs
/home/zampinojosh/.config/nvm install node

#python / pip
sudo apt install python3 -y
sudo apt install pipx -y

# c++
sudo apt install cmake -y
sudo apt install pkg-config -y
sudo apt install gcc g++ gdb -y
# openpgp
sudo apt install -y gnupg scdaemon pcscd pcsc-tools

#gimp / blender
#sudo apt install gimp -y
sudo apt install blender -y

sudo apt install telnet -y

#docker_engine
# Add Docker's official GPG key:
curl -L -o get-docker.sh get.docker.com
sudo chmod +x get-docker.sh
sudo get-docker.sh

#vscode
curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo install -o root -g root -m 644 microsoft.gpg /usr/share/keyrings/microsoft-archive-keyring.gpg
sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/usr/share/keyrings/microsoft-archive-keyring.gpg] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'
sudo apt-get update
sudo apt-get install code

sudo apt upgrade

#environment
mkdir ~/src

#create key
ssh-keygen -q -t rsa -N '' <<< $'\ny' >/dev/null 2>&1
echo $?


git config --global user.email "joshua@worldcomputer.info"
git config --global user.name "josh zampino"
#warnings
echo "use playstore for xrdp and tor, for now"



