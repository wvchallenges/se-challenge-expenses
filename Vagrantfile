# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "ubuntu/xenial64"

  # Create a private network, which allows host-only access to the machine using a specific IP.
  config.vm.network "private_network", type: "dhcp"
  config.vm.network :forwarded_port, host: 8443, guest: 443, auto_correct: true

  # Share an additional folder to the guest VM. The first argument is the path on the host to the actual folder.
  # The second argument is the path on the guest to mount the folder.
  # config.vm.synced_folder ".", "/vagrant", type: "nfs",  mount_options: ['actimeo=2']
  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--ioapic", "on"]
        vb.customize ["modifyvm", :id, "--memory", "1024"]
        vb.customize ["modifyvm", :id, "--cpus", "1"]
        vb.customize ["modifyvm", :id, "--cpuexecutioncap", "80"]
  end

  # avoid red alert when creating the VM
  config.ssh.shell = "bash -c 'BASH_ENV=/etc/profile exec bash'"

  # Define the bootstrap file: A (shell) script that runs after first setup of your box (= provisioning)
  config.vm.provision :shell, path: "./vagrant/bootstrap-once.sh"
  config.vm.provision :shell, path: "./vagrant/bootstrap-always.sh", run: "always"
  
end
