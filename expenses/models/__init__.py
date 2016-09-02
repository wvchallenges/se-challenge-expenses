from __future__ import absolute_import, unicode_literals

import zope.sqlalchemy
import pyramid_tm
from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import configure_mappers


# import or define all models here to ensure they are attached to the
# Base.metadata prior to any initialization routines
from expenses.models.expenses import Expense  # noqa
from expenses.models.csvfiles import CSVFile  # noqa

# run configure_mappers after defining all of the models to ensure
# all relationships can be setup
configure_mappers()


def get_engine(settings, prefix='sqlalchemy.'):
    return engine_from_config(settings, prefix)


def get_session_factory(engine):
    factory = sessionmaker()
    factory.configure(bind=engine)
    return factory


def get_tm_session(session_factory, transaction_manager):
    """
    Get a ``sqlalchemy.orm.Session`` instance backed by a transaction.

    This function will hook the session to the transaction manager which
    will take care of committing any changes.

    - When using pyramid_tm it will automatically be committed or aborted
      depending on whether an exception is raised.

    - When using scripts you should wrap the session in a manager yourself.
      For example::

          import transaction

          engine = get_engine(settings)
          session_factory = get_session_factory(engine)
          with transaction.manager:
              db_session = get_tm_session(session_factory, transaction.manager)

    """
    db_session = session_factory()
    zope.sqlalchemy.register(
        db_session, transaction_manager=transaction_manager)
    return db_session


def includeme(config):
    """
    Initialize the model for a Pyramid app.

    Activate this setup using ``config.include('expenses.models')``.

    """
    settings = config.get_settings()

    config.include(pyramid_tm)

    session_factory = get_session_factory(get_engine(settings))
    config.registry['db_session_factory'] = session_factory

    config.add_request_method(
        lambda r: get_tm_session(session_factory, r.tm),
        'db_session',
        reify=True
    )
