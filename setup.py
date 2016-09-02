import os

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))

requires = [
    'pyramid',
    'pyramid_mako',
    'pyramid_debugtoolbar',
    'pyramid_tm',
    'SQLAlchemy',
    'transaction',
    'zope.sqlalchemy',
    'waitress',
]

tests_require = [
    'nose',
    'mock'
]

migrations_require = [
    'alembic',
]

setup(name='expenses',
      version='1.0.0',
      description='expenses',
      author='bruk habtu',
      author_email='bruk.habtu@beanfield.com',
      packages=find_packages(),
      include_package_data=True,
      zip_safe=False,
      extras_require={
          'testing': tests_require,
          'migrations': migrations_require,
      },
      install_requires=requires,
      entry_points="""
      [paste.app_factory]
      main = expenses:main
      """,
      )
