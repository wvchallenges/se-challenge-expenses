# Wave Software Development Challenge

## Intro

**Technology**

While choosing a set of technologies for this challenge I had two goals in mind:

1. Using languages, software, and operating systems I have used in the past so
  that I can get to a working solution fast and best showcase my skills.
1. Still picking some new tools/libraries for 1-2 thing as this challenge is a
  perfect opportunity to better myself and explore new things in a safe environment.

**Goals**

The problem at hand is very simplistic but, can be interpreted in a myriad of
ways. Hence the problem here is now ticking the requirement but showing some
depth in the mastery of an aspect of web development you are comfortable with.

A second goal should be thinking about the user, this is what Wave, and many
other great organizations do: start from the user. What is the user trying to
accomplish? How can we make it as easy as possible? How can we delight the
user? Often the answer is by doing your very best in each aspect Design /
Experience / User Interface / Performance / Stability / Iteration Speed /
Innovation.

Third, thinking of the onsite interview, how can we make sure this project
includes grounds for interesting discussions. How can we make it technically
interesting and easy to change/update/modify.

## Development

### Technical stack

- Data
  - [PostgreSQL](https://www.postgresql.org/) - _Stable for a long time, fast when used correctly, wide userbase, versatile_
- Backend
  - [Node.js](https://nodejs.org/en/) - _Fast to develop in, fast at runtime for our use case, now adopted by many big company, in active development, wide community, packages for many things web related_
  - [Merry](https://github.com/yoshuawuyts/merry/) **New** - _Fast, fun, opiniated but most importantly: simple_
  - [Knex](http://knexjs.org/) - _Versatile, simple, promise based, and fun SQL query builder_
- Frontend
  - [Choo](https://github.com/yoshuawuyts/choo/) **New** - _Minimal size, small API, light on tooling, thoughfully designed, fun_
  - [Tachyons](http://tachyons.io/) - _Allows for "designing" in the brower, easier changes to code, and very simple to learn and use_
- Operations
  - [Ubuntu](https://www.ubuntu.com/server) - _Easy to work with, wide adoption, package availability, most engineers have experience with it_
  - [Runit](http://smarden.org/runit/) - _Simple in design, works well as process manager, include nice guarantees for our use case_
  - [Bash Scripts](https://www.gnu.org/software/bash/) - _Known by most developers, simple, easy to read and update_
  - (If this service was to be ran in production some more heavyweight configuration management tool would most likely be used to make sure deployment scales to multiple servers and happens in a "rolling" fashion. It would also be used to provision new machines. For this challenge we'll do those steps by hand (running bash scripts that is))

### Building

TODO Talk about dependencies and follow with building instructions.

### Testing

TODO Discuss kinds of testing involved (unit, integration, system) and libraries used, touch on how
actually run these.

## Production

TODO Overview of what's discussed in this section and how some subject where simplified for the
exercise but could be expanded upon. Note lack of Nginx but obvious need for it.

### Deploying changes

TODO Talk about `scripts/deploy.sh` and it could be scaled/automated in production using some custom
software or Ansible/Chef/Puppet/SaltStack. Touch on database migrations.

### Provisioning new servers

TODO Talk about host choice, server distro, `scripts/provision.sh`, touch on run manually in this
case but can be automated with Ansible/Tower | Chef/Server | Puppet/Server.

### Understanding day-to-day operations

**Server**

**Application process**

**Database**

**Logging**

**Performance monitoring**

**User monitoring**

**Security**

**Disaster recovery**

## Footnotes

### What I am proud of

### Questions

- Is the only line in the example data, taxed in NY, using 7.5% not 8.875% an error?
- It's not clear as to whether we where supposed to assume the expenses and expense categories from a single file where linked to a specific client of just global.
