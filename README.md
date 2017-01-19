# Wave Software Development Challenge

## Goals

The problem at hand is very simplistic but, can be interpreted in a myriad of
ways. Hence the issue at hand here is not merely filling in the requirements, but
showing skill in specific aspects of web development you are comfortable with.

A second goal should be showing that you have knowledge of more than just you core
competency, there are a lot of skills coming into successful web development and
a full-stack developer owes it to itself to know enough about frontend, UX, documentation,
testing, devops, systems, etc. to help out with those when needed.

Third, thinking of the on-site interview, we could keep make sure some parts of the
codebase can act as good grounds for interesting discussions.

## Development

### Technical stack

- Data
  - [PostgreSQL](https://www.postgresql.org/) - _Stable for a long time, fast when used correctly, wide userbase, versatile_
- Backend
  - [Node.js](https://nodejs.org/en/) - _Fast to develop in, fast at runtime for our use case, now adopted by many big company, in active development, wide community, packages for many things web related_
  - [Koa](http://koajs.com/) - _Futuristic, widely known, thoughfully designed, modular_
  - [Knex](http://knexjs.org/) - _Versatile, simple, promise based, and fun SQL query builder_
- Frontend
  - [Mustache](http://mustache.github.io/) - _Dead simple, logic less template engine. Avoid scope creep in views_
  - [Tachyons](http://tachyons.io/) - _Allows for "designing" in the brower, easier changes to code, and very simple to learn and use_
- Operations
  - [Ubuntu](https://www.ubuntu.com/server) - _Easy to work with, wide adoption, package availability, most engineers have experience with it_
  - [Runit](http://smarden.org/runit/) - _Simple in design, works well as process manager, include nice guarantees for our use case_
  - [Ansible](https://www.ansible.com/) - _Simpler than alternatives, Powerful syntax and plugin system, Agentless_

### Developing

To start with, you will need to have the following installed on your machine _(the version numbers
don't need to be an exact match, it's just to give an idea)_:

- **node.js** (v7.4.0) (install it using [n](https://github.com/tj/n))
- **yarn** (v0.19.1) (install it using `npm i -g yarn`)
- **PostgreSQL** (v9.5.5) (install it using your package manager `brew`/`apt`)
- **Ansible** (v2.2.1.0) (install it using `pip install ansible`)

If you have all these you are all setup! _(Make sure you can run the `psql` command without errors
before continuing)_

Before we run the server, let's create a new database and run schema migrations against it:

```sh
$ make db-create
psql -c "CREATE ROLE wave_challenge WITH SUPERUSER LOGIN PASSWORD 'wave_challenge'"
CREATE ROLE
psql -c "CREATE DATABASE wave_challenge WITH OWNER wave_challenge"
CREATE DATABASE

$ make db-migrate
./node_modules/.bin/knex migrate:latest
Batch 1 run: 3 migrations
/home/[...]/migrations/20170116182027_add_expense_categories_table.js
/home/[...]/migrations/20170116182035_add_employees_table.js
/home/[...]/migrations/20170116182042_add_expenses_table.js
```

Hokay! Let's start that server and get cookin'

```sh
$ make
node --harmony server.js | ./node_modules/.bin/pino
[2020-12-25T08:00:25.252Z] INFO (17815 on kiasaki-w-vm): started listening on port 8000
```

We can now visit [`http://localhost:8000`](http://localhost:8000/) and try it out!

### Testing

This application uses the [`tape`](https://github.com/substack/tape) test runner for Node.js and
has a few `make` targets that can run the test suite.

This application has tests for parts of the actual codebase, that is, because:

1. This was a coding challenge so I ended up not wanting to spend too much time setting up full
  system level testing as it can be time consuming ^^,
1. Some things are worth testing all edge cases (like `server/helpers/csv.js`) others, not so much
  (like `server/models/*`, at least as long as the are value objects and have no business logic)

```sh
$ make test # runs the linter + all test suites
$ make test-unit # runs unit tests
```

**Coding Style**

This codebase adopts the JavaScript [standard](http://standardjs.com/), so, whatever that dictates
we follow. To run the code linter use **`make lint`**.

## Production

Like hinted in the tech stack section, this app is deployed on **Ubuntu**, using **Ansible**. For the time being
some aspects of a production deployment where ommited for the sake of time but most decisions where
made keeping in mind scaling this project to more servers, sitting behind a load balancer, or using an
in house database setup instead of a third party.

### Deploying changes

Deploying changes is such a critical part the process of developing a product that it deserves a quality,
non-flaky and simple to use solution. Ideally you have deploys happening automatically as tests pass in
CI on the master branch.

For this application deploys are made using an ansible playbook.

There is 2 requirements to be able to run it:

- Have a `~/wave-vault-pass.txt` file containing the Ansible Vault password
- Have the SSH private key used for deployment in you key agent (`ssh-add ~/.ssh/wave`)

To deploy the latest commit from master use the following:

```
$ make ops-deploy
ansible-playbook support/deploy.yml -u op -i support/inventory.ini

PLAY [web] *********************************************************************

TASK [setup] *******************************************************************
ok: [wave-challenge-web1]

TASK [app - fetch lastest commits] *********************************************
ok: [wave-challenge-web1]

TASK [app - update dependencies] ***********************************************
changed: [wave-challenge-web1]

TASK [app - run migrations] ****************************************************
changed: [wave-challenge-web1]

TASK [app - restart] ***********************************************************
changed: [wave-challenge-web1]

PLAY RECAP *********************************************************************
wave-challenge-web1        : ok=5    changed=3    unreachable=0    failed=0
```

That's it!

### Provisioning new servers

TODO Talk about host choice, server distro, `scripts/provision.sh`, touch on run manually in this
case but can be automated with Ansible/Tower | Chef/Server | Puppet/Server.

```
#cloud-config
users:
  - name: op
    ssh-authorized-keys:
      - ssh-rsa ...
    sudo: ['ALL=(ALL) NOPASSWD:ALL']
    groups: sudo
    shell: /bin/bash
packages:
  - python
runcmd:
  - sed -i -e '/^PermitRootLogin/s/^.*$/PermitRootLogin no/' /etc/ssh/sshd_config
  - sed -i -e '/^PasswordAuthentication/s/^.*$/PasswordAuthentication no/' /etc/ssh/sshd_config
  - sed -i -e '$aAllowUsers op' /etc/ssh/sshd_config
  - service ssh restart
```

### Understanding day-to-day operations

**Server**

**Application process**

**Database**

**Logging**

**Performance monitoring**

**User monitoring**

**Security**

**Disaster recovery**

**SSL**

The SSL certificate currently in use is stored in ansible's `vault.yml` file.

If ever you need to generate a new self-signed certificate those two commands should come in handy:

```
$ openssl genrsa -out ssl.key 4096
$ openssl req -new -x509 -key ssl.key -out ssl.crt -days 1095 -subj '/CN=<the-hostname>'
```

## Footnotes

### What I am proud of



### Screenshots

| Page | Screenshot |
|:---:|:---:|
| Import | <img src="https://raw.githubusercontent.com/kiasaki/wave-challenge/master/support/screenshot1.png" height="300px" /> |
| Report | <img src="https://raw.githubusercontent.com/kiasaki/wave-challenge/master/support/screenshot2.png" height="300px" /> |

### Other considerations

- Employees addresses could have been further normalized
- Taxes matching is a bit brittle, having only the state 2 letter code means we can match US tax names but would have trouble with other countries / different formats
- On the subject of taxes, assuming they change only yearly and that it's effective on Jan 1 is quite brittle, we might come to mid-year tax changes, or simply later than exactly Jan 1.
- We are using a memory based cache implementation even in prod, it would be easy to set a Redis backed implementation in the container for the production use case but was overlooked for the sake of time

### Questions

- There is an expense in the example data, taxed in NY but using 7.5% not 8.875%. Is it an error?
- Where we supposed to think about segregating expenses per client or just leave them be global?
