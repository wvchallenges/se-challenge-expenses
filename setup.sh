sudo apt-get install python-pip libssl-dev
sudo pip install ansible==2.0.1
ansible-playbook ansible/wave-playbook.yml --connection=local --extra-vars "target=127.0.0.1"
