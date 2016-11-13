from sys import path
from os.path import join, dirname, abspath, basename

# PATH CONFIGURATION
DJANGO_ROOT = dirname(abspath(__file__))
BASE_DIR = dirname(DJANGO_ROOT)
SITE_ROOT = BASE_DIR  # descriptive alias, please keep me
SITE_NAME = basename(DJANGO_ROOT)
path.append(DJANGO_ROOT)
# END PATH CONFIGURATION

# ENVIORNMENT SPECIFIC VARIABLES
__DEBUG = True

__DATABASE_NAME = "em"
__DATABASE_USER = "em"
__DATABASE_PASSWORD = "em"
__DATABASE_HOST = "localhost"
__DATABASE_PORT = "3306"

__STATIC_ROOT = join(BASE_DIR, 'assets')
__MEDIA_ROOT = join(BASE_DIR, 'media')
__STATIC_URL = '/assets/'
__MEDIA_URL = '/media/'

# SECURITY SETTINGS
ENCRYPTED_FIELDS_KEYDIR = join(BASE_DIR, 'fieldkeys')

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.9/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'tb49$!ufff%5qsky#2z_5!4^t8ahrey$kr93wp=xma)-5th%59'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = __DEBUG

ALLOWED_HOSTS = ['localhost']


# Application definition

DJANGO_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
)

THIRD_PARTY_APPS = (
    'encrypted_fields',
)

LOCAL_APPS = (
    'consume',
)

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

MIDDLEWARE_CLASSES = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = '%s.urls' % SITE_NAME

WSGI_APPLICATION = '%s.wsgi.application' % SITE_NAME

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Database
# https://docs.djangoproject.com/en/1.9/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': __DATABASE_NAME,
        'HOST': __DATABASE_HOST,
        'USER': __DATABASE_USER,
        'PASSWORD': __DATABASE_PASSWORD,
        'PORT': __DATABASE_PORT,
    },
}


# Password validation
# https://docs.djangoproject.com/en/1.9/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.9/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
MEDIA_URL = __MEDIA_URL  # '/media/'
MEDIA_ROOT = __MEDIA_ROOT
STATIC_URL = __STATIC_URL  # '/assets/'
STATIC_ROOT = __STATIC_ROOT

TEMPLATE_DIRS = (
    join(BASE_DIR, 'consume/templates'),
)
