from contextlib import contextmanager

from main import Session

@contextmanager
def rw_session():
  """Provide a transactional scope around a series of operations."""
  session = Session()
  try:
    yield session
    session.commit()
  except:
    session.rollback()
    raise
  finally:
    session.close()
