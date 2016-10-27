from setuptools import setup

setup(
    name='wtest',
    version='1.0',
    description = "Wave interview challenge app",
    packages=['wtest'],
    include_package_data=True,
    zip_safe=True,
    install_requires=['Flask','Werkzeug','flask-cors','MySQL-python','python-dateutil']
)
