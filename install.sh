sudo apt update
sudo apt -y install apt-transport-https ca-certificates curl gnupg2 software-properties-common
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/docker-archive-keyring.gpg
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin -y

wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add - \
    && echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list \
    && sudo apt-get update \
    && sudo apt-get install -y mongodb-mongosh mongodb-org-server \
    && sudo apt-get clean