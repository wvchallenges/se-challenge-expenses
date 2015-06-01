# Installing the Sample

This sample code requires

  - `ruby v2`
  - `bundler`
  - `rails` (resolved with `bundler`)
    - The default `rails` installations requires a javascript runtime. For most installations the system javascript runtime can be used, but you may need to install a runtime.
  - the source code from GitHub (you're looking at it)
  - a migrated database.

I have run this sample on Mac OSX 10.10.3, Windows 7 sp1 and Ubuntu 14.04. Since the Ubuntu installation is lacking the most requirements, I will go through how I installed the sample application there.

## Machine configuration

I downloaded a Virtual Machine image from http://www.osboxes.org/ubuntu/ for Ubuntu 14.04.2 Trusty Tahr 64 bit.

I installed Virtual Box (using version 4.3.20), and created a virtual machine from the image above.

Once the VM was running I installed the Virtual Box guest machine additions. https://www.virtualbox.org/manual/ch04.html 

At this point, we have a vanilla Ubuntu box with very little on it

## Installing `ruby`

I elected to install `ruby` via [RPM](https://rvm.io/rvm/install). On other OSs, you could consider

 - [`rbenv`](https://github.com/sstephenson/rbenv) for Mac OSX
 - [Rails Installer](http://railsinstaller.org) for Windows

Following the RVM instructions, from a terminal.

 - Install the gpg key 
```
> gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
```
 - Install rvm and default ruby 2.2.1 
```
> curl -sSL https://get.rvm.io | bash -s stable --ruby
```

Do what the final instructions say and source the `rvm` script

```
> source ~/.rvm/scripts/rvm
```

At this point we have a working rails 2.2.1 installed locally.

## Installing `bundler`

I use `bundler` to install all the dependencies for this sample, including `rails` itself

``` 
> gem install bundler
```

## Get the source

One needs to put this source code onto the machine. The easiest way to do this is to do a `git clone` of this repository

#### Install `git` tools

```
> sudo apt-get update
> sudo apt-get install nodejs
```

#### Get the source

```
 > mkdir git
 > cd git
 > git clone https://github.com/jimgraham/se-challenge.git
 > cd se-challenge/waexpenses
```

This will put the source code into a directory called `~/git/se-challenge/waexpenses`

## Aside: A Javascript runtime

Certain gems installed in the default `rails` configuration use [`execjs`](https://github.com/sstephenson/execjs). `execjs` should be able to use a system-installed Javascript runtime. Other runtimes, such as `therubyracer` were difficult to install.

Since the vanilla Ubuntu install did not have a system-wide Javascript runtime, I elected to install `nodejs`

```
> sudo apt-get install git
```  

This seems like overkill, but it was the fastest solution to getting a working installation on a Vanilla Ubuntu box.


## Install the open-source gem bundles (including `rails`)

We need to install rails and the open-source components that I've used in this sample. We can run these from the `Gemfile` through `bundler`

```
> bundle install
```

## Create the database

We need to create a default "development" database. The `rake` command will create and upgrade the database. The sample will run against this database.

```
 > rake db:migrate
```

## Optionally run the unit tests

If you're interested, you can run the unit tests for the application. There should be no errors!

```
 > rake test
```

## Start the server

Finally, start the rails server so we can navigate to the application.

```
> rails s
```

## Navigate to the app

After all these steps, go to [http://localhost:3000/](http://localhost:3000)


 
