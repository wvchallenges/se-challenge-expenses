Install Virtual Box (using version 4.3.20)
Install a VM for Ubuntu http://www.osboxes.org/ubuntu/ Ubuntu 14.04.2 Trusty Tahr 64 bit
run the VM, install the guest additions

install rubyruby 2.0.0p598 (2014-11-13) [i386-mingw32]

https://rvm.io/rvm/install

gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3

gpg: requesting key D39DC0E3 from hkp server keys.gnupg.net
gpg: /home/osboxes/.gnupg/trustdb.gpg: trustdb created
gpg: key D39DC0E3: public key "Michal Papis (RVM signing) <mpapis@gmail.com>" imported
gpg: no ultimately trusted keys found
gpg: Total number processed: 1
gpg:               imported: 1  (RSA: 1)


Install rvm and default ruby 2.2.1

curl -sSL https://get.rvm.io | bash -s stable --ruby

osboxes@osboxes:~$ curl -sSL https://get.rvm.io | bash -s stable --rubyDownloading https://github.com/rvm/rvm/archive/1.26.11.tar.gz
Downloading https://github.com/rvm/rvm/releases/download/1.26.11/1.26.11.tar.gz.asc
gpg: Signature made Mon 30 Mar 2015 22:52:13 BST using RSA key ID BF04FF17
gpg: Good signature from "Michal Papis (RVM signing) <mpapis@gmail.com>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 409B 6B17 96C2 7546 2A17  0311 3804 BB82 D39D C0E3
     Subkey fingerprint: 62C9 E5F4 DA30 0D94 AC36  166B E206 C29F BF04 FF17
GPG verified '/home/osboxes/.rvm/archives/rvm-1.26.11.tgz'

Installing RVM to /home/osboxes/.rvm/
    Adding rvm PATH line to /home/osboxes/.profile /home/osboxes/.mkshrc /home/osboxes/.bashrc /home/osboxes/.zshrc.
    Adding rvm loading line to /home/osboxes/.profile /home/osboxes/.bash_profile /home/osboxes/.zlogin.
Installation of RVM in /home/osboxes/.rvm/ is almost complete:

  * To start using RVM you need to run `source /home/osboxes/.rvm/scripts/rvm`
    in all your open shell windows, in rare cases you need to reopen all shell windows.

# osboxes,
#
#   Thank you for using RVM!
#   We sincerely hope that RVM helps to make your life easier and more enjoyable!!!
#
# ~Wayne, Michal & team.

In case of problems: http://rvm.io/help and https://twitter.com/rvm_io
rvm 1.26.11 (latest) by Wayne E. Seguin <wayneeseguin@gmail.com>, Michal Papis <mpapis@gmail.com> [https://rvm.io/]
Searching for binary rubies, this might take some time.
Found remote file https://rvm_io.global.ssl.fastly.net/binaries/ubuntu/14.04/x86_64/ruby-2.2.1.tar.bz2
Checking requirements for ubuntu.
Installing requirements for ubuntu.
Updating systemosboxes password required for 'apt-get --quiet --yes update': 
............
Installing required packages: gawk, g++, libreadline6-dev, zlib1g-dev, libssl-dev, libyaml-dev, libsqlite3-dev, sqlite3, autoconf, libgdbm-dev, libncurses5-dev, automake, libtool, bison, libffi-dev..................
Requirements installation successful.
ruby-2.2.1 - #configure
ruby-2.2.1 - #download
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 23.2M  100 23.2M    0     0  2052k      0  0:00:11  0:00:11 --:--:-- 2151k
ruby-2.2.1 - #validate archive
ruby-2.2.1 - #extract
ruby-2.2.1 - #validate binary
ruby-2.2.1 - #setup
ruby-2.2.1 - #gemset created /home/osboxes/.rvm/gems/ruby-2.2.1@global
ruby-2.2.1 - #importing gemset /home/osboxes/.rvm/gemsets/global.gems..............................
ruby-2.2.1 - #generating global wrappers........
ruby-2.2.1 - #gemset created /home/osboxes/.rvm/gems/ruby-2.2.1
ruby-2.2.1 - #importing gemsetfile /home/osboxes/.rvm/gemsets/default.gems evaluated to empty gem list
ruby-2.2.1 - #generating default wrappers........
Creating alias default for ruby-2.2.1...

  * To start using RVM you need to run `source /home/osboxes/.rvm/scripts/rvm`
    in all your open shell windows, in rare cases you need to reopen all shell windows.


Install 2.0.0 (developed against this -- installs 2.0.0p643)

rvm install 2.0.0
rvm use 2.0.0
rvm rubygems latest
ruby --version
gem install bundler

sudo apt-get install nodejs
this is necessary for execjs bundle


install git
> sudo apt-get update
> sude apt-get install gitpwd

get source

 > mkdir git
 > cd git
 > git clone https://github.com/jimgraham/se-challenge.git
 > cd se-challenge/waexpenses

get the gems
bundler install

create the secrets file

```
# Be sure to restart your server when you modify this file.

# Your secret key is used for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!

# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
# You can use `rake secret` to generate a secure secret key.

# Make sure the secrets in this file are kept private
# if you're sharing your code publicly.

development:
  secret_key_base: 

test:
  secret_key_base: 

# Do not keep production secrets in the repository,
# instead read values from the environment.
production:
  secret_key_base: <%= ENV["SECRET_KEY_BASE"] %>

```

create the database

 rake db:create db:migrate

Start the server

rails s

 
