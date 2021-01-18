## Setup Steps

For RHEL/CentOS systems, run the following:<br />
`sudo yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm` <br />
`sudo yum-config-manager --enable epel` <br />
`sudo yum install nodejs npm git --enablerepo=epel` <br />

Pull code and install all Node modules: <br />
`cd /home/ec2-user`
`git clone https://github.com/adamaxelrod/Schedule-Web.git`<br />
`cd /home/ec2-user/Schedule-Web`
`npm install`

Install NodeJS: <br />
`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash` <br />
`. ~/.nvm/nvm.sh`<br />
`nvm install 13.12.0` <br />

Install pm2: <br />
`npm install pm2 -g` <br />

Setup auto-start and process monitoring: <br />
`pm2 startup` <br />

For Prod:
`pm2 start npm --name "Schedule-Web" -- run start` <br />



