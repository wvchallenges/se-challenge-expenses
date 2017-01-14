DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': '{{appDBName}}',
            'USER': '{{appUser}}',
            'PASSWORD': '{{appDBPass}}',
            'HOST': '{{appDBHost}}',
            'PORT': '',                      # Set to empty string for default.
        }
    }
