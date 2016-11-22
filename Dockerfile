FROM heroku/cedar:14

RUN mkdir -p /app/.profile.d
WORKDIR /app/user

####
# Python setup from https://hub.docker.com/r/heroku/python/~/dockerfile/

# Which version of Python?
ENV PYTHON_VERSION python-3.5.2

# Add Python binaries to path.
ENV PATH /app/.heroku/python/bin/:$PATH

# Create some needed directories
RUN mkdir -p /app/.heroku/python /app/.profile.d

# Install Python
RUN curl -s https://lang-python.s3.amazonaws.com/cedar-14/runtimes/$PYTHON_VERSION.tar.gz | tar zx -C /app/.heroku/python

# Install Pip & Setuptools
RUN curl -s https://bootstrap.pypa.io/get-pip.py | /app/.heroku/python/bin/python

# Export the Python environment variables in .profile.d
RUN echo 'export PATH=$HOME/.heroku/python/bin:$PATH PYTHONUNBUFFERED=true PYTHONHOME=/app/.heroku/python LIBRARY_PATH=/app/.heroku/vendor/lib:/app/.heroku/python/lib:$LIBRARY_PATH LD_LIBRARY_PATH=/app/.heroku/vendor/lib:/app/.heroku/python/lib:$LD_LIBRARY_PATH LANG=${LANG:-en_US.UTF-8} PYTHONHASHSEED=${PYTHONHASHSEED:-random} PYTHONPATH=${PYTHONPATH:-/app/user/}' > /app/.profile.d/python.sh
RUN chmod +x /app/.profile.d/python.sh

# Bind to port 8000 by default
ENV PORT 8000


# Python dependencies
COPY requirements.txt /app/user/
RUN pip install -r requirements.txt

# Add the code
COPY . /app/user/
